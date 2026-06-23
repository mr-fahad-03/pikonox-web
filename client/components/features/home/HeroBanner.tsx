"use client";

import { useCounter } from "@/hooks/useCounter";
import { useUIStore } from "@/lib/store";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Autoplay, EffectFade, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const DEFAULT_SOCIAL_LINKS = [
  { label: "Instagram", href: "https://www.instagram.com", icon: "fa-brands fa-instagram" },
  { label: "Facebook", href: "https://www.facebook.com", icon: "fa-brands fa-facebook-f" },
  { label: "LinkedIn", href: "https://www.linkedin.com", icon: "fa-brands fa-linkedin-in" },
  { label: "Twitter", href: "https://www.x.com", icon: "fa-brands fa-x-twitter" },
];

const DEFAULT_SLIDES = [
  { id: 1, badge: "Take Charge of Your Business", headline: "Proven consulting strategies for modern global enterprises.", description: "We deliver strategic insights and innovative solutions that empower forward-thinking organizations." },
  { id: 2, badge: "Innovative Solutions", headline: "Transforming visionary ideas into digital reality today.", description: "Our expert technical team leverages cutting-edge technology to build robust, scalable applications." },
];

const DEFAULT_STATS = [
  { value: "1M", label: "Overall Positive Customer Feedback" },
  { value: "18+", label: "Industrial Years of Experiences" },
];

interface HeroData {
  slides?: { badge: string; headline: string; description: string }[];
  stats?: { value: string; label: string }[];
  bgVideoId?: string;
  videoUrl?: string;
  socialLinks?: { label: string; href: string; icon?: string }[];
}

export default function HeroBanner({ data }: { data?: HeroData }) {
  const slides = data?.slides?.length ? data.slides : DEFAULT_SLIDES;
  const stats = data?.stats?.length ? data.stats : DEFAULT_STATS;
  const socialLinks = data?.socialLinks?.length ? data.socialLinks : DEFAULT_SOCIAL_LINKS;
  const bgVideoId = data?.bgVideoId || "ahy5o5nT4oI";
  const videoUrl = data?.videoUrl || "https://www.youtube.com/embed/tVphpcFHGaI";

  const openVideoDialog = useUIStore((s) => s.openVideoDialog);
  const stat0Val = stats[0]?.value?.replace(/[^0-9]/g, "") || "18";
  const yearsRef = useCounter(parseInt(stat0Val));
  const statsRef = useRef<HTMLDivElement>(null);
  const socialRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  
  // Track GSAP instance to allow usage inside Swiper callbacks
  const gsapRef = useRef<any>(null);

  useEffect(() => {
    setMounted(true);
    let isMounted = true;
    let ctx: { revert: () => void } | null = null;
    (async () => {
      const { default: gsap } = await import("gsap");
      if (!isMounted) return;
      gsapRef.current = gsap;
      ctx = gsap.context(() => {
        const ease = "power3.out";
        // Static elements animation on page load
        gsap.fromTo(statsRef.current,  { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, ease, delay: 0.7 });
        gsap.fromTo(socialRef.current, { x: -30, opacity: 0 }, { x: 0, opacity: 1, duration: 0.7, ease, delay: 0.8 });
      });
    })();
    return () => { 
      isMounted = false;
      ctx?.revert(); 
    };
  }, []);

  const animateSlide = (swiper: any) => {
    const gsap = gsapRef.current;
    if (!gsap || !swiper) return;
    
    // Fallback to DOM query if swiper.slides is undefined
    const slides = swiper.slides || (swiper.el ? swiper.el.querySelectorAll('.swiper-slide') : []);
    
    // Hide components on all slides so they don't awkwardly reveal
    Array.from(slides).forEach((slide: any) => {
      const b = slide.querySelector(".slide-badge");
      const h = slide.querySelector(".slide-headline");
      const d = slide.querySelector(".slide-desc");
      const c = slide.querySelector(".slide-cta");
      if (b) gsap.set(b, { opacity: 0 });
      if (h) gsap.set(h, { clipPath: "inset(0 100% 0 0)" });
      if (d) gsap.set(d, { opacity: 0 });
      if (c) gsap.set(c, { opacity: 0 });
    });

    // Get active slide element
    const activeSlide = slides[swiper.activeIndex] || (swiper.slides ? swiper.slides[swiper.activeIndex] : null);
    if (!activeSlide) return;

    const badge = activeSlide.querySelector(".slide-badge");
    const headline = activeSlide.querySelector(".slide-headline");
    const desc = activeSlide.querySelector(".slide-desc");
    const cta = activeSlide.querySelector(".slide-cta");

    const ease = "power3.out";

    if (badge) {
      gsap.fromTo(badge, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, ease, delay: 0.1 });
    }
    if (headline) {
      gsap.fromTo(headline, { clipPath: "inset(0 100% 0 0)" }, { clipPath: "inset(0 0% 0 0)", duration: 1.1, ease: "power4.out", delay: 0.3 });
    }
    if (desc) {
      gsap.fromTo(desc, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, ease, delay: 0.5 });
    }
    if (cta) {
      gsap.fromTo(cta, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, ease, delay: 0.65 });
    }
  };

  return (
    <section className="relative w-full h-screen min-h-[700px] xl:min-h-screen bg-black overflow-hidden">
      
      {/* Universal Background Video */}
      <div className="absolute inset-0 w-full h-full z-0 overflow-hidden pointer-events-none">
        <iframe 
          className="absolute top-1/2 left-1/2 w-[150vw] h-[150vh] min-w-[1920px] min-h-[1080px] -translate-x-1/2 -translate-y-1/2" 
          src={`https://www.youtube.com/embed/${bgVideoId}?autoplay=1&mute=1&controls=0&loop=1&playlist=${bgVideoId}&showinfo=0&rel=0&modestbranding=1`} 
          title="DUBAI, United Arab Emirates In 8K ULTRA HD HDR 60 FPS." 
          frameBorder="0" 
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        ></iframe>
      </div>

      {/* Global Overlay over context video */}
      <div className="absolute inset-0 bg-black/40 z-[1] pointer-events-none" />

      {mounted && (
        <Swiper
          modules={[EffectFade, Autoplay, Navigation, Pagination]}
          effect="fade"
          fadeEffect={{ crossFade: true }}
          speed={1000}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          loop={true}
          allowTouchMove={false}
          className="absolute inset-0 w-full h-full z-[2]"
          onSwiper={(swiper) => {
            setTimeout(() => animateSlide(swiper), 100);
          }}
          onSlideChangeTransitionStart={(swiper) => {
            animateSlide(swiper);
          }}
        >
          {slides.map((slide, idx) => (
            <SwiperSlide key={idx} className="relative w-full h-full bg-transparent">
              <div className="absolute inset-0 w-full h-full">
                
                {/* Slide Content */}
                <div className="container mx-auto relative z-10 h-full flex flex-col">
                  <div className="pt-[100px] lg:pt-[105px] flex-1 pb-24">
                    <div className="text-center">
                      <div>
                        <div className="mb-0 relative inline-block max-w-[1000px] mx-auto">
                          <span className="slide-badge text-lg text-center font-medium text-white py-2.5 px-5 rounded-2lg border border-white/10 backdrop-blur-[20px] bg-white/5 inline-block opacity-0">
                            {slide.badge}
                          </span>
                          <h1 className="slide-headline 2xl:text-7xl xl:text-5xl lg:text-[50px] sm:text-4xl text-3xl font-semibold mt-5 text-white leading-tight" style={{ clipPath: "inset(0 100% 0 0)" }}>
                            {slide.headline}
                          </h1>
                          <p className="slide-desc mt-6 text-lg sm:text-xl text-white/80 max-w-3xl mx-auto opacity-0 font-light leading-relaxed">
                            {slide.description}
                          </p>
                        </div>

                        {/* CTA Buttons */}
                        <div className="slide-cta flex items-center justify-center flex-wrap gap-4 max-w-5xl mx-auto opacity-0">
                          <Link
                            href="/contact"
                            className="btn bg-white group p-1 sm:mr-4 h-15 border border-white hover:border-primary relative overflow-hidden"
                          >
                            <span className="button-flair" />
                            <span className="sm:px-6 px-3 text-xl font-semibold text-secondary z-1 relative group-hover:text-white transition-colors duration-500">
                              Free Consultation
                            </span>
                            <span className="overflow-hidden bg-green-500 rounded-full size-[50px] inline-flex items-center justify-center z-1 relative">
                              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                                <path d="M7 7H17V17" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M7 17L17 7" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                              </svg>
                            </span>
                          </Link>

                          {/* Video Play Button */}
                          <div className="relative">
                            <button
                              onClick={() => openVideoDialog(videoUrl, "youtube")}
                              className="cursor-pointer size-20 flex items-center justify-center relative p-2.5 before:absolute before:inset-0 before:bg-white/5 before:rounded-full before:scale-[0.7] before:duration-500 hover:before:scale-100"
                              aria-label="Play introduction video"
                            >
                              <span className="inline-block size-15 leading-[60px] text-center rounded-full bg-primary duration-500 hover:bg-white text-secondary animate-[ripple-1_1s_infinite]">
                                <i className="fa-solid fa-play" />
                              </span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      )}

      {/* Floating Elements (Independent of slider) */}
      <div className="absolute inset-0 container mx-auto z-10 pointer-events-none flex flex-col justify-end pb-5 max-lg:hidden">
        {/* Stats */}
        <div ref={statsRef} className="sm:flex justify-center max-w-4xl mx-auto items-center relative xl:w-full lg:w-[80%] pointer-events-auto">
          <div className="max-sm:mb-2.5 border border-white/10 rounded-l-3xl py-5 px-10 sm:w-1/2 bg-white/5 backdrop-blur-sm flex items-center shadow-2xl">
            <span className="2xl:text-[50px] text-[40px] font-bold 2xl:mr-5 mr-3 text-white leading-none">
              {stats[0]?.value ?? "1M"}
            </span>
            <p className="text-xs font-bold text-white/70 uppercase tracking-[0.2em] leading-tight">
              {stats[0]?.label ?? "Overall Positive Customer Feedback"}
            </p>
          </div>
          <div className="bg-green-600/95 backdrop-blur-md py-5 px-10 sm:w-1/2 rounded-r-3xl border border-white/10 shadow-2xl">
            <div className="flex items-center">
              <span className="text-white font-bold xl:text-[50px] text-[40px] leading-none">
                <span ref={yearsRef}>{stat0Val}</span>
              </span>
              <span className="font-bold xl:text-[50px] text-[40px] text-white leading-none">+</span>
              <p className="2xl:ml-5 ml-3 text-xs font-bold text-white uppercase tracking-[0.2em] leading-tight">
                {stats[1]?.label ?? "Industrial Years of Experiences"}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Vertical Social Links */}
      <div ref={socialRef} className="absolute left-12 top-[25%] -translate-x-1/2 max-xl:hidden z-20">
        <ul className="mb-0 flex items-center [writing-mode:vertical-rl] relative">
          {socialLinks.map((social) => (
            <li key={social.label} className="text-center mx-5">
              <a
                className="text-white text-[13px]  font-black uppercase tracking-[0.3em] relative duration-500 flex items-center flex-col group hover:text-primary transition-all"
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
              >
                {social.label}
              </a>
            </li>
          ))}
        </ul>
      </div>

    </section>
  );
}

