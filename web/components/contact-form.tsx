"use client";

import { useState } from "react";
import { submitLead, type LeadStatus } from "@/lib/submit-lead";

/**
 * Posts to /api/lead, which forwards to the LeadConnector webhook server-side.
 */
export function ContactForm() {
  const [status, setStatus] = useState<LeadStatus>("idle");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    setStatus("sending");

    try {
      await submitLead(form, "in-house");
      setStatus("sent");
      form.reset();
    } catch (error) {
      console.error(error);
      setStatus("error");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md">
      <div className="flex flex-col gap-4">
        <label className="flex flex-col gap-1.5">
          <span className="text-sm font-medium">
            Name <span className="text-accent">*</span>
          </span>
          <input
            required
            type="text"
            name="name"
            className="rounded-btn border border-ink/15 bg-white px-4 py-3 text-sm outline-none transition-colors focus:border-purple"
          />
        </label>

        <label className="flex flex-col gap-1.5">
          <span className="text-sm font-medium">
            Phone number <span className="text-accent">*</span>
          </span>
          <input
            required
            type="tel"
            name="phone"
            className="rounded-btn border border-ink/15 bg-white px-4 py-3 text-sm outline-none transition-colors focus:border-purple"
          />
        </label>

        <label className="flex flex-col gap-1.5">
          <span className="text-sm font-medium">
            Email <span className="text-accent">*</span>
          </span>
          <input
            required
            type="email"
            name="email"
            className="rounded-btn border border-ink/15 bg-white px-4 py-3 text-sm outline-none transition-colors focus:border-purple"
          />
        </label>

        <button
          type="submit"
          disabled={status === "sending"}
          className="btn btn-primary mt-2 self-start disabled:opacity-60"
        >
          {status === "sending" ? "Sending…" : "Let\u2019s Talk"}
        </button>

        {status === "sent" && (
          <p className="text-sm text-purple" role="status">
            Thanks — we&apos;ll be in touch shortly.
          </p>
        )}

        {status === "error" && (
          <p className="text-sm text-accent" role="alert">
            Something went wrong. Please try again, or email us directly.
          </p>
        )}
      </div>
    </form>
  );
}
