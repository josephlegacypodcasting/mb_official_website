"use client";

import { useEffect, useMemo, useState } from "react";
import { useRoi } from "@/components/roi-context";

/**
 * 24-month ROI model.
 *
 * Inputs and outputs mirror the Lovable v1 calculator. That version defaulted
 * every field to zero, which renders "0.0x" on load and divides by zero; these
 * defaults are illustrative instead, and every divisor is guarded.
 *
 * Assumptions are stated on the page rather than hidden here — this is
 * prospect-facing and makes revenue claims, so the math needs to be auditable.
 * Year 2 revenue counts renewals only; it does not assume a second year of new
 * acquisition, which keeps the projection conservative.
 */

const currency = (n: number) =>
  n.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });

const MONTHS_PER_YEAR = 12;
const PROJECTION_MONTHS = 24;

export function RoiCalculator() {
  const [acv, setAcv] = useState(25000);
  const [appointments, setAppointments] = useState(20);
  const [closeRate, setCloseRate] = useState(20);
  const [retainer, setRetainer] = useState(4900);
  const [costPerAppointment, setCostPerAppointment] = useState(600);
  const [renewalRate, setRenewalRate] = useState(70);

  const { reportRoi } = useRoi();
  const [touched, setTouched] = useState(false);

  // Unlike Mike's version, these fields start at illustrative defaults rather
  // than zero — so an untouched calculator must not be reported, or every lead
  // would carry numbers the prospect never chose.
  const track =
    <T,>(set: (value: T) => void) =>
    (value: T) => {
      setTouched(true);
      set(value);
    };

  const results = useMemo(() => {
    const dealsPerMonth = appointments * (closeRate / 100);
    const dealsYear1 = dealsPerMonth * MONTHS_PER_YEAR;
    const revenueYear1 = dealsYear1 * acv;

    const renewedDealsYear2 = dealsYear1 * (renewalRate / 100);
    const revenueYear2 = renewedDealsYear2 * acv;

    const monthlyCost = retainer + appointments * costPerAppointment;
    const totalInvestment = monthlyCost * PROJECTION_MONTHS;

    const totalRevenue = revenueYear1 + revenueYear2;
    const netReturn = totalRevenue - totalInvestment;
    const roi = totalInvestment > 0 ? totalRevenue / totalInvestment : 0;

    return {
      dealsPerMonth,
      dealsYear1,
      revenueYear1,
      renewedDealsYear2,
      revenueYear2,
      totalInvestment,
      netReturn,
      roi,
    };
  }, [acv, appointments, closeRate, retainer, costPerAppointment, renewalRate]);

  useEffect(() => {
    if (!touched) return;

    reportRoi({
      acv,
      appointmentsPerMonth: appointments,
      closeRatePct: closeRate,
      monthlyRetainer: retainer,
      costPerAppointment,
      renewalRatePct: renewalRate,
      dealsPerMonth: results.dealsPerMonth,
      dealsYear1: results.dealsYear1,
      revenueYear1: results.revenueYear1,
      renewedDealsYear2: results.renewedDealsYear2,
      revenueYear2: results.revenueYear2,
      totalInvestment: results.totalInvestment,
      netReturn: results.netReturn,
      multiple: results.roi,
      costBasisMonths: PROJECTION_MONTHS,
    });
  }, [
    touched,
    results,
    acv,
    appointments,
    closeRate,
    retainer,
    costPerAppointment,
    renewalRate,
    reportRoi,
  ]);

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_1.1fr] lg:gap-12">
      <div className="rounded-2xl border border-ink/10 p-8">
        <h5>Your assumptions</h5>
        <div className="mt-6 flex flex-col gap-5">
          <NumberField
            label="Average contract value (ACV)"
            value={acv}
            onChange={track(setAcv)}
            prefix="$"
            step={1000}
          />
          <NumberField
            label="New appointments set per month"
            value={appointments}
            onChange={track(setAppointments)}
          />
          <NumberField
            label="Close rate on appointments set"
            value={closeRate}
            onChange={track(setCloseRate)}
            suffix="%"
            max={100}
          />
          <NumberField
            label="Monthly retainer"
            value={retainer}
            onChange={track(setRetainer)}
            prefix="$"
            step={100}
          />
          <NumberField
            label="Cost per appointment"
            value={costPerAppointment}
            onChange={track(setCostPerAppointment)}
            prefix="$"
            step={50}
          />
          <NumberField
            label="Client renewal rate (year 2)"
            value={renewalRate}
            onChange={track(setRenewalRate)}
            suffix="%"
            max={100}
          />
        </div>
      </div>

      <div className="flex flex-col gap-6">
        <div className="rounded-2xl bg-ink p-8 text-white">
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-accent-bright">
            24-month projected ROI
          </p>
          <p className="mt-3 text-6xl font-bold">
            {results.roi.toFixed(1)}
            <span className="text-4xl">x</span>
          </p>
          <p className="mt-4 text-sm text-white/60">
            {results.dealsPerMonth.toFixed(1)} new deals per month at these
            assumptions.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <Stat label="Deals closed in year 1" value={results.dealsYear1.toFixed(1)} />
          <Stat label="Revenue in year 1" value={currency(results.revenueYear1)} />
          <Stat
            label="Renewed deals in year 2"
            value={results.renewedDealsYear2.toFixed(1)}
          />
          <Stat label="Revenue in year 2" value={currency(results.revenueYear2)} />
          <Stat
            label="Total investment"
            value={currency(results.totalInvestment)}
          />
          <Stat
            label="Net return"
            value={currency(results.netReturn)}
            tone={results.netReturn >= 0 ? "positive" : "negative"}
          />
        </div>

        <p className="text-xs leading-relaxed text-ink/50">
          Monthly cost is the retainer plus appointments per month × cost per
          appointment. On the flat-fee plan, set cost per appointment to $0.
          Year 2 revenue reflects renewals only and assumes no additional new
          business, so the projection stays conservative. Figures are a model,
          not a guarantee.
        </p>
      </div>
    </div>
  );
}

function Stat({
  label,
  value,
  tone = "neutral",
}: {
  label: string;
  value: string;
  tone?: "neutral" | "positive" | "negative";
}) {
  const toneClass =
    tone === "positive"
      ? "text-purple"
      : tone === "negative"
        ? "text-accent"
        : "text-ink";

  return (
    <div className="rounded-2xl bg-cream p-6">
      <p className="text-xs font-medium uppercase tracking-[0.08em] text-ink/50">
        {label}
      </p>
      <p className={`mt-2 text-2xl font-bold ${toneClass}`}>{value}</p>
    </div>
  );
}

function NumberField({
  label,
  value,
  onChange,
  prefix,
  suffix,
  step = 1,
  max,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
  prefix?: string;
  suffix?: string;
  step?: number;
  max?: number;
}) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-sm font-medium">{label}</span>
      <div className="flex items-center rounded-btn border border-ink/15 bg-white transition-colors focus-within:border-purple">
        {prefix && (
          <span className="pl-4 text-sm text-ink/50" aria-hidden>
            {prefix}
          </span>
        )}
        <input
          type="number"
          min={0}
          max={max}
          step={step}
          value={value}
          onChange={(e) => {
            const next = Number(e.target.value);
            if (Number.isNaN(next) || next < 0) return;
            onChange(max !== undefined ? Math.min(next, max) : next);
          }}
          className="w-full bg-transparent px-4 py-3 text-sm outline-none"
        />
        {suffix && (
          <span className="pr-4 text-sm text-ink/50" aria-hidden>
            {suffix}
          </span>
        )}
      </div>
    </label>
  );
}
