import Link from "next/link";
import { CtaSection } from "@/components/cta-section";
import { Eyebrow, Section } from "@/components/section";

const PROBLEMS = [
  {
    label: "Message",
    headline: "You don't stand out",
    points: [
      "Your buyers are looking. You're nowhere to be found.",
      "Your content is missing or saying nothing new.",
      "Sales starts from zero on every single call.",
    ],
  },
  {
    label: "Revenue",
    headline: "You can't stand out",
    points: [
      "Lots of activity. No clear path to ROI.",
      "Marketing and sales are not a unified system.",
      "Content exists. Your pipeline isn't growing.",
    ],
  },
];

const FUNNEL = [
  {
    num: "01",
    title: "Video",
    body: "Expert-led video builds awareness, authority, and trust before a buyer is ready to talk.",
  },
  {
    num: "02",
    title: "Content",
    body: "One conversation becomes social, newsletters, blogs, and sales content across every buyer channel.",
  },
  {
    num: "03",
    title: "Inbound",
    body: "Lead magnets and nurture turn engaged audiences into qualified opportunities for your sales team.",
  },
  {
    num: "04",
    title: "Outbound",
    body: "Targeted outreach puts your message in front of the right ICP and books the sales conversation.",
  },
];

const PIPELINE_STAGES = [
  "Awareness",
  "Impressions + followers",
  "Booked sales meetings",
  "Pipeline created",
  "Closed revenue",
];

const TESTIMONIALS = [
  {
    quote:
      "When we started this process about six months ago, we were at a run rate of about $7 million. And now, we are at a run rate of $12 million.",
    name: "Daniel Rosen",
    role: "Founder, Credit Repair Cloud",
  },
  {
    quote:
      "The investment into our content system has already closed $250k in 90 days and we're just getting started.",
    name: "Kevin Clayson",
    role: "DFY Investing",
  },
  {
    quote:
      "Our number of lead inquiries went up 55% in the first month, then another 65% the month after that. So definitely a major jump!",
    name: "Dr. Joy Kong",
    role: "Founder, AAICT",
  },
];

export default function HomePage() {
  return (
    <>
      <Section className="pt-20 md:pt-28">
        <div className="max-w-3xl">
          <h1>One system. Marketing + Sales.</h1>
          <p className="mt-6 text-lg text-ink/70 md:text-xl">
            Market Better fuses marketing and sales into one system: a
            video-first content engine built around your ICP, so every video,
            post, and email pulls the exact buyer you want closer to a sales
            conversation.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-4">
            <Link href="/how-it-works" className="btn btn-primary">
              See how the funnel works
            </Link>
            <Link href="/pricing" className="btn btn-outline">
              Pricing
            </Link>
          </div>
        </div>
      </Section>

      <Section className="bg-sand">
        <Eyebrow>The problem</Eyebrow>
        <h2>Two problems. Same root cause.</h2>
        <p className="mt-5 max-w-2xl text-lg text-ink/70">
          Every company wants two things: a clear, differentiated message and a
          path to more revenue.
        </p>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {PROBLEMS.map((problem) => (
            <div
              key={problem.label}
              className="rounded-2xl bg-white p-8 shadow-sm"
            >
              <Eyebrow>{problem.label}</Eyebrow>
              <h4>{problem.headline}</h4>
              <ul className="mt-6 flex flex-col gap-3">
                {problem.points.map((point) => (
                  <li key={point} className="flex gap-3 text-ink/70">
                    <span
                      aria-hidden
                      className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
                    />
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <p className="mt-10 text-lg font-medium">
          Most companies treat these as separate problems. They&apos;re not.
        </p>
      </Section>

      <Section>
        <Eyebrow>The system</Eyebrow>
        <h2>The Content Funnel System.</h2>
        <p className="mt-5 max-w-2xl text-lg text-ink/70">
          One compounding engine turns a single conversation into reach,
          pipeline, and revenue, with marketing and sales working as one system.
        </p>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {FUNNEL.map((stage) => (
            <div
              key={stage.num}
              className="flex flex-col rounded-2xl border border-ink/10 p-7 transition-colors hover:border-purple"
            >
              <span className="text-sm font-bold text-purple">{stage.num}</span>
              <h5 className="mt-3">{stage.title}</h5>
              <p className="mt-3 text-sm leading-relaxed text-ink/70">
                {stage.body}
              </p>
            </div>
          ))}
        </div>

        <Link href="/how-it-works" className="btn btn-primary mt-12">
          See how the funnel works
        </Link>
      </Section>

      <Section className="bg-ink text-white">
        <div className="max-w-3xl">
          <h2>We&apos;re judged by meetings booked. Not clicks or vanity metrics.</h2>
          <p className="mt-5 text-lg text-white/70">
            Marketing&apos;s job is simple: soften and accelerate the sales
            cycle. Make buyers warm before the first call. Put the right person
            on your sales team&apos;s calendar, already nodding before they pick
            up.
          </p>
        </div>

        <ol className="mt-12 flex flex-wrap items-center gap-x-3 gap-y-4">
          {PIPELINE_STAGES.map((stage, i) => (
            <li key={stage} className="flex items-center gap-3">
              <span className="rounded-full border border-white/20 px-4 py-2 text-sm text-white/80">
                {stage}
              </span>
              {i < PIPELINE_STAGES.length - 1 && (
                <span aria-hidden className="text-accent-bright">
                  →
                </span>
              )}
            </li>
          ))}
        </ol>
      </Section>

      <Section>
        <Eyebrow>Proof</Eyebrow>
        <h2>Results That Speak for Themselves.</h2>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {TESTIMONIALS.map((t) => (
            <figure
              key={t.name}
              className="flex flex-col justify-between rounded-2xl bg-beige p-8"
            >
              <blockquote className="text-ink/80">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-6 border-t border-ink/10 pt-5">
                <p className="font-semibold">{t.name}</p>
                <p className="text-sm text-ink/60">{t.role}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </Section>

      <CtaSection />
    </>
  );
}
