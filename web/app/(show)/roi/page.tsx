import type { Metadata } from "next";
import { RoiCalculator } from "@/components/roi-calculator";
import { CtaSection } from "@/components/cta-section";
import { Eyebrow, Section } from "@/components/section";

export const metadata: Metadata = {
  title: "ROI Calculator | Market Better",
  description:
    "Use your annual contract value and sales assumptions to model the return from qualified meetings.",
};

export default function RoiPage() {
  return (
    <>
      <Section className="pt-20 md:pt-28">
        <div className="max-w-3xl">
          <Eyebrow>ROI</Eyebrow>
          <h1>See what your pipeline could produce.</h1>
          <p className="mt-6 text-lg text-ink/70 md:text-xl">
            Use your annual contract value and sales assumptions to model the
            return from qualified meetings.
          </p>
        </div>

        <div className="mt-14">
          <RoiCalculator />
        </div>
      </Section>

      <CtaSection />
    </>
  );
}
