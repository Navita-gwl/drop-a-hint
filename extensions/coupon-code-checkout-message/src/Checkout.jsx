import "@shopify/ui-extensions/preact";
import { render } from "preact";
import { useState } from "preact/hooks";

export default async () => {
  render(<Extension />, document.body);
};

const ALREADY_APPLIED_MESSAGE = "This referral code has already been applied.";

function appliedDiscountCodes() {
  const fromCheckout = shopify?.discountCodes?.value || [];
  return fromCheckout
    .map((entry) => String(entry?.code || "").trim().toUpperCase())
    .filter(Boolean);
}

function Extension() {
  const [inputCode, setInputCode] = useState("");
  const [inputError, setInputError] = useState("");
  const [isChecking, setIsChecking] = useState(false);
  const [appliedCodes, setAppliedCodes] = useState([]);

  const handleValidateInput = async (e) => {
    if (e && typeof e.preventDefault === "function") {
      e.preventDefault();
    }
    if (!inputCode.trim()) return;
    const clean = inputCode.trim().toUpperCase();
    setIsChecking(true);
    setInputError("");

    const alreadyApplied =
      appliedCodes.includes(clean) || appliedDiscountCodes().includes(clean);
    if (alreadyApplied) {
      setInputError(ALREADY_APPLIED_MESSAGE);
      setIsChecking(false);
      return;
    }

    try {
      // Validate with app backend first
      const res = await fetch(`/apps/drop-a-hint?action=validate_coupon&code=${encodeURIComponent(clean)}`);
      let data = null;
      if (res.ok) {
        data = await res.json();
      }

      if (data && !data.valid && data.error) {
        setInputError(data.error);
        return;
      }

      // Apply to checkout using Shopify Checkout API
      const applyFn = shopify?.applyDiscountCodeChange;
      if (applyFn) {
        const result = await applyFn({
          type: "addDiscountCode",
          code: clean,
        });

        if (result?.type === "error") {
          const message = /already (been )?applied/i.test(result.message || "")
            ? ALREADY_APPLIED_MESSAGE
            : result.message || "Failed to apply discount code";
          if (message === ALREADY_APPLIED_MESSAGE) {
            setAppliedCodes((current) => (current.includes(clean) ? current : [...current, clean]));
          }
          setInputError(message);
        } else {
          setAppliedCodes((current) => (current.includes(clean) ? current : [...current, clean]));
          setInputCode("");
          setInputError("");
        }
      }
    } catch (err) {
      console.warn("[Apply Discount Error]");
      setInputError("Failed to apply discount code");
    } finally {
      setIsChecking(false);
    }
  };

  const isBlockTarget = shopify?.extension?.target?.includes("block") || false;

  if (!inputError && !isBlockTarget) {
    return null;
  }

  return (
    <s-stack gap="base">
      {inputError.length > 0 && (
        <s-banner tone="critical" heading="Discount Notice">
          <s-text>{inputError}</s-text>
        </s-banner>
      )}

      {isBlockTarget && (
        <s-form onSubmit={handleValidateInput}>
          <s-stack direction="inline" gap="tight" blockAlign="center">
            <s-text-field
              label="Discount Code"
              value={inputCode}
              onInput={(e) => {
                setInputCode(e.target.value);
                if (inputError) setInputError("");
              }}
              placeholder="Enter coupon code"
            />
            <s-button
              type="submit"
              loading={isChecking}
              disabled={isChecking || !inputCode.trim()}
            >
              Apply
            </s-button>
          </s-stack>
        </s-form>
      )}
    </s-stack>
  );
}