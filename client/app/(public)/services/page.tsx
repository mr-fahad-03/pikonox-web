export const revalidate = 60;

import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import FAQSection from "@/components/features/home/FAQSection";
import ConsultationSection from "@/components/features/home/ConsultationSection";
import { getServices } from "@/actions/services";
import { getFAQs } from "@/actions/faqs";
import { getSection } from "@/actions/homepage";
import { getListingSeo } from "@/actions/siteSeo";
import { buildListingMetadata } from "@/lib/seo/buildMetadata";
import { DEFAULT_SERVICES } from "@/lib/default-services";

const FALLBACK_IMG = "https://images.unsplash.com/photo-1551434678-e076c223a692?w=1200&q=80";

export async function generateMetadata(): Promise<Metadata> {
  const [seo, page] = await Promise.all([getListingSeo("seo-services"), getSection("page-services")]);
  return buildListingMetadata({
    metaTitle: seo?.metaTitle || page?.metaTitle || "Our Services | PikoNox - Expert Web, Mobile & Cloud Solutions",
    metaDescription: seo?.metaDescription || page?.metaDescription || "Explore our comprehensive suite of tech services, including custom Web Development, Mobile Apps, Cloud DevOps, POS Systems, and AI solutions tailored for enterprise growth.",
    metaKeywords: seo?.metaKeywords || page?.metaKeywords || "Web Development, Mobile App Development, iOS Android apps, POS systems, Cloud infrastructure, DevOps, AI Machine Learning, UI/UX Design, custom software development agency",
    path: "/services",
    fallbackTitle: "Services | PikoNox - Innovative Tech Solutions",
    fallbackDescription:
      "Explore our wide range of software development, cloud infrastructure, and AI/ML services designed for modern enterprises.",
  });
}

export default async function ServicesPage() {
  const [services, faqs, contactData, page] = await Promise.all([
    getServices(),
    getFAQs(),
    getSection("contact"),
    getSection("page-services"),
  ]);

  const activeServices = services.length > 0 ? services : DEFAULT_SERVICES;

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "itemListElement": activeServices.map((srv: any, idx: number) => ({
      "@type": "ListItem",
      "position": idx + 1,
      "item": {
        "@type": "Service",
        "name": srv.title,
        "description": srv.shortDesc || srv.description,
        "url": `https://www.pikonox.com/services/${srv.slug}`,
        "provider": {
          "@type": "Organization",
          "name": "PikoNox"
        }
      }
    }))
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }} />

      <section className="pt-32 pb-24 bg-white relative overflow-hidden">
        <div className="container">
          
          {/* SEO Content Block & Giant Header */}
          <div className="max-w-4xl mx-auto text-center mb-20 relative z-10">
            <span className="text-primary font-black tracking-[0.2em] uppercase text-sm mb-4 block">What We Do</span>
            <h1 className="text-5xl lg:text-7xl font-black text-secondary mb-8 leading-tight">Our Services</h1>
            <p className="text-xl text-secondary/80 leading-relaxed font-medium">
              We leverage cutting-edge frameworks to deliver scalable, secure, and highly optimized digital solutions. From powerful Custom Software and Point of Sale (POS) Systems to enterprise-grade Cloud Architecture, our expert team transforms visionary ideas into robust digital reality.
            </p>
          </div>

          <div className="grid grid-cols-12 gap-10 lg:gap-20 relative z-10">
            {activeServices.map((service: any, idx: number) => (
              <div key={service.id} className="col-span-12 group">
                <div className={`flex flex-col lg:flex-row items-center gap-10 lg:gap-24 ${idx % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}>
                  
                  {/* Image Column */}
                  <div className="w-full lg:w-1/2">
                    <div className="relative">
                      <div className="absolute -inset-4 bg-primary/5 rounded-[40px] blur-2xl group-hover:bg-primary/10 transition-colors duration-500"></div>
                      <Link href={`/services/${service.slug}`} className="relative block rounded-[32px] overflow-hidden border-8 border-white shadow-2xl group-hover:shadow-primary/20 transition-all duration-500">
                        <img 
                          src={service.image || FALLBACK_IMG} 
                          alt={service.title} 
                          className="w-full h-[400px] lg:h-[550px] object-cover group-hover:scale-105 transition-transform duration-[1.5s]"
                        />
                      </Link>
                    </div>
                  </div>

                  {/* Content Column */}
                  <div className="w-full lg:w-1/2">
                    <div className="max-w-xl">
                      <div className="flex items-center gap-4 mb-6">
                        <span className="w-16 h-1 bg-primary rounded-full"></span>
                        <span className="text-sm font-black text-primary uppercase tracking-[0.2em]">Service 0{idx + 1}</span>
                      </div>
                      
                      <Link href={`/services/${service.slug}`}>
                        <h3 className="text-3xl lg:text-[40px] font-black text-secondary mb-6 hover:text-primary transition-colors leading-tight">
                          {service.title}
                        </h3>
                      </Link>
                      
                      <div className="text-lg text-secondary/70 font-medium leading-relaxed mb-10 prose prose-sm" dangerouslySetInnerHTML={{ __html: service.shortDesc || service.description || "" }} />

                      {service.features?.length > 0 && (
                        <div className="bg-slate-50 p-6 rounded-2xl mb-10 border border-slate-100">
                          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-6">
                            {service.features.map((feature: any, i: number) => (
                              <li key={i} className="flex items-start gap-3 font-bold text-secondary/80 text-[15px]">
                                <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                                <span>{feature.title}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      <Link 
                        href={`/services/${service.slug}`}
                        className="inline-flex items-center gap-3 text-white bg-primary hover:bg-secondary px-8 py-4 rounded-full font-black uppercase tracking-widest text-sm transition-all duration-300 shadow-lg shadow-primary/30 hover:shadow-secondary/30 group/btn"
                      >
                        Explore Service Details
                        <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-2 transition-transform" />
                      </Link>
                    </div>
                  </div>

                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <FAQSection initialFaqs={faqs} />
      <ConsultationSection data={contactData} />
    </>
  );
}
