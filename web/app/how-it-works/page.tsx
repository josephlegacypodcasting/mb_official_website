import type { Metadata } from "next";
import { CtaSection } from "@/components/cta-section";
import { Eyebrow, Section } from "@/components/section";

export const metadata: Metadata = {
  title: "How It Works | Market Better",
  description:
    "One funnel. Four steps. From stranger to booked sales call, as one continuous flow.",
};

const STAGES = [
  {
    num: "01",
    title: "Video",
    depth: "Top of funnel",
    body: "Pure awareness and authority. YouTube, podcast, and educational content is how strangers discover you and start trusting you before they have any buying intent.",
  },
  {
    num: "02",
    title: "Content",
    depth: "Top → middle",
    body: "Social and short-form drive top-funnel reach and repetition; long-form written, newsletters, blogs, nurtures people who already know you and keeps you top of mind.",
  },
  {
    num: "03",
    title: "Inbound",
    depth: "Middle → bottom",
    body: "Lead magnets convert an anonymous audience into known contacts; email campaigns nurture those contacts toward the booked call where it hands off to the bottom.",
  },
  {
    num: "04",
    title: "Outbound",
    depth: "Bottom of funnel",
    body: "Targeted email straight at your ICP with one goal: a sales conversation. It skips awareness entirely and goes for the meeting.",
  },
];

export default function HowItWorksPage() {
  return (
    <>
      <Section className="pt-20 md:pt-28">
        <div className="max-w-3xl">
          <Eyebrow>The funnel</Eyebrow>
          <h1>One funnel. Four steps.</h1>
          <p className="mt-6 text-lg text-ink/70 md:text-xl">
            Each step lives at a different depth of the funnel: awareness at the
            top, nurture in the middle, the booked meeting at the bottom.
            Together they form one continuous flow from stranger to sales call.
          </p>
        </div>
      </Section>

      <Section className="bg-sand">
        <div className="flex flex-col gap-5">
          {STAGES.map((stage) => (
            <div
              key={stage.num}
              className="grid gap-5 rounded-2xl bg-white p-8 md:grid-cols-[auto_1fr] md:gap-10"
            >
              <div className="md:w-48">
                <span className="text-sm font-bold text-purple">
                  {stage.num}
                </span>
                <h4 className="mt-2">{stage.title}</h4>
                <p className="mt-2 text-xs font-semibold uppercase tracking-[0.12em] text-ink/50">
                  {stage.depth}
                </p>
              </div>
              <p className="text-ink/70 md:self-center md:text-lg">
                {stage.body}
              </p>
            </div>
          ))}
        </div>
      </Section>

      <Section>
        <div className="max-w-3xl">
          <h2>The content funnel system.</h2>
          <p className="mt-5 text-lg text-ink/70">
            One compounding engine that turns a single conversation into reach,
            pipeline, and revenue.
          </p>
          <a href="#contact" className="btn btn-primary mt-9">
            Let&apos;s connect →
          </a>
        </div>
      </Section>

      <div id="contact">
        <CtaSection />
      </div>
    </>
  );
}
