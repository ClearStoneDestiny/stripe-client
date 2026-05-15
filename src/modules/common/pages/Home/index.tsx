import { CreditCard, ReceiptText, ShieldCheck } from "lucide-react";

const dashboardItems = [
  {
    description: "Create Checkout sessions against Stripe test mode.",
    icon: CreditCard,
    title: "Checkout",
  },
  {
    description: "Inspect demo subscription states from your backend.",
    icon: ReceiptText,
    title: "Subscriptions",
  },
  {
    description: "Authenticated routes now survive access-token refresh.",
    icon: ShieldCheck,
    title: "Session",
  },
];

export const HomePage = () => {
  return (
    <section className="mx-auto flex w-full max-w-5xl flex-col gap-8">
      <div className="space-y-3">
        <p className="text-xs font-semibold tracking-widest text-muted-foreground uppercase">
          Billing Lab
        </p>
        <h1 className="font-heading text-4xl font-semibold tracking-normal">
          Sandbox dashboard
        </h1>
        <p className="max-w-2xl text-sm leading-7 text-muted-foreground">
          This protected page is ready for the Stripe SaaS flows: checkout,
          subscriptions, customer portal and billing history.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {dashboardItems.map(({ description, icon: Icon, title }) => (
          <article className="border border-border bg-card p-5" key={title}>
            <Icon className="mb-5 size-5" />
            <h2 className="font-heading text-lg font-semibold tracking-wider uppercase">
              {title}
            </h2>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">
              {description}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
};
