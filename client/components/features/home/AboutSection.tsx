"use client";

import { useCounter } from "@/hooks/useCounter";
import { useReveal } from "@/hooks/useReveal";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const chartOptions: ApexCharts.ApexOptions = {
  chart: {
    type: "bar",
    height: 170,
    toolbar: { show: false },
    sparkline: { enabled: false },
    background: "transparent",
  },
  plotOptions: {
    bar: {
      borderRadius: 4,
      columnWidth: "55%",
    },
  },
  colors: ["#1683F8", "#2EA043"],
  dataLabels: { enabled: false },
  xaxis: {
    labels: { show: false },
    axisBorder: { show: false },
    axisTicks: { show: false },
  },
  yaxis: { show: false },
  grid: { show: false },
  tooltip: { enabled: false },
  theme: { mode: "dark" },
};

const chartSeries = [
  { name: "Efficiency", data: [20, 35, 25, 45, 30, 50, 35, 55, 40, 60, 45, 50] },
  { name: "Overhead", data: [15, 20, 18, 25, 15, 30, 20, 35, 25, 30, 20, 25] },
];

export type AboutSectionData = {
  heading?: string;
  subheading?: string;
  features?: string[];
  imageUrl?: string;
  imageAlt?: string;
  avatarUrls?: string[];
  teamCardTitle?: string;
  teamIntroSuffix?: string;
  teamIntroLabel?: string;
  linkLabel?: string;
  linkHref?: string;
  statEfficiency?: number;
  statGrowth?: number;
  statMembers?: number;
};

const DEFAULTS: Required<
  Pick<
    AboutSectionData,
    | "heading"
    | "subheading"
    | "features"
    | "imageUrl"
    | "imageAlt"
    | "avatarUrls"
    | "teamCardTitle"
    | "teamIntroSuffix"
    | "teamIntroLabel"
    | "linkLabel"
    | "linkHref"
    | "statEfficiency"
    | "statGrowth"
    | "statMembers"
  >
> = {
  heading: "Meet Your Technology Partner in Growth",
  subheading:
    "With over a decade of experience helping forward-thinking enterprises unlock digital value. Whether you're just starting out or scaling fast, our expert tech teams are here to guide every step with scalable AI solutions.",
  features: [
    "Expert tech consulting",
    "Comprehensive AI solutions",
    "Client-centric development",
    "Proactive infrastructure management",
  ],
  imageUrl: "https://images.unsplash.com/photo-1542744094-3a31f272c490?auto=format&fit=crop&q=80&w=1000",
  imageAlt: "Technology Partner",
  avatarUrls: [
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80",
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80",
    "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&q=80",
  ],
  teamCardTitle: "Introducing Our Architecture Experts",
  teamIntroSuffix: "+",
  teamIntroLabel: "Engineers",
  linkLabel: "More about us",
  linkHref: "/about",
  statEfficiency: 99.9,
  statGrowth: 10,
  statMembers: 25,
};

function AnimatedFeature({ feature, i }: { feature: string; i: number }) {
  const ref = useReveal<HTMLDivElement>({ x: 30, y: 0, duration: 0.6, delay: 0.2 + i * 0.1 });
  return (
    <div ref={ref} className="sm:col-span-6 col-span-12">
      <div className="bg-white/80 backdrop-blur-md shadow-sm border border-gray-100 rounded-2xl p-4 flex items-center gap-3.5 transition-all duration-300 hover:shadow-md hover:-translate-y-1 hover:border-blue-100 group">
        <CheckCircle2 className="w-6 h-6 text-green-500 shrink-0 group-hover:scale-110 transition-transform" />
        <span className="text-secondary font-semibold text-[15px]">{feature}</span>
      </div>
    </div>
  );
}

export default function AboutSection({ data }: { data?: AboutSectionData | null }) {
  const cfg = { ...DEFAULTS, ...data };
  const efficiencyRef = useCounter(cfg.statEfficiency, 2000);
  const growthRef = useCounter(cfg.statGrowth, 1500);
  const membersRef = useCounter(cfg.statMembers);

  const leftHeadingRef = useReveal<HTMLDivElement>({ y: 30, duration: 0.8 });
  const leftChartRef = useReveal<HTMLDivElement>({ scale: 0.95, opacity: 0, duration: 0.8, delay: 0.2 });
  const leftTeamRef = useReveal<HTMLDivElement>({ x: -30, opacity: 0, duration: 0.8, delay: 0.3 });
  const rightImageRef = useReveal<HTMLDivElement>({ x: 50, y: 0, duration: 0.85, delay: 0.1 });

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-green-50/40 rounded-full blur-3xl -translate-x-1/2 -z-10 pointer-events-none"></div>

      <div className="container relative z-10">
        <div className="grid grid-cols-12 gap-12 lg:gap-16">
          <div className="xl:col-span-6 col-span-12">
            <div ref={leftHeadingRef} className="mb-12">
              <h2 className="text-[38px] md:text-[45px] lg:text-[48px] font-bold text-secondary mb-6 leading-tight tracking-tight">
                {cfg.heading.split("\n").map((line, i, arr) => (
                  <span key={i}>
                    {line}
                    {i < arr.length - 1 ? <br className="hidden sm:block" /> : null}
                  </span>
                ))}
              </h2>
              <p className="sm:text-lg text-base font-medium text-secondary/70 leading-relaxed max-w-xl">{cfg.subheading}</p>
            </div>

            <div className="grid grid-cols-12 gap-y-10 items-center">
              <div ref={leftChartRef} className="lg:col-span-6 sm:col-span-8 col-span-12">
                <div className="bg-[#0f172a] p-7 pb-0 rounded-[2rem] shadow-2xl relative overflow-hidden group hover:-translate-y-1 transition-transform duration-500">
                  <div className="flex justify-between items-center relative z-10">
                    <div>
                      <span className="text-xs font-bold text-white/50 block uppercase tracking-widest mb-1.5">System Uptime</span>
                      <div className="flex items-center">
                        <span ref={efficiencyRef} className="text-4xl font-extrabold text-white">
                          {cfg.statEfficiency}
                        </span>
                        <span className="text-4xl font-extrabold text-white">%</span>
                      </div>
                    </div>
                    <div className="w-12 h-12 rounded-2xl bg-green-500 flex items-center justify-center shadow-[0_0_20px_rgba(46,160,67,0.4)]">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                        <polyline points="22 4 12 14.01 9 11.01" />
                      </svg>
                    </div>
                  </div>

                  <div className="flex items-center mt-5 relative z-10">
                    <div className="flex items-center gap-2 mr-5">
                      <span className="w-2.5 h-2.5 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(22,131,248,0.8)]" />
                      <span className="text-white/70 text-[10px] font-bold uppercase tracking-widest">Efficiency</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-green-500 shadow-[0_0_8px_rgba(46,160,67,0.8)]" />
                      <span className="text-white/70 text-[10px] font-bold uppercase tracking-widest">Speed</span>
                    </div>
                    <div className="ml-auto">
                      <span className="text-emerald-400 bg-emerald-400/10 px-2.5 py-1 rounded-full text-xs font-bold flex items-center gap-0.5">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                          <path d="m18 15-6-6-6 6" />
                        </svg>
                        <span ref={growthRef}>{cfg.statGrowth}</span>X
                      </span>
                    </div>
                  </div>

                  <div className="-mx-5 mt-2 relative z-10 transition-transform duration-700 group-hover:scale-105">
                    <Chart options={chartOptions} series={chartSeries} type="bar" height={170} />
                  </div>
                </div>
              </div>

              <div ref={leftTeamRef} className="lg:col-span-6 sm:col-span-4 col-span-12 sm:ml-8 flex flex-col justify-center">
                <div className="mb-6">
                  <p className="text-lg text-secondary font-bold mb-4">{cfg.teamCardTitle}</p>
                  <div className="flex items-center gap-3">
                    <div className="flex">
                      {cfg.avatarUrls.map((url, i) => (
                        <Image
                          key={i}
                          src={url}
                          alt={`Team member ${i + 1}`}
                          width={45}
                          height={45}
                          className="w-12 h-12 -ml-3 first:ml-0 rounded-full border-2 border-white relative object-cover duration-300 hover:z-10 hover:scale-110 hover:-translate-y-1 shadow-sm"
                        />
                      ))}
                    </div>
                    <div className="flex flex-col ml-1">
                      <div className="flex gap-0.5 text-green-600 text-lg font-black">
                        <span ref={membersRef}>{cfg.statMembers}</span>
                        <span>{cfg.teamIntroSuffix}</span>
                      </div>
                      <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">{cfg.teamIntroLabel}</span>
                    </div>
                  </div>
                </div>

                <Link
                  href={cfg.linkHref}
                  className="inline-flex items-center gap-3 px-6 py-3 bg-[#F8F9FA] hover:bg-black text-secondary hover:text-white font-bold rounded-full transition-all duration-300 w-fit group border border-gray-100 hover:border-black"
                >
                  {cfg.linkLabel}
                  <div className="w-6 h-6 rounded-full bg-green-500 text-white flex items-center justify-center group-hover:bg-white group-hover:text-black transition-colors">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-0.5 transition-transform">
                      <path d="M5 12h14"></path>
                      <path d="m12 5 7 7-7 7"></path>
                    </svg>
                  </div>
                </Link>
              </div>
            </div>
          </div>

          <div className="xl:col-span-6 col-span-12 xl:pl-10">
            <div ref={rightImageRef} className="relative rounded-[2rem] overflow-hidden h-[400px] xl:h-[480px] shadow-2xl mb-8">
              <Image
                src={cfg.imageUrl}
                alt={cfg.imageAlt}
                fill
                className="object-cover hover:scale-105 transition-transform duration-700"
                sizes="(max-width: 1280px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
            </div>

            <div className="grid grid-cols-12 gap-x-5 gap-y-4">
              {cfg.features.map((feature, idx) => (
                <AnimatedFeature key={feature} feature={feature} i={idx} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
