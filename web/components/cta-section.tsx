import { ContactForm } from "@/components/contact-form";
import { Section } from "@/components/section";

export function CtaSection() {
  return (
    <Section className="bg-cream">
      <div className="grid gap-12 md:grid-cols-2 md:items-center">
        <div>
          <h2>Ready to turn content into pipeline?</h2>
          <p className="mt-5 text-lg text-ink/70">
            We help service-based businesses turn their ideal buyers into
            prospects through content and booked sales calls through lead
            generation.
          </p>
        </div>
        {/* Needs an explicit width: justify-self-end makes this grid item
            shrink-to-fit, which collapsed the form to its intrinsic width. */}
        <div className="w-full md:max-w-md md:justify-self-end">
          <ContactForm />
        </div>
      </div>
    </Section>
  );
}
