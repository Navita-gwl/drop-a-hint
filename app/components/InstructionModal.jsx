import PropTypes from "prop-types";
import { Modal, Text, Banner, BlockStack, Box, InlineStack, Badge } from "@shopify/polaris";

export function InstructionModal({ isOpen, onClose }) {
  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      title="Installation & Integration Guide"
      primaryAction={{
        content: "Got It",
        onAction: onClose,
      }}
    >
      <Modal.Section>
        <BlockStack gap="400">
          {/* Step 1 */}
          <Box background="bg-surface-secondary" padding="300" borderRadius="200">
            <BlockStack gap="100">
              <InlineStack gap="200" blockAlign="center">
                <Badge tone="info">Step 1</Badge>
                <Text variant="headingSm" as="h4" fontWeight="semibold">
                  Enable the App on the Theme
                </Text>
              </InlineStack>
              <Text variant="bodyMd" as="p" tone="subdued">
                In the Theme Editor, select <strong>Products &gt; Default product</strong>. Click <strong>Add block</strong>, choose <strong>Drop a Hint Banner</strong>, and place it near the Add to cart button.
              </Text>
            </BlockStack>
          </Box>

          {/* Step 2 */}
          <Box background="bg-surface-secondary" padding="300" borderRadius="200">
            <BlockStack gap="100">
              <InlineStack gap="200" blockAlign="center">
                <Badge tone="info">Step 2</Badge>
                <Text variant="headingSm" as="h4" fontWeight="semibold">
                  Add the Order Block
                </Text>
              </InlineStack>
              <Text variant="bodyMd" as="p" tone="subdued">
                Open the <strong>Customers &gt; Order</strong> template. Click <strong>Add block</strong>, choose <strong>Drop a Hint Order</strong>, and save the theme.
              </Text>
            </BlockStack>
          </Box>

          {/* Step 3 */}
          <Box background="bg-surface-secondary" padding="300" borderRadius="200">
            <BlockStack gap="100">
              <InlineStack gap="200" blockAlign="center">
                <Badge tone="info">Step 3</Badge>
                <Text variant="headingSm" as="h4" fontWeight="semibold">
                  Test Storefront Flow
                </Text>
              </InlineStack>
              <Text variant="bodyMd" as="p" tone="subdued">
                Save the theme and open a product page. Use <strong>Drop a Hint Banner</strong> to send a test referral and confirm the invitation email.
              </Text>
            </BlockStack>
          </Box>

          <Banner tone="info">
            <p>
              <strong>Tip:</strong> You can configure global discount percentages and reward settings under the <strong>Discount Settings</strong> tab, or configure per-product pricing under <strong>Product Specific Discount</strong>.
            </p>
          </Banner>
        </BlockStack>
      </Modal.Section>
    </Modal>
  );
}

InstructionModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};
