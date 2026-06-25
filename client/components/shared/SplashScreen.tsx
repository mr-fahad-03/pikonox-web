"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export default function SplashScreen() {
  const [showSplash, setShowSplash] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Check if this is the first visit in the current session
    const hasVisited = sessionStorage.getItem("hasVisited");
    if (!hasVisited) {
      setShowSplash(true);
      sessionStorage.setItem("hasVisited", "true");
    }
  }, []);

  useEffect(() => {
    if (showSplash) {
      const duration = 2500; // 2.5 seconds loading time
      const interval = 30; // ms
      const steps = duration / interval;
      let currentStep = 0;

      const timer = setInterval(() => {
        currentStep++;
        setProgress(Math.min((currentStep / steps) * 100, 100));
        
        if (currentStep >= steps) {
          clearInterval(timer);
          // Wait slightly after reaching 100% before fading out
          setTimeout(() => setShowSplash(false), 400);
        }
      }, interval);

      return () => clearInterval(timer);
    }
  }, [showSplash]);

  if (!showSplash) return null;

  return (
    <AnimatePresence>
      {showSplash && (
        <motion.div
          key="splash"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, filter: "blur(10px)" }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-white"
        >
          {/* Logo Container */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="flex flex-col items-center justify-center mb-6"
          >
            <div className="flex items-center gap-3 text-5xl font-extrabold tracking-tight font-(--font-poppins)">
              <Image
                src="/logo.png"
                alt="Logo"
                width={64}
                height={64}
                unoptimized
                className="object-contain"
              />
              <span>
                <span className="text-primary">iko</span>
                <span className="text-green-500">Nox</span>
              </span>
            </div>
          </motion.div>

          {/* Slogan */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.4, ease: "easeOut" }}
            className="text-center mb-10"
          >
            <h2 className="text-[13px] md:text-[14px] font-semibold tracking-[0.25em] text-gray-500 uppercase leading-relaxed text-center">
              EMPOWERING FOUNDERS.<br />
              BUILDING PAKISTAN'S DIGITAL FUTURE.
            </h2>
          </motion.div>

          {/* Progress Bar */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="w-64 max-w-[80vw] h-[3px] bg-gray-100 overflow-hidden relative"
          >
            <motion.div 
              className="absolute top-0 left-0 h-full bg-gradient-to-r from-primary to-blue-500"
              style={{ width: `${progress}%` }}
              layout
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
