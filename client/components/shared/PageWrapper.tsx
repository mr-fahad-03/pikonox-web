"use client";

import { useEffect, useState, type ReactNode } from "react";
import { useUIStore } from "@/lib/store";
import { ReactLenis, useLenis } from 'lenis/react';
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGsapInit } from "@/hooks/useGsap";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function PageWrapper({ children }: { children: ReactNode }) {
  const setLoading = useUIStore((s) => s.setLoading);
  const isLoading = useUIStore((s) => s.isLoading);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const lenis = useLenis();

  // Initialize GSAP
  useGsapInit();

  // GSAP + Lenis perfect sync as specified
  useEffect(() => {
    // GSAP + Lenis sync
    const raf = (time: number) => {
      ScrollTrigger.update();
      requestAnimationFrame(raf);
    };

    const reqId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(reqId);
      ScrollTrigger.killAll();
    };
  }, []);

  // Handle loading screen
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(timer);
  }, [setLoading]);

  // Handle scroll progress
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? scrollTop / docHeight : 0;
      setScrollProgress(progress);
      setShowScrollTop(scrollTop > 200);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    if (lenis) {
      lenis.scrollTo(0, { duration: 1.2 });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const circumference = 2 * Math.PI * 24;
  const offset = circumference * (1 - scrollProgress);

  return (
    <ReactLenis root options={{ lerp: 0.08, smoothWheel: true }}>
   

      {/* Page Content */}
      <div >
        <div >{children}</div>
      </div>

      {/* Video Dialog (global) */}
      <VideoDialogPortal />

      {/* Scroll to Top */}
      <button
        id="scrollProgress"
        onClick={scrollToTop}
        className={`fixed bottom-8 right-8 z-9999 size-12 rounded-full cursor-pointer transition-all duration-500 ${
          showScrollTop ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        aria-label="Scroll to top"
      >
        <svg width="48" height="48" viewBox="0 0 52 52">
          <circle
            cx="26"
            cy="26"
            r="24"
            stroke="rgba(255,255,255,0.15)"
            strokeWidth="3"
            fill="rgba(15, 23, 42, 0.8)"
          />
          <circle
            cx="26"
            cy="26"
            r="24"
            stroke="#1683F8"
            strokeWidth="3"
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            transform="rotate(-90 26 26)"
            className="transition-[stroke-dashoffset] duration-200"
          />
          <path
            d="M26 33V19M26 19L20 25M26 19L32 25"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </ReactLenis>
  );
}

function VideoDialogPortal() {
  const { isOpen, src, type } = useUIStore((s) => s.videoDialog);
  const closeVideoDialog = useUIStore((s) => s.closeVideoDialog);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-99999 flex items-center justify-center bg-black/80 backdrop-blur-sm"
      onClick={closeVideoDialog}
    >
      <div
        className="relative w-full max-w-4xl mx-4 aspect-video"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={closeVideoDialog}
          className="absolute -top-10 right-0 text-white hover:text-primary transition-colors cursor-pointer"
          aria-label="Close video"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        {type === "youtube" || type === "vimeo" ? (
          <iframe
            src={`${src}?autoplay=1`}
            allow="autoplay; encrypted-media; fullscreen"
            allowFullScreen
            className="w-full h-full rounded-xl"
            title="Video Player"
          />
        ) : (
          <video controls autoPlay className="w-full h-full rounded-xl">
            <source src={src} type="video/mp4" />
          </video>
        )}
      </div>
    </div>
  );
}
