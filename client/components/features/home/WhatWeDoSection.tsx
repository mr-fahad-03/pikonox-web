"use client";

import { useReveal } from "@/hooks/useReveal";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const DEFAULT_ITEMS = [
  { title: "AI Transformation", description: "AI Transformation is the key to staying ahead — streamlining operations, unlocking insights, and driving intelligent growth.", caption: "We help businesses become intelligent, scalable AI-driven enterprises", image: "https://www.testim.io/wp-content/uploads/2024/02/power_of_ai_blog.jpg", imageHover: "https://www.testim.io/wp-content/uploads/2024/02/power_of_ai_blog.jpg" },
  { title: "Mobile App Development", description: "pikonox is your trusted partner for crafting digital experiences that inspire and perform.", caption: "We love creating extraordinary experiences for our mobile consumers", image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&q=80", imageHover: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&q=80" },
  { title: "Ecommerce Development", description: "At pikonox, we design e-commerce sites that are not only visually stunning but also responsive and fast.", caption: "We develop Ecommerce that can boost your online sales", image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80", imageHover: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&q=80" },
];

interface WhatWeDoData {
  badge?: string;
  headingPrefix?: string;
  highlight1?: string;
  highlight2?: string;
  headingSuffix?: string;
  items?: { title: string; description: string; caption: string; image: string; imageHover: string }[];
}

export default function WhatWeDoSection({ data }: { data?: WhatWeDoData }) {
  const items = data?.items?.length ? data.items : DEFAULT_ITEMS;
  const badge = data?.badge ?? "Our Capabilities";
  const headingPrefix = data?.headingPrefix ?? "PikoNox is a premium";
  const highlight1 = data?.highlight1 ?? "AI Transformation";
  const highlight2 = data?.highlight2 ?? "Digital Solutions";
  const headingSuffix = data?.headingSuffix ?? "agency.";

  const headingRef = useReveal<HTMLDivElement>({ y: 35 });
  const [activeIdx, setActiveIdx] = useState(0);

  return (
    <section className="xl:py-32 py-16 bg-white relative overflow-hidden">
      <div className="container relative z-10">
        
        {/* Section Heading */}
        <div ref={headingRef} className="mb-16 md:mb-24 text-left">
          <div className="inline-flex items-center gap-3 mb-6">
            <span className="w-12 h-px bg-primary hidden md:block"></span>
            <span className="text-primary font-semibold tracking-wider uppercase text-sm">
              {badge}
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-[3.5rem] font-bold text-black leading-[1.1] max-w-4xl tracking-tight">
            {headingPrefix}{" "}
            <span className="text-primary">{highlight1}</span> and{" "}
            <span className="text-green-500">{highlight2}</span> {headingSuffix}
          </h2>
        </div>

        {/* Content Split: Left Text Accordion, Right Sticky Image */}
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-24 items-start">
          
          {/* Left Column (Text List) */}
          <div className="w-full lg:w-1/2 flex flex-col justify-center">
            <div className="border-t border-black/10">
              {items.map((service, i) => (
                <div 
                  key={service.title}
                  onMouseEnter={() => setActiveIdx(i)}
                  onClick={() => setActiveIdx(i)}
                  className="group py-8 md:py-10 border-b border-black/10 cursor-pointer relative"
                >
                  
                  {/* Title Bar */}
                  <div className="relative z-10 flex flex-col md:flex-row gap-2 md:gap-6 md:items-center">
                     <span className={`text-xl font-medium font-serif transition-colors duration-300 ${activeIdx === i ? 'text-primary' : 'text-black/40'}`}>
                        0{i + 1}
                     </span>
                     <h3 className={`text-3xl md:text-4xl font-bold transition-transform duration-500 ${activeIdx === i ? 'text-black lg:translate-x-4' : 'text-black/70 group-hover:text-black'}`}>
                       {service.title}
                     </h3>
                  </div>
                  
                  {/* Expandable Description */}
                  <div className={`grid transition-all duration-500 ease-in-out ${activeIdx === i ? 'grid-rows-[1fr] mt-6 opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
                    <div className="overflow-hidden">
                      <div className="pl-0 md:pl-12 lg:pl-14">
                        <p className="text-lg text-black/80 leading-relaxed font-medium">
                          {service.description}
                        </p>
                        <Link
                          href="/services"
                          className="mt-8 inline-flex items-center gap-2 text-green-600 font-semibold hover:gap-4 transition-all duration-300 border-b-2 border-green-600 pb-1"
                        >
                          Explore Service
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M5 12h14M12 5l7 7-7 7"/>
                          </svg>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column (Sticky Viewport) */}
          <div className="w-full lg:w-1/2 relative lg:sticky lg:top-32 h-[400px] lg:h-[600px] rounded-[2rem] overflow-hidden shadow-xl bg-gray-100">
             {items.map((service, i) => (
               <div 
                 key={`img-${i}`}
                 className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out z-10 ${activeIdx === i ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
               >
                 <Image
                   src={service.imageHover || service.image}
                   alt={service.title}
                   fill
                   className={`object-cover transition-transform duration-[1.5s] ease-[cubic-bezier(0.16,1,0.3,1)] ${activeIdx === i ? 'scale-100' : 'scale-110'}`}
                   sizes="(max-width: 1024px) 100vw, 50vw"
                   priority={i === 0}
                 />
                 
                 {/* Gradient Overlay */}
                 <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60" />
                 
                 {/* Floating Caption inside Image */}
                 <div className={`absolute bottom-0 left-0 w-full p-8 md:p-12 transition-all duration-[1.2s] delay-100 ease-[cubic-bezier(0.16,1,0.3,1)] ${activeIdx === i ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
                    <p className="text-white text-xl md:text-2xl font-medium tracking-wide leading-snug">
                      &quot;{service.caption}&quot;
                    </p>
                 </div>
               </div>
             ))}
          </div>

        </div>
      </div>
    </section>
  );
}
