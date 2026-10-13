import { authenticate } from "../shopify.server";
import { deleteShopData, exportCustomerData, redactCustomerData } from "../services/privacy.server";

function normalizeTopic(topic) {
  return String(topic || "").trim().toUpperCase().replace(/\//g, "_");
}

export const action = async ({ request }) => {
  const { shop, topic, payload, admin } = await authenticate.webhook(request);
  const normalized = normalizeTopic(topic);

  try {
    if (normalized === "CUSTOMERS_DATA_REQUEST") {
      await exportCustomerData({
        shop,
        payload,
        adminGraphql: admin?.graphql,
      });
    } else if (normalized === "CUSTOMERS_REDACT") {
      await redactCustomerData({ shop, payload });
    } else if (normalized === "SHOP_REDACT") {
      await deleteShopData(shop);
    } else {
      console.warn(`[PRIVACY] Unhandled compliance topic: ${topic}`);
    }
  } catch (err) {
    console.error(`[PRIVACY] ${topic} failed:`, err.message || err);
    return new Response(null, { status: 500 });
  }

  return new Response();
};
