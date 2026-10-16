"use client";

import { useState } from "react";

/**
 * NOT WIRED TO A BACKEND YET — see docs/04-open-questions.md. The destination for
 * the current Lovable form is unknown; submitting here only logs locally so the
 * prototype can be reviewed without silently dropping real leads.
 */
export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setSubmitted(true);
      }}
      className="w-full max-w-md"
    >
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

        <button type="submit" className="btn btn-primary mt-2 self-start">
          Let&apos;s Talk
        </button>

        {submitted && (
          <p className="text-sm text-purple">
            Form not connected yet — this is a prototype. No data was sent.
          </p>
        )}
      </div>
    </form>
  );
}
