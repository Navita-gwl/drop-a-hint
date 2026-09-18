import { redirect, Form, useLoaderData } from "react-router";
import { login } from "../../shopify.server";
import styles from "./styles.module.css";
import stylesheet from "./styles.module.css?url";

export const loader = async ({ request }) => {
  const url = new URL(request.url);

  if (url.searchParams.get("shop")) {
    throw redirect(`/app?${url.searchParams.toString()}`);
  }

  return { showForm: Boolean(login) };
};

export const meta = () => [
  { title: "Drop A Hint — Product referrals for Shopify" },
  {
    name: "description",
    content:
      "Let shoppers drop a hint to friends, send referral emails, and reward purchases with discounts.",
  },
];

export const links = () => [{ rel: "stylesheet", href: stylesheet }];

const FEATURES = [
  {
    title: "Drop a hint on product pages",
    description:
      "Shoppers share products with friends through a storefront form that creates a trackable referral link.",
  },
  {
    title: "Invite friends by email",
    description:
      "Send branded referral emails so friends land on the right product with a personalized message.",
  },
  {
    title: "Reward successful referrals",
    description:
      "Automatically issue percentage or fixed discounts when a referred friend completes a purchase.",
  },
];

export default function App() {
  const { showForm } = useLoaderData();

  return (
    <div className={styles.page}>
      <div className={styles.atmosphere} aria-hidden="true" />

      <main className={styles.main}>
        <header className={styles.hero}>
          <p className={styles.brand}>Drop A Hint</p>
          <h1 className={styles.heading}>
            Turn product love into referrals that convert
          </h1>
          <p className={styles.tagline}>
            Help customers recommend products to friends, track every referral,
            and reward the shoppers who drive new sales.
          </p>

          {showForm && (
            <Form className={styles.form} method="post" action="/auth/login">
              <label className={styles.label} htmlFor="shop">
                Shop domain
              </label>
              <div className={styles.formRow}>
                <input
                  id="shop"
                  className={styles.input}
                  type="text"
                  name="shop"
                  placeholder="my-shop-domain.myshopify.com"
                  autoComplete="off"
                  spellCheck="false"
                />
                <button className={styles.button} type="submit">
                  Log in
                </button>
              </div>
              <span className={styles.hint}>
                e.g. my-shop-domain.myshopify.com
              </span>
            </Form>
          )}
        </header>

        <section className={styles.features} aria-label="Product features">
          {FEATURES.map((feature) => (
            <article key={feature.title} className={styles.feature}>
              <h2 className={styles.featureTitle}>{feature.title}</h2>
              <p className={styles.featureText}>{feature.description}</p>
            </article>
          ))}
        </section>
      </main>
    </div>
  );
} 
