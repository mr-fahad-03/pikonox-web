"use client";

import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
import { useReveal } from "@/hooks/useReveal";

interface BreadcrumbProps {
  title: string;
  subtitle?: string;
  bgImage?: string;
}

export default function Breadcrumb({ title, subtitle, bgImage }: BreadcrumbProps) {
  const revealRef = useReveal<HTMLDivElement>({ y: 30, duration: 0.8 });

  return (
    <div className="relative pt-40 pb-24 lg:pt-52 lg:pb-36 overflow-hidden bg-secondary">
      {/* Background Pattern/Overlay */}
      <div className="absolute inset-0 z-0 opacity-20">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,#1683F8_0%,transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
      </div>
      
      {/* Animated Shapes */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-green-500/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl animate-bounce-slow"></div>

      <div className="container relative z-10">
        <div ref={revealRef} className="text-center max-w-3xl mx-auto">
          <nav className="flex items-center justify-center gap-2 mb-6" aria-label="Breadcrumb">
            <Link 
              href="/" 
              className="flex items-center gap-1.5 text-sm font-bold text-white/60 hover:text-primary transition-colors"
            >
              <Home className="w-4 h-4" />
              <span>Home</span>
            </Link>
            <ChevronRight className="w-4 h-4 text-white/30" />
            <span className="text-sm font-bold text-primary">{title}</span>
          </nav>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 tracking-tight">
            {title}
          </h1>
          
          {subtitle && (
            <p className="text-lg text-white/70 font-medium leading-relaxed">
              {subtitle}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
