import { Link } from "react-router";

import styles from "./privacy.module.css";

const APP_NAME = "Drop a Hint Pro";
const CONTACT_EMAIL = "appsupport@galaxyweblinks.com";

export const meta = () => [
  { title: `${APP_NAME} Privacy Policy` },
  {
    name: "description",
    content: `${APP_NAME} lets customers refer a product to a friend. The referrer receives a discount set by the store owner when that friend purchases the product.`,
  },
];

export default function PrivacyPolicyPage() {
  return (
    <main className={styles.page}>
      <article className={styles.container}>
        <header className={styles.header}>
          <h1 className={styles.title}>{APP_NAME} Privacy Policy</h1>
          <p className={styles.subtitle}>
            {APP_NAME} app provides an ability to refer product with friends and refer customer
            will get a discount (Set by the store owner) when their friend will purchase the product
            successfully from your store.
          </p>
        </header>

        <section className={styles.section}>
          <h2>Personal Information the App Collects</h2>
          <p>
            When you install the App, we are automatically able to access certain types of
            information from your Shopify account, such as:
          </p>
          <ul>
            <li>Your e-mail Address</li>
            <li>Your shop&apos;s Products</li>
            <li>Your shop&apos;s Customers</li>
            <li>Your shop&apos;s Discount</li>
          </ul>
          <p>When a shopper uses the referral form, the App also stores:</p>
          <ul>
            <li>The referrer&apos;s name and e-mail address</li>
            <li>The friend&apos;s name and e-mail address</li>
            <li>The product that was referred</li>
            <li>The order status and reward status for that referral</li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2>How Do We Use Your Personal Information?</h2>
          <p>
            We use the personal information we collect from you and your customers in order to
            provide the Service and to operate the App. Additionally, we use this personal
            information to: Communicate with you; Optimize or improve the App; and Provide you with
            information or advertising relating to our products or services. If you do not wish to
            receive advertising relating to our products and services, write an e-mail to{" "}
            <a href={`mailto:${CONTACT_EMAIL}?subject=Drop%20a%20Hint%20Pro%20Opt-out`}>{CONTACT_EMAIL}</a>{" "}
            with the subject &quot;Drop a Hint Pro Opt-out&quot;.
          </p>
        </section>

        <section className={styles.section}>
          <h2>Sharing Your Personal Information</h2>
          <p>
            We do not sell personal information. Referral and reward emails are sent through
            SendGrid, or through the SMTP server configured for the App. Those services process the
            recipient&apos;s name, e-mail address, and message so the email can be delivered. Referral
            records are stored on our server.
          </p>
        </section>

        <section className={styles.section}>
          <h2>Your Rights</h2>
          <p>
            If you are a European resident, you have the right to access personal information we
            hold about you and to ask that your personal information be corrected, updated, or
            deleted. If you would like to exercise this right, please contact us through the contact
            information below.
          </p>
          <p>
            Additionally, if you are a European resident we note that we are processing your
            information in order to fulfill contracts we might have with you.
          </p>
        </section>

        <section className={styles.section}>
          <h2>Data Retention</h2>
          <p>
            When you create an account through the Site, we will maintain your Customer Information
            for our records unless and until you ask us to delete this information. When a store
            uninstalls the App, we delete that store&apos;s referral records, settings, and sessions.
            If Shopify asks us to provide, delete, or redact a customer&apos;s information, or to delete
            a store&apos;s information, we do that when the request is received.
          </p>
        </section>

        <section className={styles.section}>
          <h2>Changes</h2>
          <p>
            We may update this privacy policy from time to time in order to reflect, for example,
            changes to our practices or for other operational, legal or regulatory reasons.
          </p>
        </section>

        <section className={styles.section}>
          <h2>Contact Us</h2>
          <p>
            For more information about our privacy practices, if you have questions, or if you would
            like to make a complaint, please contact us by e-mail at{" "}
            <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
          </p>
        </section>

        <footer className={styles.footer}>
          <p>
            <Link to="/faq">Frequently Asked Questions</Link>
          </p>
        </footer>
      </article>
    </main>
  );
}
