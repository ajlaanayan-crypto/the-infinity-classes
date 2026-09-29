'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useAuth } from '@/lib/auth-context';
import { IOSButton } from './IOSButton';
import { X, BookOpen, Calendar, Home, LogOut, User, Sparkles } from 'lucide-react';

export function Navbar() {
  const { user, signInWithGoogle, signOut } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '/', label: 'Home', icon: Home },
    { href: '/notes', label: 'Notes', icon: BookOpen },
    { href: '#demo', label: 'Book Demo', icon: Calendar },
  ];

  return (
    <>
      <motion.header
        className="fixed top-8 left-0 right-0 z-50 flex justify-center px-4"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30, delay: 0.2 }}
      >
        <motion.nav
          className="flex items-center gap-1 px-2 py-2 rounded-full border surface-glass transition-all duration-500 shadow-2xl shadow-black/10"
          animate={{
            width: scrolled ? 'auto' : '100%',
            maxWidth: scrolled ? '520px' : '90%',
            gap: scrolled ? '8px' : '24px',
            paddingLeft: scrolled ? '8px' : '24px',
            paddingRight: scrolled ? '8px' : '8px',
          }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Logo Section */}
          <Link href="/" className="flex items-center gap-3 mr-auto group">
            <motion.div 
               whileHover={{ rotate: 180 }}
               className="w-10 h-10 rounded-[1.25rem] bg-[#1D1D1F] flex items-center justify-center text-white text-xl font-black shadow-lg shadow-black/20"
            >
              ∞
            </motion.div>
            <AnimatePresence mode="wait">
              {!scrolled && (
                <motion.span 
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  className="text-[#1D1D1F] font-black tracking-tighter text-lg hidden md:block"
                >
                  Infinity Classes
                </motion.span>
              )}
            </AnimatePresence>
          </Link>

          {/* Nav Links */}
          <div className="hidden md:flex items-center">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-4 py-2 text-sm font-bold text-[#1D1D1F]/60 hover:text-[#0071E3] rounded-full hover:bg-black/05 transition-all duration-200"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Auth/Action Section */}
          <div className="flex items-center gap-2">
            {!user ? (
              <IOSButton
                variant="primary"
                size="sm"
                className="h-10 px-6"
                onClick={signInWithGoogle}
              >
                Join
              </IOSButton>
            ) : (
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="w-10 h-10 rounded-full bg-black/05 hover:bg-black/10 flex items-center justify-center transition-colors border border-black/05 group"
              >
                {user.photoURL ? (
                  <img
                    src={user.photoURL}
                    alt={user.displayName || ''}
                    className="w-8 h-8 rounded-full border border-white/50"
                  />
                ) : (
                  <User size={18} className="text-[#1D1D1F]" />
                )}
              </button>
            )}

            {/* Mobile menu toggle */}
            <button
               onClick={() => setMenuOpen(!menuOpen)}
               className="md:hidden w-10 h-10 rounded-full bg-black/05 flex items-center justify-center group"
            >
              <div className="w-5 h-4 flex flex-col justify-between">
                <span className={`block h-0.5 bg-[#1D1D1F] rounded transition-all ${menuOpen ? 'rotate-45 translate-y-1.5' : ''}`} />
                <span className={`block h-0.5 bg-[#1D1D1F] rounded transition-all ${menuOpen ? 'opacity-0' : ''}`} />
                <span className={`block h-0.5 bg-[#1D1D1F] rounded transition-all ${menuOpen ? '-rotate-45 -translate-y-1.5' : ''}`} />
              </div>
            </button>
          </div>
        </motion.nav>
      </motion.header>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-x-4 top-28 z-50 rounded-[3rem] border surface-glass shadow-2xl p-8 md:right-8 md:left-auto md:w-80"
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
          >
             <div className="grain-overlay rounded-inherit absolute inset-0 opacity-[0.03]" />
             
             <div className="relative z-10">
               <div className="flex justify-between items-center mb-8">
                 <div className="flex items-center gap-2">
                   <Sparkles size={16} className="text-[#0071E3]" />
                   <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#1D1D1F]/40">Student Portal</span>
                 </div>
                 <button onClick={() => setMenuOpen(false)} className="w-8 h-8 rounded-full bg-black/05 flex items-center justify-center hover:bg-black/10 transition-colors">
                   <X size={16} className="text-[#1D1D1F]" />
                 </button>
               </div>

               <div className="space-y-2">
                 {navLinks.map((link) => {
                   const Icon = link.icon;
                   return (
                     <Link
                       key={link.href}
                       href={link.href}
                       onClick={() => setMenuOpen(false)}
                       className="flex items-center gap-4 px-6 py-4 rounded-[1.5rem] text-[#1D1D1F] font-bold hover:bg-[#0071E3]/05 hover:text-[#0071E3] transition-all group"
                     >
                       <div className="w-10 h-10 rounded-2xl bg-black/05 flex items-center justify-center transition-colors group-hover:bg-[#0071E3]/10">
                         <Icon size={20} className="text-[#1D1D1F]/40 group-hover:text-[#0071E3]" />
                       </div>
                       {link.label}
                     </Link>
                   );
                 })}
                 
                 {user && (
                   <div className="mt-6 pt-6 border-t border-black/05">
                     <button
                       onClick={() => { signOut(); setMenuOpen(false); }}
                       className="flex items-center gap-4 px-6 py-4 rounded-[1.5rem] text-red-500 font-bold hover:bg-red-50 transition-all w-full"
                     >
                       <div className="w-10 h-10 rounded-2xl bg-red-500/10 flex items-center justify-center">
                         <LogOut size={20} />
                       </div>
                       Sign Out
                     </button>
                   </div>
                 )}
               </div>
             </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
