'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import Link from 'next/link';
import { 
  ArrowRight, Sparkles, BookOpen, Clock, 
  Target, Zap, ChevronRight, Play, Check 
} from 'lucide-react';
import { IOSButton } from '@/components/IOSButton';
import { GlassmorphicCard } from '@/components/GlassmorphicCard';
import { BookingForm } from '@/components/BookingForm';
import { FAQ } from '@/components/FAQ';

/* ─── Hero Section ─── */
function Hero() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.9]);

  return (
    <section ref={containerRef} className="relative min-h-[110vh] flex flex-col items-center justify-center pt-20 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute top-[10%] left-[5%] w-[400px] h-[400px] bg-[#0071E3]/05 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-[10%] right-[5%] w-[500px] h-[500px] bg-[#0071E3]/10 blur-[150px] rounded-full animate-pulse" />
      </div>

      <motion.div 
        style={{ y, opacity, scale }}
        className="max-w-7xl mx-auto px-6 text-center z-10"
      >
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/05 text-[#0071E3] text-[11px] font-black uppercase tracking-widest mb-10"
        >
          <Sparkles size={14} />
          Elevating Education
        </motion.div>

        <h1 className="editorial-hero mb-8">
          Quality. <span className="text-[#0071E3]">Redefined.</span><br />
          <span className="opacity-40">Intelligence. In 3D.</span>
        </h1>

        <p className="text-xl md:text-2xl text-[#86868B] max-w-2xl mx-auto mb-12 font-medium leading-relaxed">
          The ultimate learning ecosystem for Class 6–12, JEE & NEET. 
          Master complex concepts with editorial-grade materials and 1-on-1 elite mentorship.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <IOSButton variant="primary" size="lg" className="w-full sm:w-auto shadow-2xl">
            Book Free Demo
            <ArrowRight size={20} />
          </IOSButton>
          <IOSButton variant="secondary" size="lg" className="w-full sm:w-auto group">
            <Play size={18} className="fill-current" />
            Watch Showreel
          </IOSButton>
        </div>
      </motion.div>

      {/* Floating 3D Sculpture */}
      <motion.div 
        className="mt-20 z-0 w-full max-w-5xl px-6"
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
      >
        <div className="relative group">
          <img 
            src="/Users/mylisa/.gemini/antigravity/brain/e13bfe4a-5470-4f7a-8b9e-ce76a5e3abd5/elite_3d_glass_infinity_hero_1775424544458.png"
            alt="Elite 3D Glass Infinity"
            className="w-full h-auto drop-shadow-2xl grayscale-[0.2] group-hover:grayscale-0 transition-all duration-1000"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-white to-transparent h-24 bottom-0 z-10" />
        </div>
      </motion.div>
    </section>
  );
}

/* ─── Bento Grid Section ─── */
function Features() {
  const features = [
    {
      title: "Interactive Live Classes",
      desc: "Immersive sessions with real-time feedback and high-fidelity whiteboards. Experience learning that breathes.",
      icon: Zap,
      size: "lg",
      color: "bg-blue-500",
      tag: "100% Live"
    },
    {
      title: "Tactile PDF Notes",
      desc: "Editorial-grade visual summaries for Class 6–12.",
      icon: BookOpen,
      size: "sm",
      color: "bg-indigo-500",
      tag: "Premium"
    },
    {
      title: "Adaptive Mock Tests",
      desc: "Real JEE/NEET patterns with AI analysis.",
      icon: Target,
      size: "sm",
      color: "bg-emerald-500",
      tag: "Rigorous"
    },
    {
      title: "Elite Mentorship",
      desc: "Personalized roadmaps for every student to ensure a top-tier rank in competitive exams.",
      icon: Sparkles,
      size: "lg",
      color: "bg-amber-500",
      tag: "Priority"
    }
  ];

  return (
    <section className="py-40 bg-[#FBFBFD] relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-24">
          <motion.div 
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             className="text-[10px] font-black uppercase tracking-[0.25em] text-[#0071E3] mb-4"
          >
            Capabilities
          </motion.div>
          <h2 className="text-5xl md:text-7xl font-black text-[#1D1D1F] tracking-tighter">
            An ecosystem focused on <br /><span className="text-[#86868B]">Academic Excellence.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((f, i) => (
             <Reveal key={i} delay={i * 0.1} className={f.size === 'lg' ? 'md:col-span-2' : ''}>
               <GlassmorphicCard className="p-12 h-full flex flex-col group min-h-[360px]">
                 <div className="flex flex-col h-full">
                    <div className="flex items-center justify-between mb-8">
                      <div className={`w-14 h-14 rounded-2xl ${f.color} flex items-center justify-center text-white shadow-xl shadow-black/05 transition-transform group-hover:scale-110 duration-500`}>
                        <f.icon size={28} />
                      </div>
                      <span className="text-[10px] font-black uppercase tracking-widest text-[#86868B]">{f.tag}</span>
                    </div>
                    <h3 className="text-3xl font-black mb-4 text-[#1D1D1F] tracking-tight">{f.title}</h3>
                    <p className="text-[#86868B] text-lg font-medium leading-relaxed max-w-sm mb-10">
                      {f.desc}
                    </p>
                    <div className="mt-auto">
                      <IOSButton variant="ghost" className="px-0 py-0 hover:bg-transparent -ml-1 text-[#0071E3]">
                        Explore Modules <ChevronRight size={18} />
                      </IOSButton>
                    </div>
                 </div>
               </GlassmorphicCard>
             </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Numbers / Trust Section ─── */
function Stats() {
  const stats = [
    { label: "Students Enrolled", value: "5000+", suffix: "Elite Learners" },
    { label: "Qualified Specialists", value: "24/7", suffix: "Direct Support" },
    { label: "Top Rankers", value: "150+", suffix: "JEE/NEET Seats" },
    { label: "Subject Materials", value: "12k+", suffix: "Tactile Notes" },
  ];

  return (
    <section className="py-32 bg-white flex items-center justify-center border-y border-black/05">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-12 w-full">
         {stats.map((s, i) => (
           <motion.div 
             key={i} 
             initial={{ opacity: 0 }}
             whileInView={{ opacity: 1 }}
             viewport={{ once: true }}
             transition={{ delay: i * 0.1 }}
             className="text-center md:text-left"
           >
             <h4 className="text-5xl font-black text-[#1D1D1F] mb-1">{s.value}</h4>
             <p className="text-[#86868B] text-xs font-black uppercase tracking-widest mb-1">{s.label}</p>
             <p className="text-[#0071E3] text-[10px] font-bold">{s.suffix}</p>
           </motion.div>
         ))}
      </div>
    </section>
  );
}

/* ─── Booking Wrap ─── */
function BookingCTA() {
  return (
    <section id="demo" className="py-40 bg-[#FBFBFD] relative overflow-hidden">
      <div className="absolute top-0 left-[-10%] w-[40%] h-[40%] bg-[#0071E3]/05 blur-[120px] rounded-full" />
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/05 text-[#0071E3] text-[10px] font-black uppercase tracking-widest mb-8">
              Enrolment 2024
            </div>
            <h2 className="text-5xl md:text-7xl font-black text-[#1D1D1F] tracking-tighter mb-8 leading-[0.95]">
              Join the <br /><span className="text-[#86868B]">Future Elite.</span>
            </h2>
            <div className="space-y-6 mb-12">
               {[
                 "Complimentary 1-hour Live Demo",
                 "Personal Rank-Assessment Chat",
                 "Access to Foundation Modules"
               ].map((text, i) => (
                 <div key={i} className="flex items-center gap-4">
                    <div className="w-6 h-6 rounded-full bg-[#0071E3]/10 flex items-center justify-center text-[#0071E3]">
                      <Check size={14} />
                    </div>
                    <span className="text-lg font-bold text-[#414753]">{text}</span>
                 </div>
               ))}
            </div>
            <p className="text-[#86868B] text-sm italic">
              * Limited slots available per week. Registration is free.
            </p>
          </div>
          
          <GlassmorphicCard className="p-10 shadow-huge bg-white/95">
             <BookingForm />
          </GlassmorphicCard>
        </div>
      </div>
    </section>
  );
}

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white">
      <Hero />
      <Stats />
      <Features />
      <BookingCTA />
      <FAQ />
      
      {/* Footer Minimalist */}
      <footer className="py-20 border-t border-black/05 bg-[#FBFBFD]">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
          <div>
            <div className="text-2xl font-black tracking-tighter mb-2">∞ Infinity <span className="opacity-40">Classes.</span></div>
            <p className="text-sm text-[#86868B] font-medium">Shuklaganj, Unnao • Redefining Education Since 2018</p>
          </div>
          <div className="flex gap-8 text-sm font-bold text-[#1D1D1F]">
             <a href="#" className="hover:text-[#0071E3] transition-colors">Privacy</a>
             <a href="#" className="hover:text-[#0071E3] transition-colors">Terms</a>
             <a href="#" className="hover:text-[#0071E3] transition-colors">Contact</a>
          </div>
          <p className="text-[#86868B] text-xs font-bold uppercase tracking-widest">© 2024 All Rights Reserved</p>
        </div>
      </footer>
    </main>
  );
}

function Reveal({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
