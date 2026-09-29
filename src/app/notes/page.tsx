'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '@/lib/auth-context';
import { GlassmorphicCard } from '@/components/GlassmorphicCard';
import { IOSButton } from '@/components/IOSButton';
import { 
  Lock, BookOpen, Download, Search, 
  ChevronRight, Sparkles 
} from 'lucide-react';

const mockNotes = [
  { id: 1, title: 'Physics: Kinematics 3D', class: '11', subject: 'Physics', color: 'bg-[#5AC8FA]' },
  { id: 2, title: 'Chemistry: Atomic Theory', class: '11', subject: 'Chemistry', color: 'bg-[#FF2D55]' },
  { id: 3, title: 'Maths: Complex Numbers', class: '12', subject: 'Mathematics', color: 'bg-[#5856D6]' },
  { id: 4, title: 'Biology: Cell Division', class: '12', subject: 'Biology', color: 'bg-[#34C759]' },
];

/* ─── Scroll Reveal Wrapper ─── */
function Reveal({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export default function NotesPage() {
  const { user, loading, signInWithGoogle } = useAuth();
  const [search, setSearch] = useState('');

  if (loading) return (
    <div className="min-h-screen bg-[#F9F9FB] flex items-center justify-center">
      <div className="w-12 h-12 border-4 border-[#0071E3]/20 border-t-[#0071E3] rounded-full animate-spin" />
    </div>
  );

  return (
    <main className="min-h-screen bg-[#F9F9FB] pt-28 pb-20 px-4">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white shadow-sm border border-black/05 text-[#0071E3] text-xs font-bold uppercase tracking-widest mb-4"
            >
              <Sparkles size={14} />
              Digital Library
            </motion.div>
            <h1 className="text-5xl md:text-6xl font-black tracking-tight">Concept <span className="text-[#0071E3]">Notes.</span></h1>
            <p className="text-[#717785] mt-4 text-lg">Curated, visual-first study materials for rapid retention.</p>
          </div>

          <div className="relative group max-w-md w-full">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#717785] group-focus-within:text-[#0071E3] transition-colors" size={20} />
            <input
              type="text"
              placeholder="Search chapters or topics..."
              className="w-full bg-white border border-black/05 rounded-2xl py-4 pl-12 pr-6 text-sm focus:outline-none focus:ring-2 focus:ring-[#0071E3]/20 shadow-sm transition-all"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        {!user ? (
          /* Auth Gate */
          <Reveal className="max-w-2xl mx-auto text-center py-20 px-8 bg-white border border-black/05 rounded-[3rem] shadow-xl">
            <div className="w-20 h-20 rounded-[2.5rem] bg-[#0071E3]/10 flex items-center justify-center mx-auto mb-8 border border-[#0071E3]/20">
              <Lock size={32} className="text-[#0071E3]" />
            </div>
            <h2 className="text-3xl font-bold mb-4">Member Access Only</h2>
            <p className="text-[#717785] mb-10 leading-relaxed">
              Our premium 3D notes are exclusive to enrolled students.<br />
              Sign in with your registered Google account to continue.
            </p>
            <IOSButton size="lg" onClick={signInWithGoogle} className="w-full sm:w-auto">
              Continue with Google
              <ChevronRight size={18} />
            </IOSButton>
          </Reveal>
        ) : (
          /* Notes Grid */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {mockNotes.filter(n => n.title.toLowerCase().includes(search.toLowerCase())).map((note, i) => (
              <Reveal key={note.id} delay={i * 0.1}>
                <GlassmorphicCard tilt={true} className="p-1 h-full flex flex-col group overflow-hidden">
                  <div className={`h-40 rounded-2xl ${note.color} relative overflow-hidden mb-6`}>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                    <BookOpen className="text-white/20 absolute -bottom-4 -right-4 w-32 h-32 rotate-12" />
                    <div className="absolute bottom-4 left-4">
                      <span className="px-3 py-1 rounded-full bg-black/20 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-widest">
                        Class {note.class}
                      </span>
                    </div>
                  </div>
                  <div className="px-5 pb-6">
                    <p className="text-[#0071E3] text-xs font-bold uppercase tracking-widest mb-2">{note.subject}</p>
                    <h3 className="text-xl font-bold mb-6 line-clamp-2">{note.title}</h3>
                    <IOSButton variant="secondary" className="w-full justify-between py-2.5">
                      <span className="text-sm">Download PDF</span>
                      <Download size={16} />
                    </IOSButton>
                  </div>
                </GlassmorphicCard>
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
