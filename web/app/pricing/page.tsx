import type { Metadata } from "next";
import { CtaSection } from "@/components/cta-section";
import { Eyebrow, Section } from "@/components/section";

export const metadata: Metadata = {
  title: "Pricing | Market Better",
  description:
    "One engine. Pay for performance. Choose pay-per-call or a flat monthly fee.",
};

const PLANS = [
  {
    option: "Option 01",
    name: "Pay Per Call",
    price: "$4,900",
    priceSuffix: "/month + $600 per booked appointment",
    note: "Scale your booked appointments up or down, month by month.",
    featured: true,
  },
  {
    option: "Option 02",
    name: "Flat Fee",
    price: "$7,500",
    priceSuffix: "/month",
    note: "One predictable number every month. No variables.",
    featured: false,
  },
];

const INCLUDED = [
  {
    title: "Content Engine",
    summary: "Video, social, blog, and inbound running as one conversation",
    points: [
      "YouTube, podcast, and educational video",
      "Social, blog, and newsletter that keep the conversation going",
      "Inbound that turns attention into contacts",
    ],
  },
  {
    title: "Lead Generation Engine",
    summary: "Email, LinkedIn, and phone pointed at the same list",
    points: [
      "Email and LinkedIn outreach to ideal buyers",
      "Phone follow up on people already showing interest",
      "Booked sales appointments on your calendar",
    ],
  },
  {
    title: "Data Dashboard",
    summary: "Content and lead generation pulled into one platform",
    points: [
      "One view of content performance, leads, and pipeline",
      "Cost per booked appointment visibility",
      "Proof of monthly spend returns",
    ],
  },
];

export default function PricingPage() {
  return (
    <>
      <Section className="pt-20 md:pt-28">
        <div className="max-w-3xl">
          <Eyebrow>Pricing</Eyebrow>
          <h1>One Engine. Pay For Performance</h1>
          <p className="mt-6 text-lg text-ink/70 md:text-xl">
            Content Marketing builds the audience. Lead Generation turns it into
            pipeline. Same engine behind both. The only difference is how Market
            Better gets paid.
          </p>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {PLANS.map((plan) => (
            <div
              key={plan.name}
              /* Both cards carry a border so the 1px doesn't offset the
                 featured card's content against its neighbour. */
              className={`flex flex-col rounded-2xl border p-8 md:p-10 ${
                plan.featured
                  ? "border-transparent bg-ink text-white"
                  : "border-ink/10 bg-white"
              }`}
            >
              <p
                className={`text-xs font-semibold uppercase tracking-[0.12em] ${
                  plan.featured ? "text-accent-bright" : "text-purple"
                }`}
              >
                {plan.option}
              </p>
              <h3 className="mt-3">{plan.name}</h3>
              <p className="mt-6">
                <span className="text-4xl font-bold">{plan.price}</span>
                <span
                  className={`ml-1 text-sm ${
                    plan.featured ? "text-white/60" : "text-ink/60"
                  }`}
                >
                  {plan.priceSuffix}
                </span>
              </p>
              <p
                className={`mt-5 flex-1 ${
                  plan.featured ? "text-white/70" : "text-ink/70"
                }`}
              >
                {plan.note}
              </p>
              <a href="#contact" className="btn btn-primary mt-8 self-start">
                Let&apos;s Talk
              </a>
            </div>
          ))}
        </div>
      </Section>

      <Section className="bg-cream">
        <Eyebrow>What&apos;s included</Eyebrow>
        <h2>Both options, same engine.</h2>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {INCLUDED.map((block) => (
            <div key={block.title} className="rounded-2xl bg-white p-8">
              <h5>{block.title}</h5>
              <p className="mt-3 text-sm text-ink/60">{block.summary}</p>
              <ul className="mt-6 flex flex-col gap-3">
                {block.points.map((point) => (
                  <li key={point} className="flex gap-3 text-sm text-ink/75">
                    <span
                      aria-hidden
                      className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-purple"
                    />
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Section>

      <div id="contact">
        <CtaSection />
      </div>
    </>
  );
}
