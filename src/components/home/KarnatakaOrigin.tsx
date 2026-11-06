"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Play, Pause, Volume2, VolumeX, Maximize2, X, Sparkles, MapPin, ArrowRight } from "lucide-react";
import { SectionReveal } from "@/components/kavero-motion/SectionReveal";

export function KarnatakaOrigin() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const modalVideoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [showEstateModal, setShowEstateModal] = useState(false);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play().catch(() => {});
      setIsPlaying(true);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  // Modal accessibility: Escape key & body scroll lock
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && showEstateModal) {
        setShowEstateModal(false);
      }
    };

    if (showEstateModal) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [showEstateModal]);

  return (
    <>
      <SectionReveal>
        <section id="origin" className="relative w-full bg-[#180E09] py-14 sm:py-20 overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Panoramic Banner Frame with Running Video Background */}
            <div className="relative w-full rounded-2xl lg:rounded-3xl overflow-hidden border border-[#4A3022] shadow-luxury min-h-[340px] sm:min-h-[400px] lg:min-h-[460px] flex items-center justify-center bg-[#24160E] group">
              {/* Background Video Layer - Bright, Vivid & Crisp */}
              <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                <video
                  ref={videoRef}
                  autoPlay
                  loop
                  muted={isMuted}
                  playsInline
                  poster="/videos/kavero-origin-poster.jpg"
                  className="absolute inset-0 w-full h-full max-w-full max-h-full object-cover filter brightness-[1.06] contrast-[1.08] saturate-[1.1] transition-transform duration-1000 group-hover:scale-105"
                >
                  <source src="/videos/kavero-origin-video.mp4" type="video/mp4" />
                </video>

                {/* Subtle vignette overlay to ensure text readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#140D09]/75 via-[#140D09]/30 to-[#140D09]/50 pointer-events-none" />
              </div>

              {/* Center Content Layer with Frosted Glass Scrim */}
              <div className="relative z-10 max-w-2xl mx-auto text-center px-6 py-8 sm:py-10 my-6 rounded-2xl bg-[#1A1009]/65 backdrop-blur-[6px] border border-[#A96C40]/30 shadow-luxury flex flex-col items-center space-y-3.5 sm:space-y-4">
                <span className="text-xs font-semibold text-copper-light uppercase tracking-[0.25em] select-none flex items-center gap-1.5 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                  <Sparkles className="w-3.5 h-3.5 text-copper-light" />
                  Our Origin
                </span>

                <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-cream-light font-normal tracking-tight drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)] leading-tight">
                  The Karnataka Advantage
                </h2>

                <p className="text-sm sm:text-base text-cream-secondary/95 font-light leading-relaxed max-w-lg drop-shadow-[0_2px_6px_rgba(0,0,0,0.85)]">
                  Grown in the misty hills of the Western Ghats, nourished by mineral-rich mountain streams,
                  and handpicked by local coffee farmers — KAVERO brings you the authentic taste of Karnataka’s coffee heritage.
                </p>

                <div className="pt-2 flex flex-wrap items-center justify-center gap-3.5">
                  <Link
                    href="/our-estates"
                    className="bg-copper hover:bg-copper-hover active:scale-95 text-[#FFF7EA] text-xs sm:text-sm font-semibold px-6 py-3 rounded-xl transition-all flex items-center gap-2 shadow-copper cursor-pointer"
                  >
                    <span>Explore Our Estates</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>

                  <button
                    onClick={() => setShowEstateModal(true)}
                    type="button"
                    className="bg-[#1E120B]/90 hover:bg-[#1E120B] border border-[#50382A] text-cream-light text-xs sm:text-sm font-medium px-5 py-3 rounded-xl transition-all flex items-center gap-2 backdrop-blur-sm hover:border-copper/70 cursor-pointer shadow-lg"
                  >
                    <Maximize2 className="w-4 h-4 text-copper-light" />
                    <span>Origin Film & Gallery</span>
                  </button>
                </div>
              </div>

              {/* Video Controls in Bottom-Right Corner */}
              <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 z-20 flex items-center gap-2 bg-[#1A1009]/85 backdrop-blur-md px-3 py-1.5 rounded-full border border-[#4A3022]">
                <button
                  onClick={togglePlay}
                  type="button"
                  aria-label={isPlaying ? "Pause background video" : "Play background video"}
                  className="w-7 h-7 rounded-full flex items-center justify-center text-cream-light hover:text-copper transition-colors cursor-pointer"
                >
                  {isPlaying ? (
                    <Pause className="w-3.5 h-3.5 fill-current" />
                  ) : (
                    <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
                  )}
                </button>

                <button
                  onClick={toggleMute}
                  type="button"
                  aria-label={isMuted ? "Unmute video sound" : "Mute video sound"}
                  className="w-7 h-7 rounded-full flex items-center justify-center text-cream-light hover:text-copper transition-colors cursor-pointer"
                >
                  {isMuted ? (
                    <VolumeX className="w-3.5 h-3.5" />
                  ) : (
                    <Volume2 className="w-3.5 h-3.5" />
                  )}
                </button>

                <span className="hidden sm:inline-block text-[11px] text-cream-secondary/80 font-mono pl-1.5 border-l border-[#4A3022]">
                  Chikmagalur Film
                </span>
              </div>
            </div>
          </div>
        </section>
      </SectionReveal>

      {/* Accessible Origin Modal: Natural Falls, Harvest Story & Full Film */}
      {showEstateModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 sm:p-6 animate-in fade-in duration-200"
          role="dialog"
          aria-modal="true"
          aria-label="Karnataka Estates Origin Film and Photography Gallery"
        >
          <div className="relative w-full max-w-5xl bg-[#1B1009] border border-[#50382A] rounded-2xl overflow-hidden shadow-2xl max-h-[92vh] flex flex-col">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-[#3D271B] bg-[#24160E]">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-copper/20 border border-copper/40 flex items-center justify-center text-copper-light">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] uppercase font-semibold text-copper-light tracking-[0.2em] block">
                    Karnataka Single-Estate Heritage
                  </span>
                  <h3 className="font-serif text-lg sm:text-xl text-cream-light font-medium">
                    Western Ghats Natural Falls & Handpicked Harvest
                  </h3>
                </div>
              </div>
              <button
                onClick={() => setShowEstateModal(false)}
                type="button"
                aria-label="Close modal"
                className="w-8 h-8 rounded-full border border-[#4A3022] text-cream-light hover:text-copper flex items-center justify-center hover:bg-[#1E120B] transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Body with High-Pixel Visuals */}
            <div className="overflow-y-auto p-6 space-y-6">
              {/* Full Video Stream with Sound */}
              <div className="relative w-full aspect-video rounded-xl overflow-hidden border border-[#4A3022] bg-black shadow-lg">
                <video
                  ref={modalVideoRef}
                  autoPlay
                  loop
                  controls
                  playsInline
                  poster="/videos/kavero-origin-poster.jpg"
                  className="w-full h-full object-cover"
                >
                  <source src="/videos/kavero-origin-video.mp4" type="video/mp4" />
                </video>
              </div>

              {/* High-Pixel Two-Column Feature: Natural Falls & Harvest Story */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Feature 1: Natural Falls */}
                <div className="bg-[#24160E] border border-[#4A3022] rounded-xl overflow-hidden flex flex-col select-none">
                  <div className="relative w-full aspect-[4/3] bg-black">
                    <Image
                      src="/images/origin-waterfall-highres.jpg"
                      alt="Jog Falls cascading down the misty cliffs in Karnataka"
                      fill
                      sizes="(max-width: 768px) 100vw, 500px"
                      draggable={false}
                      onDragStart={(e) => e.preventDefault()}
                      onContextMenu={(e) => e.preventDefault()}
                      className="object-cover kavero-nondraggable-image"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#24160E] via-transparent to-transparent opacity-80 pointer-events-none" />
                    <span className="absolute bottom-3 left-3 bg-[#1E120B]/90 text-copper-light text-[11px] font-semibold uppercase tracking-wider px-3 py-1 rounded-md border border-copper/40">
                      Pristine Mountain Waters
                    </span>
                  </div>
                  <div className="p-5 space-y-2 flex-1 flex flex-col justify-between">
                    <h4 className="font-serif text-lg text-cream-light font-medium">
                      Western Ghats Natural Waterfalls
                    </h4>
                    <p className="text-xs sm:text-sm text-cream-secondary/90 leading-relaxed font-light">
                      Nourished by the monsoon-fed falls of Karnataka, our coffee bushes thrive in mineral-rich volcanic soil shrouded in perpetual morning mist at 4,000+ feet.
                    </p>
                  </div>
                </div>

                {/* Feature 2: Handpicked Harvest */}
                <div className="bg-[#24160E] border border-[#4A3022] rounded-xl overflow-hidden flex flex-col select-none">
                  <div className="relative w-full aspect-[4/3] bg-black">
                    <Image
                      src="/images/origin-harvest-highres.jpg"
                      alt="Karnataka coffee farmer selectively handpicking ripe red cherries"
                      fill
                      sizes="(max-width: 768px) 100vw, 500px"
                      draggable={false}
                      onDragStart={(e) => e.preventDefault()}
                      onContextMenu={(e) => e.preventDefault()}
                      className="object-cover kavero-nondraggable-image"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#24160E] via-transparent to-transparent opacity-80 pointer-events-none" />
                    <span className="absolute bottom-3 left-3 bg-[#1E120B]/90 text-copper-light text-[11px] font-semibold uppercase tracking-wider px-3 py-1 rounded-md border border-copper/40">
                      Selective Hand Harvest
                    </span>
                  </div>
                  <div className="p-5 space-y-2 flex-1 flex flex-col justify-between">
                    <h4 className="font-serif text-lg text-cream-light font-medium">
                      Handpicked by Dedicated Farmers
                    </h4>
                    <p className="text-xs sm:text-sm text-cream-secondary/90 leading-relaxed font-light">
                      Only peak-ripe red cherries are harvested by third-generation growers, ensuring low bitterness, natural sweetness, and exceptional aromatic depth in every cup.
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex justify-end pt-2">
                <Link
                  href="/our-estates"
                  onClick={() => setShowEstateModal(false)}
                  className="text-xs sm:text-sm text-copper-light hover:text-cream-light underline underline-offset-4 flex items-center gap-1 font-medium"
                >
                  Read the complete Karnataka Estate Heritage story →
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
