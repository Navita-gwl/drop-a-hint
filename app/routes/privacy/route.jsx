import { Link } from "react-router";

import styles from "./privacy.module.css";

const APP_NAME = "Drop A Hint";
const COMPANY_NAME = "Galaxy Web Links";
const CONTACT_EMAIL = "appsupport@galaxyweblinks.com";
const WEBSITE_URL = "https://www.galaxyweblinks.com";
const LAST_UPDATED = "October 12, 2026";

export const meta = () => [
  { title: `Privacy Policy | ${APP_NAME}` },
  {
    name: "description",
    content: `Privacy policy for ${APP_NAME}, a Shopify app by ${COMPANY_NAME}. Learn how merchant, referrer, and friend data is collected, used, and protected.`,
  },
];

export default function PrivacyPolicyPage() {
  return (
    <main className={styles.page}>
      <article className={styles.container}>
        <header className={styles.header}>
          <h1 className={styles.title}>Privacy Policy</h1>
          <p className={styles.subtitle}>
            This Privacy Policy explains how {COMPANY_NAME} (&quot;we&quot;, &quot;us&quot;, or
            &quot;our&quot;) collects, uses, stores, and protects personal and business data when
            you install or use the {APP_NAME} application (the &quot;App&quot;) on a Shopify store,
            or when you submit a product referral through a store that uses the App.
          </p>
          <p className={styles.lastUpdated}>Last updated: {LAST_UPDATED}</p>
        </header>

        <section className={styles.section}>
          <h2>1. Introduction</h2>
          <p>
            {APP_NAME} lets Shopify merchants offer a product referral on their store. A shopper can
            send a product hint to a friend. If that friend later buys the product, the App can
            create a Shopify discount code and email it to the referrer as a reward.
          </p>
          <p>
            The App runs in the Shopify admin and also on the merchant&apos;s storefront through a
            theme block and, where enabled, a checkout extension. It uses Shopify&apos;s APIs to
            read orders and products and to create discount codes on behalf of merchants who
            authorize the App.
          </p>
          <p>
            We are committed to protecting the privacy of merchants, their staff, and the shoppers
            whose names and email addresses are submitted through a referral. This policy is
            designed to meet Shopify App Store requirements and to explain our data practices in
            accordance with applicable privacy laws, including the General Data Protection
            Regulation (GDPR), UK GDPR, and other regional privacy regulations.
          </p>
          <p>
            This page is provided for informational purposes and does not constitute legal advice. If
            you have questions about how privacy laws apply to your business, please consult a
            qualified legal professional.
          </p>
        </section>

        <section className={styles.section}>
          <h2>2. Who This Policy Applies To</h2>
          <ul>
            <li>
              <strong>Merchants</strong> who install and use the App in the Shopify admin.
            </li>
            <li>
              <strong>Merchant staff</strong> who access the App through a Shopify user account.
            </li>
            <li>
              <strong>Referrers</strong> who submit a product referral from the storefront, including
              their name and email address.
            </li>
            <li>
              <strong>Friends</strong> who are named as the recipient of a referral, including their
              name and email address, and who may later purchase the referred product.
            </li>
          </ul>
          <p>
            Store visitors who do not submit a referral, and who are not identified on an order
            matched to a referral, are not asked to provide personal data to the App.
          </p>
        </section>

        <section className={styles.section}>
          <h2>3. Information We Collect Through Shopify APIs</h2>
          <p>
            When a merchant installs the App, we access data from the merchant&apos;s Shopify store
            through Shopify&apos;s APIs, only as needed to provide the App and within the permissions
            granted during installation. This may include:
          </p>
          <ul>
            <li>Store domain, shop identifier, and app installation details</li>
            <li>
              Order information needed to match a referral to a purchase, including order id, order
              number, financial status, customer email, customer id, line items, note attributes,
              and discount codes applied to the order
            </li>
            <li>
              Product information used to show referral offers and to match a referred product,
              such as product id, title, image, and price
            </li>
            <li>
              Discount data created by the App, including discount codes, discount ids, values, and
              usage limits
            </li>
            <li>
              Customer identifiers needed to associate a referrer or purchasing friend with a
              Shopify customer record
            </li>
            <li>App authentication, authorization, and session information required to operate the App</li>
          </ul>
          <p>
            We do not request access to payment card numbers. Payment status is read from Shopify
            order data so a reward is issued only when the merchant&apos;s settings and the order
            status allow it.
          </p>
        </section>

        <section className={styles.section}>
          <h2>4. Information We Collect From Storefront Referrals</h2>
          <p>When someone uses the Drop a Hint block on a product page, we collect:</p>
          <ul>
            <li>Referrer name and email address</li>
            <li>Friend name and email address</li>
            <li>The product being referred, including product id, title, URL, and price details supplied by the theme</li>
            <li>A referral token used to attribute a later purchase</li>
            <li>Optional message text, when the storefront form includes one</li>
          </ul>
          <p>
            The referral token may be stored in the browser (local storage, session storage, or a
            cookie) and attached to the cart so the purchase can be matched after checkout. A
            discount code entered in the checkout extension is sent to the App only to check whether
            that code is a valid referral reward before Shopify applies it.
          </p>
        </section>

        <section className={styles.section}>
          <h2>5. Information We Collect From Merchants</h2>
          <p>When merchants use the App in the Shopify admin, we may collect and store:</p>
          <ul>
            <li>
              Shopify staff account details available through the online session, such as name,
              email address, user id, account role, and locale
            </li>
            <li>
              Reward settings, including discount type and value, expiry, usage limits, minimum cart
              amount, and product-specific discount rules
            </li>
            <li>
              Email settings, including a sending address and subject lines the merchant configures
              for referral and reward emails
            </li>
            <li>
              Support request details submitted in the App, such as name, email, phone number,
              subject, and message
            </li>
            <li>Technical logs related to app performance, errors, webhooks, and security events</li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2>6. How We Use Information</h2>
          <p>We use the information we collect to:</p>
          <ul>
            <li>Record a referral and email the friend an invitation to view the product</li>
            <li>Attribute a later order to that referral</li>
            <li>Create a Shopify discount code and email it to the referrer when a reward is earned</li>
            <li>Show referral status, reward status, and discount details to the merchant in the admin</li>
            <li>Apply the merchant&apos;s discount and email settings</li>
            <li>Validate a referral discount code at checkout</li>
            <li>Authenticate merchants and keep the App available only to the installing store</li>
            <li>Respond to support requests and legal or regulatory obligations</li>
            <li>Monitor security, prevent abuse, and troubleshoot technical issues</li>
          </ul>
          <p>
            We do not sell personal data. We do not use referrer, friend, or merchant personal data
            for unrelated marketing.
          </p>
        </section>

        <section className={styles.section}>
          <h2>7. Where Data Is Stored</h2>
          <p>
            Referral records, reward settings, product discount rules, webhook processing records,
            and Shopify session data are stored in a database operated for the App. Discount codes
            created for rewards are also stored in the merchant&apos;s Shopify admin as Shopify
            discounts.
          </p>
          <p>That stored data can include:</p>
          <ul>
            <li>Referrer and friend names and email addresses</li>
            <li>Shopify customer ids, order ids, order numbers, and payment status related to a referral</li>
            <li>Referral tokens, discount codes, and reward status</li>
            <li>Merchant email and discount settings</li>
            <li>Shopify access tokens and session details required to call Shopify APIs</li>
          </ul>
          <p>
            Invitation and reward emails are sent through the email provider configured for the App,
            which may be SendGrid or an SMTP server. Those providers receive the recipient address
            and the message content, including a discount code when a reward email is sent.
          </p>
        </section>

        <section className={styles.section}>
          <h2>8. Legal Basis for Processing (EEA/UK)</h2>
          <p>Where applicable privacy laws require a legal basis, we rely on:</p>
          <ul>
            <li>
              <strong>Performance of a contract</strong> — to provide the App to merchants who
              install and use it
            </li>
            <li>
              <strong>Legitimate interests</strong> — to operate referrals, secure the App, prevent
              abuse, and support merchants
            </li>
            <li>
              <strong>Legal obligations</strong> — to comply with applicable laws and respond to
              valid requests
            </li>
            <li>
              <strong>Merchant instructions</strong> — when a merchant enables the storefront block
              and checkout extension and configures rewards
            </li>
          </ul>
          <p>
            Merchants are responsible for telling their customers that referral names and email
            addresses will be used to send a product invitation and, when a reward is earned, a
            discount code.
          </p>
        </section>

        <section className={styles.section}>
          <h2>9. Data Sharing and Processors</h2>
          <p>
            We share personal data only with service providers that help us operate the App, such as
            hosting, database, and email delivery providers. These providers process data on our
            instructions and are required to protect it.
          </p>
          <p>
            We may also disclose information if required by law, regulation, legal process, or a
            governmental request, or to protect the rights, property, or safety of {COMPANY_NAME},
            merchants, or others.
          </p>
          <p>
            Shopify is an independent platform. Data accessed through Shopify APIs is also subject to
            Shopify&apos;s privacy practices and the merchant&apos;s agreement with Shopify. The
            friend receives the referral email, and the referrer receives the reward email, because
            that is the service the merchant enabled.
          </p>
        </section>

        <section className={styles.section}>
          <h2>10. International Data Transfers</h2>
          <p>
            {COMPANY_NAME} may process and store data in countries other than the country where you,
            or the people named in a referral, are located, including outside the European Economic
            Area (EEA) and the United Kingdom.
          </p>
          <p>
            Where required, we use appropriate safeguards for international transfers, such as
            standard contractual clauses or equivalent protections recognized under applicable data
            protection laws.
          </p>
        </section>

        <section className={styles.section}>
          <h2>11. Data Retention</h2>
          <p>
            We keep personal data only as long as needed to provide the App, complete the purposes
            in this policy, meet legal obligations, resolve disputes, and enforce our agreements.
          </p>
          <ul>
            <li>
              Shopify session data for a store is deleted when the App is uninstalled
            </li>
            <li>
              Referral records, including names, email addresses, order references, and discount
              codes, are kept so the merchant can see referral history and so a reward is not issued
              twice
            </li>
            <li>
              Discount codes created in Shopify remain in the merchant&apos;s store until the
              merchant deletes them or they expire under the merchant&apos;s reward settings
            </li>
            <li>
              A referral token stored in the browser is removed from that browser&apos;s storage
              after the order page reports the referral, or when the visitor clears site data
            </li>
            <li>
              Technical logs are kept for a limited period for security and operations, then deleted
              or anonymized
            </li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2>12. Your Privacy Rights</h2>
          <p>
            Depending on where you live, you may have the right to access, correct, delete, restrict,
            or object to certain processing of your personal data, and to ask for a copy of it.
          </p>
          <p>
            Merchants are responsible for privacy requests about their own stores and for making sure
            referral data is collected lawfully. If you submitted a referral, or you were named as a
            friend, contact the store first. You can also contact us using the details below and we
            will help with data the App stores, including access or deletion of a referral record.
          </p>
          <p>
            Shopify may also notify the App of a customer data request, a customer erasure request,
            or a shop data erasure request after uninstall. Contact us at the email below and we
            will action the referral and account data this App stores. Uninstalling the App deletes
            the Shopify session for that store.
          </p>
        </section>

        <section className={styles.section}>
          <h2>13. Security</h2>
          <p>
            We use administrative, technical, and organizational measures designed to protect
            personal data against unauthorized access, loss, misuse, alteration, or disclosure.
            These measures include access controls, encrypted connections (HTTPS), and restricted
            access to app credentials and the database.
          </p>
          <p>
            No method of transmission or storage is completely secure. We work to protect personal
            data, but we cannot guarantee absolute security.
          </p>
        </section>

        <section className={styles.section}>
          <h2>14. Children&apos;s Privacy</h2>
          <p>
            The App is intended for merchants and for shoppers who are old enough to use the
            merchant&apos;s store. It is not directed at children. We do not knowingly collect
            personal data from children. If you believe a child has submitted a referral, contact us
            so we can take appropriate action.
          </p>
        </section>

        <section className={styles.section}>
          <h2>15. Changes to This Policy</h2>
          <p>
            We may update this Privacy Policy to reflect changes in the App, our practices, or legal
            requirements. When we make material changes, we will update the &quot;Last updated&quot;
            date at the top of this page. Continued use of the App after an update means you accept
            the revised policy.
          </p>
        </section>

        <section className={styles.section}>
          <h2>16. Contact Us</h2>
          <p>
            If you have questions about this Privacy Policy or our data practices, please contact:
          </p>
          <ul>
            <li>
              <strong>App:</strong> {APP_NAME}
            </li>
            <li>
              <strong>Company:</strong> {COMPANY_NAME}
            </li>
            <li>
              <strong>Email:</strong>{" "}
              <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
            </li>
            <li>
              <strong>Website:</strong>{" "}
              <a href={WEBSITE_URL}>{WEBSITE_URL}</a>
            </li>
          </ul>
        </section>

        <footer className={styles.footer}>
          <p>
            <Link to="/faq">Frequently Asked Questions</Link>
          </p>
          <p>
            &copy; {new Date().getFullYear()} {COMPANY_NAME}. All rights reserved.
          </p>
        </footer>
      </article>
    </main>
  );
}
