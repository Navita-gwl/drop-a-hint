import { authenticate } from "../shopify.server";
import { removeReferralDiscountByShopifyId } from "../services/referral.server";

/**
 * POST /webhooks/discounts/delete
 *
 * Fired when a discount is deleted in Shopify Admin.
 * Removes that code from the matching Drop a Hint referral.
 */
export const action = async ({ request }) => {
  try {
    const { payload, shop, topic } = await authenticate.webhook(request);
    const discountId = payload?.admin_graphql_api_id || payload?.id;

    console.log(`[Webhook Received] ${topic} for shop: ${shop}`);

    if (discountId) {
      await removeReferralDiscountByShopifyId({ shop, discountId });
    }

    return new Response(null, { status: 200 });
  } catch (err) {
    if (err instanceof Response) throw err;
    console.error("[Webhook Error discounts/delete]:", err.message || err);
    return new Response(null, { status: 200 });
  }
};
