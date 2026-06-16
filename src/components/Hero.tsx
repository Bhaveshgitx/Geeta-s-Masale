/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { ArrowDown, MoveRight, MessageSquare, Coffee, Compass, Sparkles } from 'lucide-react';
import { CATEGORIES } from '../data/storeData';

interface HeroProps {
  onExploreClick: () => void;
  onWhatsAppClick: () => void;
  onSelectCategory: (categoryId: string) => void;
}

export default function Hero({ onExploreClick, onWhatsAppClick, onSelectCategory }: HeroProps) {
  // Stagger wrapper settings for clean visual entrance
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { type: 'spring', stiffness: 80, damping: 15 } 
    },
  };

  return (
    <section
      id="hero"
      className="relative w-full overflow-hidden bg-[#FAF9F6] pt-24 sm:pt-32 pb-20 snap-start scroll-mt-20 border-b border-slate-100"
    >
      {/* Delicate organic gradients in the background for depth */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-12 left-10 w-[450px] h-[450px] rounded-full bg-[#A61B1B]/4 blur-[130px]" />
        <div className="absolute bottom-20 right-10 w-[500px] h-[500px] rounded-full bg-[#D21F1F]/3 blur-[140px]" />
        <div className="absolute top-1/2 left-2/3 -translate-y-1/2 w-[350px] h-[350px] rounded-full bg-[#E86A17]/3 blur-[120px]" />
      </div>

      {/* Main Container */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Split Screen Grid (Hero Main Feature) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center py-8">
          
          {/* Left Column: Brand Copy & CTAs */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="lg:col-span-7 space-y-6 sm:space-y-8 text-left"
          >
            {/* Soft, minimal upper tag */}
            <motion.div 
              variants={itemVariants}
              className="inline-flex items-center space-x-2 bg-[#A61B1B]/5 px-3 py-1 rounded-full border border-[#A61B1B]/15 text-[#A61B1B] text-[10px] font-mono tracking-widest uppercase"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#A61B1B]" />
              <span>ESTD. 2004 — Near Dewoolwada along Kasal-Malvan Highway</span>
            </motion.div>

            {/* Premium, High-Contrast Typography */}
            <div className="space-y-3 sm:space-y-4">
              <motion.h1 
                variants={itemVariants}
                className="font-sans text-4xl sm:text-6xl md:text-[66px] font-black tracking-tight text-[#0F172A] leading-[1.05] uppercase"
              >
                HANDMADE <br className="hidden sm:inline" />
                AUTHENTIC <span className="text-[#A61B1B] relative inline-block">
                  MALVANI MASALAS
                </span> <br />
                <span className="text-slate-500 font-black text-2xl sm:text-4xl md:text-[46px] block mt-1 tracking-tight">
                  & PURE KONKANI MEVA
                </span>
              </motion.h1>

              {/* Minimal Warm Description */}
              <motion.p 
                variants={itemVariants}
                className="text-slate-600 text-sm sm:text-base font-normal font-sans max-w-xl leading-relaxed"
              >
                From the stove of Sri Geeta’s coastal kitchen, we hand-roast original Sunday griddle spices, mill natural healthy grain flours (Pith), and pack export-grade coastal cashews. No artificial preservatives, colors, or heavy synthetic starches. Just pure Konkan culinary spirit.
              </motion.p>
            </div>

            {/* Interactive, Sleek Minimalist Actions */}
            <motion.div 
              variants={itemVariants}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 pt-2"
            >
              <button
                onClick={onExploreClick}
                className="group relative inline-flex items-center justify-center space-x-2 py-4 px-7 rounded-xl bg-[#A61B1B] hover:bg-rose-950 text-white text-xs font-mono font-black tracking-wider uppercase transition-all shadow-[0_12px_30px_rgba(166,27,27,0.15)] hover:shadow-[0_15px_35px_rgba(166,27,27,0.25)] active:scale-[0.98] cursor-pointer"
              >
                <span>Explore Spice Shelf</span>
                <MoveRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1.5" />
              </button>

              <button
                onClick={onWhatsAppClick}
                className="inline-flex items-center justify-center space-x-2 py-4 px-7 rounded-xl bg-white hover:bg-slate-50 text-slate-800 hover:text-slate-900 border border-slate-200 text-xs font-mono font-black tracking-wider uppercase transition-all shadow-sm hover:shadow-md active:scale-[0.98] cursor-pointer"
              >
                <MessageSquare className="w-4 h-4 text-emerald-600 fill-current" />
                <span>Talk with Master Blender</span>
              </button>
            </motion.div>

            {/* Trust highlights */}
            <motion.div
              variants={itemVariants}
              className="border-t border-slate-200/60 pt-6 sm:pt-8 grid grid-cols-3 gap-4"
            >
              <div className="space-y-1">
                <span className="block font-sans text-xl sm:text-2xl font-black text-slate-800">40+</span>
                <span className="block text-[10px] font-mono text-slate-400 uppercase tracking-wider">Traditional SKU Items</span>
              </div>
              <div className="space-y-1">
                <span className="block font-sans text-xl sm:text-2xl font-black text-[#A61B1B]">100%</span>
                <span className="block text-[10px] font-mono text-slate-400 uppercase tracking-wider">Chemical Free Pure</span>
              </div>
              <div className="space-y-1">
                <span className="block font-sans text-xl sm:text-2xl font-black text-slate-800">15K+</span>
                <span className="block text-[10px] font-mono text-slate-400 uppercase tracking-wider">Happy Konkan Homes</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column: Highly Layered Premium Animated Graphic Canvas */}
          <div className="lg:col-span-5 relative flex justify-center items-center py-6">
            
            {/* Visual core background base */}
            <div className="absolute w-[320px] h-[320px] sm:w-[420px] sm:h-[420px] bg-gradient-to-r from-red-100/30 to-amber-100/30 rounded-full blur-3xl pointer-events-none" />

            {/* Main floating picture frame */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, type: 'spring', stiffness: 100 }}
              className="relative z-10 w-[280px] h-[280px] sm:w-[380px] sm:h-[380px] bg-white rounded-3xl p-4 sm:p-5 shadow-[0_24px_50px_rgba(0,0,0,0.06)] border border-slate-100"
            >
              <div className="w-full h-full rounded-2xl overflow-hidden relative group">
                <img
                  src="/src/assets/images/masala_hero_1780594616996.png"
                  alt="Geeta's Authentic Spices Presentation"
                  className="w-full h-full object-cover transition-transform duration-[1500ms] group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                
                {/* Overlay filter */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent opacity-80" />
                
                {/* Brand watermark badge tag */}
                <div className="absolute bottom-4 left-4 right-4 text-white text-left">
                  <span className="text-[8px] font-mono font-bold tracking-widest text-[#FFD2D2] uppercase inline-block mb-1">
                    NATURAL MILLING PROCESS
                  </span>
                  <p className="text-xs font-mono font-black uppercase text-white leading-tight">
                    Slow Roasted on Iron Griddles
                  </p>
                </div>
              </div>
            </motion.div>

            {/* FLOATING INGREDIENTS OR INFO PILLS (orbiting details for high-fidelity feel) */}
            
            {/* Pill 1: Left Floater */}
            <motion.div
              animate={{
                y: [0, -10, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute -left-2 sm:-left-6 top-1/4 z-20 bg-white border border-slate-150 rounded-2xl px-3 py-2 shadow-lg flex items-center space-x-1.5 pointer-events-none"
            >
              <div className="w-2.5 h-2.5 rounded-full bg-[#A61B1B]" />
              <span className="text-[10px] font-mono font-black text-slate-700 uppercase tracking-tight">
                Authentic Sankeshwari Chilli
              </span>
            </motion.div>

            {/* Pill 2: Right Floater */}
            <motion.div
              animate={{
                y: [0, 12, 0],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.5
              }}
              className="absolute -right-2 sm:-right-4 bottom-1/4 z-20 bg-white border border-slate-150 rounded-2xl px-3.5 py-2.5 shadow-lg flex items-center space-x-2 pointer-events-none"
            >
              <Coffee className="w-3.5 h-3.5 text-amber-600 animate-spin-slow" />
              <div className="text-left">
                <span className="block text-[9px] font-mono leading-none text-slate-400 uppercase font-black">Roasting Method</span>
                <span className="block text-[10px] sm:text-[11px] font-sans leading-tight text-slate-800 font-bold uppercase">
                  Traditional Iron Griddle
                </span>
              </div>
            </motion.div>

            {/* Pill 3: Top Floater */}
            <motion.div
              animate={{
                x: [0, 8, 0],
                y: [0, -6, 0]
              }}
              transition={{
                duration: 4.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1
              }}
              className="absolute top-2 right-4 sm:top-6 sm:right-8 z-20 bg-white border border-slate-150 rounded-full py-1.5 px-3 shadow-md flex items-center space-x-1 pointer-events-none text-slate-800"
            >
              <Compass className="w-3.5 h-3.5 text-[#A61B1B]" />
              <span className="text-[10px] font-sans font-black uppercase">
                Dewoolwada Sourced
              </span>
            </motion.div>
          </div>

        </div>

        {/* ------------------------------------------------------------------------- */}
        {/* Categories Grid Section (Integrated elegantly right under the Hero fold) */}
        {/* ------------------------------------------------------------------------- */}
        <div id="categories" className="mt-28 space-y-8 scroll-mt-20">
          
          {/* Categories Title block (minimal but highly professional) */}
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-[10px] font-mono tracking-[0.4em] font-black text-[#A61B1B] uppercase block">
              OUR DEPARTMENTS
            </span>
            <h2 className="font-sans text-3xl sm:text-4xl md:text-5xl font-black tracking-tight uppercase text-slate-900">
              Signature <span className="text-[#A61B1B]">Store Categories</span>
            </h2>
            <div className="w-16 h-1 bg-[#A61B1B]/80 mx-auto rounded-full" />
            <p className="text-slate-500 text-xs sm:text-sm font-normal font-sans max-w-lg mx-auto leading-relaxed">
              Touch any classification card below to filter the shop shelf and explore ingredients, shelf lives, and recipes instantly.
            </p>
          </div>

          {/* Minimal Elegant 3D Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-6 pt-6">
            {CATEGORIES.map((cat, idx) => (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                whileHover={{
                  y: -8,
                  borderColor: 'rgba(166,27,27,0.3)',
                }}
                onClick={() => onSelectCategory(cat.id)}
                className="group relative h-72 sm:h-96 rounded-2xl overflow-hidden border border-slate-200/60 p-4 sm:p-5 flex flex-col justify-end cursor-pointer bg-white transition-all duration-300"
              >
                {/* Image backdrop container with smooth high-contrast zoom */}
                <div className="absolute inset-0 z-0">
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  {/* Premium dark gradient shadow overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/50 to-transparent opacity-90 transition-opacity group-hover:opacity-95" />
                </div>

                {/* Card content aligned nicely */}
                <div className="relative z-20 space-y-2 sm:space-y-3">
                  {/* SKU count tag */}
                  <span className="inline-block px-2.5 py-0.5 rounded-full bg-white/10 text-white border border-white/15 text-[9px] font-mono tracking-widest uppercase">
                    {cat.count} AVAILABLE
                  </span>

                  <h3 className="font-sans text-sm sm:text-lg font-black tracking-tight text-white group-hover:text-rose-200 transition-colors uppercase leading-snug">
                    {cat.name}
                  </h3>

                  <p className="text-[10px] sm:text-xs text-slate-300 font-sans line-clamp-2 leading-relaxed">
                    {cat.description}
                  </p>

                  {/* Explore line indicator */}
                  <div className="pt-2 flex items-center text-rose-200 text-[10px] font-mono tracking-wider group-hover:translate-x-1.5 transition-transform duration-300">
                    <span className="uppercase text-[9px] font-bold mr-1.5">Shop Category</span>
                    <MoveRight className="w-3 h-3" />
                  </div>
                </div>

                {/* Left accent accent glow */}
                <div className="absolute left-0 bottom-0 top-0 w-1 bg-gradient-to-b from-[#A61B1B] to-amber-500 opacity-0 group-hover:opacity-100 transition-opacity" />
              </motion.div>
            ))}
          </div>

        </div>

      </div>

      {/* Modern, elegant bouncing scroll-down indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 hidden md:flex flex-col items-center">
        <motion.div
          animate={{
            y: [0, 8, 0],
            opacity: [0.4, 0.9, 0.4]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="text-[#A61B1B]/40 hover:text-[#A61B1B] cursor-pointer transition-colors p-2"
          onClick={onExploreClick}
        >
          <ArrowDown className="w-5 h-5" />
        </motion.div>
      </div>

    </section>
  );
}
