import prisma from "../db.server.js";
import { sendCustomerDataExport } from "./email.server.js";

function cleanId(id) {
  return String(id || "").replace(/^gid:\/\/shopify\/\w+\//, "").trim();
}

function idVariants(id) {
  const raw = String(id || "").trim();
  const clean = cleanId(raw);
  if (!clean) return [];
  return [...new Set([raw, clean, `gid://shopify/Customer/${clean}`])];
}

function orderIdVariants(id) {
  const raw = String(id || "").trim();
  const clean = cleanId(raw);
  if (!clean) return [];
  return [...new Set([raw, clean, `gid://shopify/Order/${clean}`])];
}

function sameId(stored, incoming) {
  const left = cleanId(stored);
  const right = cleanId(incoming);
  return Boolean(left) && Boolean(right) && left === right;
}

async function findCustomerReferrals({ shop, customer, orderIds = [] }) {
  const email = String(customer?.email || "").trim();
  const customerIds = idVariants(customer?.id);
  const orders = orderIds.flatMap((id) => orderIdVariants(id));
  const or = [];

  if (email) {
    or.push(
      { senderEmail: { equals: email, mode: "insensitive" } },
      { receiverEmail: { equals: email, mode: "insensitive" } },
      { referredCustomerEmail: { equals: email, mode: "insensitive" } },
    );
  }

  for (const customerId of customerIds) {
    or.push(
      { shopifyCustomerId: customerId },
      { referrerCustomerId: customerId },
      { referredCustomerId: customerId },
    );
  }

  for (const orderId of orders) {
    or.push(
      { orderId },
      { referredOrderId: orderId },
      { redeemingOrderId: orderId },
    );
  }

  if (!shop || or.length === 0) return [];

  return prisma.referral.findMany({
    where: { shop, OR: or },
  });
}

function senderMatches(referral, customer, orderIds) {
  const email = String(customer?.email || "").trim().toLowerCase();
  return (
    (email && referral.senderEmail?.toLowerCase() === email) ||
    sameId(referral.referrerCustomerId, customer?.id) ||
    orderIds.some((orderId) => sameId(referral.redeemingOrderId, orderId))
  );
}

function receiverMatches(referral, customer, orderIds) {
  const email = String(customer?.email || "").trim().toLowerCase();
  return (
    (email && referral.receiverEmail?.toLowerCase() === email) ||
    (email && referral.referredCustomerEmail?.toLowerCase() === email) ||
    sameId(referral.shopifyCustomerId, customer?.id) ||
    sameId(referral.referredCustomerId, customer?.id) ||
    orderIds.some((orderId) => sameId(referral.orderId, orderId) || sameId(referral.referredOrderId, orderId))
  );
}

export async function deleteShopData(shop) {
  if (!shop) return { deleted: false };

  await prisma.rewardIssuanceLog.deleteMany({ where: { shop } });
  await prisma.referral.deleteMany({ where: { shop } });
  await prisma.productDiscountRule.deleteMany({ where: { shop } });
  await prisma.settings.deleteMany({ where: { shop } });
  await prisma.processedWebhook.deleteMany({ where: { shop } });
  await prisma.session.deleteMany({ where: { shop } });

  console.log(`[PRIVACY] shop data deleted for ${shop}`);
  return { deleted: true };
}

export async function redactCustomerData({ shop, payload }) {
  const customer = payload?.customer || {};
  const orderIds = payload?.orders_to_redact || [];
  const referrals = await findCustomerReferrals({ shop, customer, orderIds });
  let redacted = 0;

  for (const referral of referrals) {
    const data = {};
    if (senderMatches(referral, customer, orderIds)) {
      data.senderName = "Redacted";
      data.senderEmail = `redacted+${referral.id}@redacted.invalid`;
      data.referrerCustomerId = null;
    }
    if (receiverMatches(referral, customer, orderIds)) {
      data.receiverName = "Redacted";
      data.receiverEmail = `redacted-friend+${referral.id}@redacted.invalid`;
      data.referredCustomerEmail = null;
      data.shopifyCustomerId = null;
      data.referredCustomerId = null;
      data.token = null;
    }
    if (Object.keys(data).length === 0) continue;

    await prisma.referral.update({
      where: { id: referral.id },
      data,
    });
    redacted += 1;
  }

  console.log(`[PRIVACY] customers/redact shop=${shop} records=${redacted}`);
  return { redacted };
}

async function shopContactEmail(adminGraphql) {
  if (!adminGraphql) return "";
  const response = await adminGraphql(`#graphql
    query ShopContactEmail {
      shop {
        email
        contactEmail
      }
    }
  `);
  const body = await response.json();
  return body?.data?.shop?.contactEmail || body?.data?.shop?.email || "";
}

export async function exportCustomerData({ shop, payload, adminGraphql }) {
  const customer = payload?.customer || {};
  const orderIds = payload?.orders_requested || [];
  const requestId = payload?.data_request?.id || "";
  const referrals = await findCustomerReferrals({ shop, customer, orderIds });
  const records = referrals.map((referral) => ({
    role: senderMatches(referral, customer, orderIds) && receiverMatches(referral, customer, orderIds)
      ? "referrer and friend"
      : senderMatches(referral, customer, orderIds)
        ? "referrer"
        : "friend",
    senderName: referral.senderName,
    senderEmail: referral.senderEmail,
    receiverName: referral.receiverName,
    receiverEmail: referral.receiverEmail,
    productTitle: referral.productTitle,
    orderNumber: referral.orderNumber || referral.referredOrderNumber,
    orderId: referral.orderId || referral.referredOrderId,
    orderStatus: referral.orderStatus,
    rewardStatus: referral.rewardStatus,
  }));

  console.log(`[PRIVACY] customers/data_request shop=${shop} requestId=${requestId || "(none)"} records=${records.length}`);

  try {
    const to = await shopContactEmail(adminGraphql);
    if (!to) {
      console.warn("[PRIVACY] data_request export email skipped: shop contact email unavailable");
      return { records: records.length, emailed: false };
    }
    await sendCustomerDataExport({ to, shop, requestId, records });
    console.log("[PRIVACY] data_request export emailed to the shop");
    return { records: records.length, emailed: true };
  } catch (err) {
    console.error("[PRIVACY] data_request export email failed:", err.message || err);
    return { records: records.length, emailed: false };
  }
}
