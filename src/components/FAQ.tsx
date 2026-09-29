'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Sparkles } from 'lucide-react';

const faqs = [
  {
    question: 'What classes and exams does The Infinity Classes cover?',
    answer:
      'We offer comprehensive coaching for students from Class 6 to Class 12 across all major boards (CBSE, ICSE, and UP Board), alongside specialized JEE Main, JEE Advanced, and NEET preparation programs tailored to each student\'s strengths.',
  },
  {
    question: 'What is the difference between online and offline batches?',
    answer:
      'Our Online Live Classes are conducted via a premium digital platform with interactive whiteboards, real-time Q&A, and session recordings. Offline batches are held at our center in Shuklaganj, Unnao, with small batch sizes (max 15 students) to ensure personalized attention.',
  },
  {
    question: 'How do I book a free demo class?',
    answer:
      'Simply click the "Book a Free Demo" button anywhere on the page. Fill in your details — name, contact, class, and preferred mode (online/offline) — and our academic counselor will reach out within 24 hours to confirm your slot.',
  },
  {
    question: 'How can I access the study notes and materials?',
    answer:
      'Study notes are available exclusively to enrolled students through our premium student portal. Sign in with your Google account, and once your enrollment is verified, you\'ll get instant access to all subject-wise notes, mock tests, and previous year papers.',
  },
  {
    question: 'What are the fees and payment options?',
    answer:
      'Our fee structure is designed to be transparent and affordable. We offer flexible monthly, quarterly, and annual plans. Detailed pricing is shared during your free demo session. We accept all UPI payments, net banking, and cash at our center.',
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="py-32 px-4 bg-white overflow-hidden relative">
      {/* Decorative Blur */}
      <div className="absolute top-0 right-[-10%] w-[40%] h-[40%] bg-[#0071E3]/05 blur-[120px] rounded-full" />
      
      <div className="max-w-3xl mx-auto relative z-10">
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/05 text-[#0071E3] text-[10px] font-black uppercase tracking-widest mb-6">
            <Sparkles size={14} />
            Support Center
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-[#1A1C1D] tracking-tight leading-tight">
            Commonly Asked
            <br />
            <span className="text-[#717785]">Questions.</span>
          </h2>
        </motion.div>

        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ delay: i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <button
                id={`faq-item-${i}`}
                className={`w-full text-left px-8 py-6 rounded-[2rem] transition-all duration-500 flex items-start justify-between gap-6 group border shadow-sm ${
                  openIndex === i 
                    ? 'bg-white border-[#0071E3]/20 shadow-xl shadow-[#0071E3]/05' 
                    : 'bg-black/02 border-transparent hover:bg-black/05'
                }`}
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
              >
                <span className={`font-bold text-lg leading-relaxed transition-colors duration-300 ${openIndex === i ? 'text-[#0071E3]' : 'text-[#1A1C1D]'}`}>
                  {faq.question}
                </span>
                <motion.div
                  animate={{ rotate: openIndex === i ? 180 : 0 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                  className={`shrink-0 mt-1.5 w-8 h-8 rounded-full flex items-center justify-center transition-colors ${openIndex === i ? 'bg-[#0071E3] text-white' : 'bg-black/05 text-[#717785]'}`}
                >
                  <ChevronDown size={18} />
                </motion.div>
              </button>

              <AnimatePresence>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="px-8 pb-8 pt-4 text-[#414753] text-[15px] leading-[1.6] font-medium max-w-2xl">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
        
        <motion.div 
          className="mt-20 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <p className="text-[#717785] text-sm">
            Still have questions? <span className="text-[#0071E3] font-bold cursor-pointer hover:underline">Contact our support wing →</span>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
