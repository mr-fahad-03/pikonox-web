"use client";

import * as LucideIcons from "lucide-react";
import type { LucideIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const DEFAULT_STEPS = [
  {
    icon: "BrainCircuit",
    step: "Step 1",
    subtitle: "AI-Powered Discovery Audit",
    title: "Zero-risk assessment, tailored roadmap",
    bullets: [
      "Free 60-min strategy session to analyze your tech stack",
      "AI-driven scoping tool estimates time/cost savings",
      "Receive a GDPR/ISO 2701-compliant project blueprint",
    ],
  },
  {
    icon: "Network",
    step: "Step 2",
    subtitle: "Hybrid Team Onboarding",
    title: "Right talent + AI tools from day one",
    bullets: [
      "Match with vetted engineers (800+ experts)",
      "AI-augmented sprint planning for 30% faster kickoff",
      "Dedicated PM + automated progress dashboards",
    ],
  },
  {
    icon: "ShieldCheck",
    step: "Step 3",
    subtitle: "Build with AI Guardrails",
    title: "Code, test, deploy—smarter",
    bullets: [
      "AI pair-programming assistants (70% faster dev)",
      "Self-healing test suites (99.9% reliability)",
      "Real-time compliance checks (ISO 27001 baked in)",
    ],
  },
  {
    icon: "Rocket",
    step: "Step 4",
    subtitle: "Scale with Confidence",
    title: "Your growth, automated",
    bullets: [
      "AI-optimized cloud deployment",
      "Continuous performance monitoring + predictive scaling",
      "90-day post-launch support with AI-driven analytics",
    ],
  },
];

export type DevProcessStep = {
  icon: string;
  step: string;
  subtitle: string;
  title: string;
  bullets: string[];
};

export type DevProcessData = {
  sidebarHeading?: string;
  sidebarSub?: string;
  ctaLabel?: string;
  ctaHref?: string;
  imageUrl?: string;
  imageAlt?: string;
  steps?: DevProcessStep[];
};

function resolveIcon(name: string): LucideIcon {
  const I = (LucideIcons as unknown as Record<string, LucideIcon | undefined>)[name];
  return I || LucideIcons.BrainCircuit;
}

function StepCard({ data }: { data: DevProcessStep }) {
  const Icon = resolveIcon(data.icon);
  return (
    <div className="mb-16 last:mb-0">
      <div className="mb-6">
        <Icon className="w-10 h-10 text-primary stroke-[1.5]" />
      </div>
      <div className="flex items-center gap-3 mb-4">
        <span className="bg-green-600 text-white text-[13px] font-semibold px-4 py-1.5 rounded-full">{data.step}</span>
        <span className="text-green-600 text-[15px] font-medium">{data.subtitle}</span>
      </div>
      <h3 className="text-[28px] lg:text-[32px] md:text-[30px] font-semibold text-secondary mb-5 leading-tight">{data.title}</h3>
      <ul className="space-y-3">
        {data.bullets.map((bullet, idx) => (
          <li key={idx} className="flex items-start gap-3">
            <span className="text-secondary/50 mt-1.5 text-[8px]">●</span>
            <span className="text-secondary/75 font-medium text-base">{bullet}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function DevelopmentProcessSection({ data }: { data?: DevProcessData | null }) {
  const sidebarHeading =
    data?.sidebarHeading ??
    "Our Process:\nAI-Optimized,\nTransparent, Scalable";
  const sidebarSub =
    data?.sidebarSub ??
    "We blend human expertise with AI precision—delivering faster outcomes without compromising security.";
  const ctaLabel = data?.ctaLabel ?? "Schedule a Call";
  const ctaHref = data?.ctaHref ?? "/contact";
  const imageUrl =
    data?.imageUrl ?? "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=800";
  const imageAlt = data?.imageAlt ?? "AI Development Excellence";
  const steps = data?.steps?.length ? data.steps : DEFAULT_STEPS;

  return (
    <section className="py-24 bg-[#F8F9FA] relative">
      <div className="container mx-auto">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 relative items-start">
          <div className="w-full lg:w-[45%] lg:sticky lg:top-1/4">
            <h2 className="text-[38px] md:text-[45px] lg:text-[42px] xl:text-[48px] font-bold text-secondary mb-5 leading-[1.1] tracking-tight whitespace-pre-line">
              {sidebarHeading}
            </h2>
            <p className="text-base md:text-lg text-secondary/70 font-medium leading-relaxed mb-8 max-w-lg">{sidebarSub}</p>

            <Link
              href={ctaHref}
              className="inline-flex flex-shrink-0 items-center justify-center px-7 py-3 text-[15px] bg-green-600 hover:bg-green-700 text-white font-bold rounded-full transition-colors duration-300 shadow-md mb-12"
            >
              {ctaLabel}
            </Link>

            <div className="process-img relative rounded-xl overflow-hidden shadow-2xl h-[350px] xl:h-[450px] w-full">
              <Image src={imageUrl} alt={imageAlt} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 45vw" />
            </div>
          </div>

          <div className="w-full lg:w-[55%] lg:pt-5">
            <div className="max-w-xl xl:max-w-2xl mx-auto lg:ml-auto lg:mr-0">
              {steps.map((stepData, idx) => (
                <StepCard key={`${stepData.step}-${idx}`} data={stepData} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
