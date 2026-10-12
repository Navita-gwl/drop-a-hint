import { Link } from "react-router";

import styles from "./faq.module.css";

const APP_NAME = "Drop A Hint";
const COMPANY_NAME = "Galaxy Web Links";

const faqs = [
  {
    question: "What does Drop A Hint do?",
    answer: (
      <p>
        {APP_NAME} lets a shopper refer a product to a friend. If that friend buys the product, the
        app can create a Shopify discount code and email it to the referrer as a reward.
      </p>
    ),
  },
  {
    question: "How do I add Drop A Hint to my store?",
    answer: (
      <>
        <p>In the Shopify admin, open Online Store, then Themes, then Customize.</p>
        <ul>
          <li>
            Turn on the <strong>Drop A Hint</strong> app embed and save.
          </li>
          <li>
            On the default product template, add the <strong>Drop A Hint</strong> block near the Add
            to cart button.
          </li>
          <li>Save the theme, then open a product page and submit a test referral.</li>
        </ul>
        <p>The same steps are listed in the installation guide inside the app.</p>
      </>
    ),
  },
  {
    question: "What does a shopper submit?",
    answer: (
      <p>
        The product-page form asks for the referrer&apos;s name and email, plus the friend&apos;s
        name and email. The two email addresses must be different. The app then emails the friend a
        link to that product.
      </p>
    ),
  },
  {
    question: "When is the reward created?",
    answer: (
      <p>
        The reward is created after the friend&apos;s order is paid and the app matches that order
        to the referral. The referrer then receives an email with a Shopify discount code. An unpaid
        order does not create a reward.
      </p>
    ),
  },
  {
    question: "How do I set the discount?",
    answer: (
      <>
        <p>In the app admin:</p>
        <ul>
          <li>
            <strong>Discount settings</strong> set the store-wide reward type, value, and invitation
            message.
          </li>
          <li>
            <strong>Product specific discount</strong> sets a different reward for one product. That
            rule is used for referrals of that product.
          </li>
        </ul>
      </>
    ),
  },
  {
    question: "Can I change the emails that are sent?",
    answer: (
      <p>
        Yes. Email settings let you set the sending address and subject for the friend invitation
        and for the referrer&apos;s reward email. If mail is sent with SendGrid, a custom sending
        address must be a verified SendGrid sender. If mail is sent with SMTP, the server must allow
        that address.
      </p>
    ),
  },
  {
    question: "Where do I see referrals?",
    answer: (
      <p>
        The app home lists each referral, including the referrer, the friend, the product, the order
        status, and whether a reward was issued. Open a referral to see its discount code after a
        reward has been created.
      </p>
    ),
  },
  {
    question: "How does a referrer use the discount code?",
    answer: (
      <p>
        The code in the reward email is a normal Shopify discount code. The referrer enters it at
        checkout. The checkout extension can also check the code and block a code that has already
        been applied.
      </p>
    ),
  },
  {
    question: "Why was a reward not sent?",
    answer: (
      <>
        <p>A reward is skipped when:</p>
        <ul>
          <li>The friend has not placed an order, or the order is not paid</li>
          <li>The order does not match the referral</li>
          <li>A reward was already issued for that referral</li>
          <li>The invitation or reward email could not be delivered</li>
        </ul>
        <p>Check the referral status in the app, then use the support form if the email failed.</p>
      </>
    ),
  },
  {
    question: "Does the app store the referral on Shopify only?",
    answer: (
      <p>
        The discount code is created in Shopify. The referral itself, including names, email
        addresses, and reward status, is stored by the app so the merchant can track it and so the
        same reward is not issued twice.
      </p>
    ),
  },
  {
    question: "Where can I get help?",
    answer: (
      <p>
        Use the support form in the app, or visit{" "}
        <a href="https://www.galaxyweblinks.com" target="_blank" rel="noopener noreferrer">
          galaxyweblinks.com
        </a>
        . You can also read the <Link to="/privacy">Privacy Policy</Link>.
      </p>
    ),
  },
];

export const meta = () => [
  { title: `FAQ | ${APP_NAME}` },
  {
    name: "description",
    content: `Frequently asked questions about ${APP_NAME} — product referrals, reward discounts, emails, and Shopify checkout.`,
  },
];

export default function FaqPage() {
  return (
    <main className={styles.page}>
      <article className={styles.container}>
        <header className={styles.header}>
          <h1 className={styles.title}>Frequently Asked Questions</h1>
          <p className={styles.subtitle}>
            Quick answers about product referrals, reward discounts, and emails in {APP_NAME} by{" "}
            {COMPANY_NAME}.
          </p>
        </header>

        <section>
          <div className={styles.faqList}>
            {faqs.map((faq) => (
              <details key={faq.question} className={styles.faqItem}>
                <summary>{faq.question}</summary>
                <div className={styles.faqAnswer}>{faq.answer}</div>
              </details>
            ))}
          </div>
        </section>

        <footer className={styles.footer}>
          <nav className={styles.footerLinks} aria-label="Related pages">
            <Link to="/privacy">Privacy Policy</Link>
          </nav>
          <p>
            &copy; {new Date().getFullYear()} {COMPANY_NAME}. All rights reserved.
          </p>
        </footer>
      </article>
    </main>
  );
}
