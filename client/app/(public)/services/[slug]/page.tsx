export const dynamic = "force-dynamic";

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CheckCircle2, ArrowRight, MessageSquare, Phone, Mail } from "lucide-react";
import Link from "next/link";
import FAQSection from "@/components/features/home/FAQSection";
import ConsultationSection from "@/components/features/home/ConsultationSection";
import { getServiceBySlug, getServices } from "@/actions/services";
import { getFAQs } from "@/actions/faqs";
import { getSection } from "@/actions/homepage";
import { buildEntityMetadata } from "@/lib/seo/buildMetadata";
import { DEFAULT_SERVICES } from "@/lib/default-services";

const FALLBACK_IMG = "https://images.unsplash.com/photo-1551434678-e076c223a692?w=1200&q=80";

const DEFAULT_APPROACH = [
  { title: "Deep Discovery", desc: "We start by understanding your business goals and technical requirements to ensure a solid foundation." },
  { title: "Agile Implementation", desc: "Our teams work in iterative sprints, delivering value at every stage and allowing for rapid feedback." },
  { title: "Rigorous Testing", desc: "We employ automated and manual testing to ensure your solution is secure, scalable, and bug-free." },
  { title: "Continuous Support", desc: "Our relationship doesn't end at launch. We provide ongoing maintenance and strategic advice." },
];

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  let service = await getServiceBySlug(slug);
  
  if (!service) {
    service = DEFAULT_SERVICES.find((s) => s.slug === slug);
  }

  return buildEntityMetadata(
    service ? {
      title: service.metaTitle || service.title,
      description: service.metaDescription || service.shortDesc,
      excerptOrDescription: service.metaDescription || service.shortDesc,
      metaTitle: service.metaTitle,
      metaDescription: service.metaDescription,
      metaKeywords: service.metaKeywords,
      canonicalPath: service.canonicalPath || `/services/${slug}`,
      ogImage: service.ogImage,
      image: service.image,
    } : null,
    { path: `/services/${slug}`, fallbackTitle: "Service | PikoNox" },
  );
}

export default async function ServiceDetailsPage({ params }: PageProps) {
  const { slug } = await params;
  let [service, allServices, faqs, contactData] = await Promise.all([
    getServiceBySlug(slug),
    getServices(),
    getFAQs(),
    getSection("contact"),
  ]);

  if (!service) {
    service = DEFAULT_SERVICES.find((s) => s.slug === slug);
  }

  if (!service) notFound();

  const activeAllServices = allServices.length > 0 ? allServices : DEFAULT_SERVICES;

  const approachSteps =
    Array.isArray(service.approachSteps) && service.approachSteps.length > 0
      ? service.approachSteps
      : DEFAULT_APPROACH;

  const relatedServices = activeAllServices.filter((s: any) => s.slug !== slug).slice(0, 5);

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": service.title,
    "description": service.shortDesc || service.description,
    "url": `https://www.pikonox.com/services/${service.slug}`,
    "provider": {
      "@type": "Organization",
      "name": "PikoNox"
    },
    "image": service.image || FALLBACK_IMG
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }} />

      {/* ── Hero ── */}
      <section className="pt-32 pb-16 lg:pb-24 bg-white relative overflow-hidden">
        {/* Giant header style instead of breadcrumb */}
        <div className="container relative z-10 mb-12">
           <Link href="/services" className="inline-flex items-center gap-2 text-primary font-bold hover:text-secondary transition-colors mb-6 text-sm uppercase tracking-widest">
             <ArrowRight className="w-4 h-4 rotate-180" /> Back to Services
           </Link>
           <h1 className="text-4xl lg:text-6xl font-black text-secondary leading-tight max-w-4xl">
             {service.title}
           </h1>
        </div>

        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

            {/* Images Composition */}
            <div className="relative h-full min-h-[450px] lg:min-h-[600px] w-full flex items-center justify-center">
              <div className="absolute inset-0 bg-primary/8 rounded-3xl blur-3xl scale-95" />
              
              {/* Main Image */}
              <div className="absolute top-0 right-0 w-[85%] h-[75%] rounded-[32px] overflow-hidden shadow-2xl ring-1 ring-gray-100 z-10 group/img1">
                <img
                  src={service.image || FALLBACK_IMG}
                  alt={service.title}
                  className="w-full h-full object-cover group-hover/img1:scale-110 transition-transform duration-1000"
                />
                {/* badge */}
                <div className="absolute top-6 left-6 flex items-center gap-2 bg-white/95 backdrop-blur-md px-5 py-2.5 rounded-full text-xs font-black text-primary shadow-xl tracking-[0.2em] uppercase">
                  PikoNox Service
                </div>
              </div>

              {/* Secondary Image */}
              <div className="absolute bottom-0 left-0 w-[60%] h-[55%] rounded-[32px] overflow-hidden shadow-2xl ring-8 ring-white z-20 group/img2 hover:-translate-y-4 transition-all duration-500 hover:shadow-primary/20">
                <img
                  src={service.secondaryImage || FALLBACK_IMG}
                  alt={`${service.title} implementation details`}
                  className="w-full h-full object-cover group-hover/img2:scale-110 transition-transform duration-1000"
                />
              </div>
            </div>

            {/* Content */}
            <div className="flex flex-col gap-6">
              <div className="flex items-center gap-3">
                <span className="w-10 h-0.5 bg-primary" />
                <span className="text-sm font-semibold text-primary uppercase tracking-widest">Service Overview</span>
              </div>

              <div
                className="text-lg text-secondary/75 leading-relaxed prose prose-lg prose-blue max-w-none font-medium"
                dangerouslySetInnerHTML={{ __html: service.description || service.shortDesc }}
              />

              {service.features?.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                  {service.features.map((feature: any, i: number) => (
                    <div key={i} className="flex items-center gap-3 p-4 rounded-xl bg-gray-50 border border-gray-100 hover:border-primary/30 hover:bg-blue-50/50 transition-all shadow-sm">
                      <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
                      <span className="font-bold text-secondary text-sm">{feature.title}</span>
                    </div>
                  ))}
                </div>
              )}

              <div className="flex items-center gap-4 pt-6">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-3 bg-primary text-white px-8 py-4 rounded-full font-black uppercase tracking-widest text-sm hover:bg-secondary transition-colors shadow-xl shadow-primary/30"
                >
                  Discuss Your Project
                  <MessageSquare className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Approach + Sidebar ── */}
      <section className="py-16 lg:py-24 bg-slate-50 border-t border-slate-100">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">

            {/* Approach Steps — 2/3 */}
            <div className="lg:col-span-2 bg-white rounded-[32px] p-8 lg:p-14 shadow-xl shadow-slate-200/50 ring-1 ring-slate-100">
              <div className="flex items-center gap-4 mb-12">
                <span className="w-12 h-1 bg-primary rounded-full" />
                <h2 className="text-3xl font-black text-secondary">Our Strategic Approach</h2>
              </div>
              <div className="space-y-10">
                {approachSteps.map((step: { title: string; desc?: string }, i: number) => (
                  <div key={i} className="flex gap-6 group">
                    <div className="w-14 h-14 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center text-primary font-black text-lg shrink-0 group-hover:bg-primary group-hover:text-white transition-all shadow-sm">
                      {String(i + 1).padStart(2, "0")}
                    </div>
                    <div className="pt-2">
                      <h4 className="text-xl font-bold text-secondary mb-2">{step.title}</h4>
                      <p className="text-base text-secondary/60 leading-relaxed font-medium">{step.desc ?? ""}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Sidebar — 1/3 */}
            <div className="flex flex-col gap-8">

              {/* CTA Card */}
              <div className="bg-secondary rounded-[32px] p-10 text-white relative overflow-hidden shadow-2xl">
                <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-primary/20 blur-2xl" />
                <div className="absolute bottom-0 left-0 w-32 h-32 rounded-full bg-white/5 blur-2xl" />
                <div className="relative z-10">
                  <h3 className="text-2xl font-black mb-4">Need a Custom Solution?</h3>
                  <p className="text-white/70 text-base leading-relaxed mb-8 font-medium">
                    Our experts are ready to build the perfect technology solution for your most complex business challenges.
                  </p>
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-3 bg-primary text-white px-6 py-3.5 rounded-full text-sm font-black uppercase tracking-widest hover:bg-white hover:text-secondary transition-colors"
                  >
                    Contact Us <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>

              {/* Contact Quick Info */}
              {(contactData?.phone || contactData?.email) && (
                <div className="bg-white rounded-[32px] p-10 ring-1 ring-slate-100 shadow-xl shadow-slate-200/50 space-y-6">
                  <h3 className="font-black text-secondary text-xl">Talk to an Expert</h3>
                  {contactData.phone && (
                    <a href={`tel:${contactData.phone}`} className="flex items-center gap-4 text-base font-bold text-secondary/80 hover:text-primary transition-colors group">
                      <span className="w-12 h-12 bg-slate-50 border border-slate-100 rounded-2xl flex items-center justify-center shrink-0 group-hover:border-primary/30 group-hover:bg-blue-50/50 transition-colors">
                        <Phone className="w-5 h-5 text-primary" />
                      </span>
                      {contactData.phone}
                    </a>
                  )}
                  {contactData.email && (
                    <a href={`mailto:${contactData.email}`} className="flex items-center gap-4 text-base font-bold text-secondary/80 hover:text-primary transition-colors group">
                      <span className="w-12 h-12 bg-slate-50 border border-slate-100 rounded-2xl flex items-center justify-center shrink-0 group-hover:border-primary/30 group-hover:bg-blue-50/50 transition-colors">
                        <Mail className="w-5 h-5 text-primary" />
                      </span>
                      {contactData.email}
                    </a>
                  )}
                </div>
              )}

              {/* Related Services */}
              {relatedServices.length > 0 && (
                <div className="bg-white rounded-[32px] p-10 ring-1 ring-slate-100 shadow-xl shadow-slate-200/50">
                  <h3 className="font-black text-secondary mb-6 text-xl">Related Services</h3>
                  <ul className="space-y-4">
                    {relatedServices.map((s: any) => (
                      <li key={s.id}>
                        <Link
                          href={`/services/${s.slug}`}
                          className="flex items-center justify-between text-base text-secondary/70 font-bold hover:text-primary transition-colors group py-2 border-b border-slate-50 last:border-0"
                        >
                          {s.title}
                          <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all text-primary" />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <FAQSection initialFaqs={faqs} />
      <ConsultationSection data={contactData} />
    </>
  );
}
