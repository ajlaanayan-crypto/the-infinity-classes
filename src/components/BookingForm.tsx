'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { IOSButton } from './IOSButton';
import { GlassmorphicCard } from './GlassmorphicCard';
import { CheckCircle, ChevronRight, User, Phone, BookOpen, Monitor, MapPin, Mail } from 'lucide-react';

type Step = 1 | 2 | 3;

interface FormData {
  name: string;
  phone: string;
  email: string;
  class: string;
  subject: string;
  mode: 'online' | 'offline';
  preferredTime: string;
  message: string;
}

const initialForm: FormData = {
  name: '',
  phone: '',
  email: '',
  class: '',
  subject: '',
  mode: 'online',
  preferredTime: '',
  message: '',
};

const classes = ['Class 6', 'Class 7', 'Class 8', 'Class 9', 'Class 10', 'Class 11', 'Class 12', 'JEE Prep', 'NEET Prep'];
const subjects = ['Mathematics', 'Physics', 'Chemistry', 'Biology', 'All Subjects'];
const timeSlots = ['Morning (8–11 AM)', 'Afternoon (12–3 PM)', 'Evening (4–7 PM)', 'Flexible'];

export function BookingForm() {
  const [step, setStep] = useState<Step>(1);
  const [form, setForm] = useState<FormData>(initialForm);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const update = (key: keyof FormData, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setError('');
  };

  const validateStep1 = () => {
    if (!form.name.trim()) return 'Please enter your name.';
    if (!form.phone.trim() || !/^\d{10}$/.test(form.phone.trim()))
      return 'Enter a valid 10-digit phone number.';
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email))
      return 'Enter a valid email address.';
    return '';
  };

  const validateStep2 = () => {
    if (!form.class) return 'Please select your class.';
    if (!form.subject) return 'Please select a subject.';
    if (!form.preferredTime) return 'Please select a preferred time slot.';
    return '';
  };

  const handleNext = () => {
    const err = step === 1 ? validateStep1() : validateStep2();
    if (err) { setError(err); return; }
    setStep((s) => (s + 1) as Step);
  };

  const handleSubmit = async () => {
    if (!db) {
      setError('Database is not configured. Please set up Firebase in .env.local.');
      return;
    }
    setLoading(true);
    try {
      await addDoc(collection(db, 'demo_bookings'), {
        ...form,
        createdAt: serverTimestamp(),
        status: 'pending',
      });
      setSuccess(true);
    } catch (e) {
      setError('Something went wrong. Please try again or call us directly.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <motion.div
        className="text-center py-16 px-8"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      >
        <div className="w-20 h-20 rounded-[2.5rem] bg-emerald-500/10 flex items-center justify-center mx-auto mb-6 border border-emerald-500/20">
          <CheckCircle size={40} className="text-emerald-500" />
        </div>
        <h3 className="text-3xl font-black text-[#1A1C1D] mb-3">Demo Booked!</h3>
        <p className="text-[#717785] text-base max-w-sm mx-auto leading-relaxed">
          We'll call you at <strong className="text-[#0071E3]">{form.phone}</strong> within 24 hours to confirm your free demo session.
        </p>
        <IOSButton
          className="mt-10 w-full sm:w-auto"
          variant="secondary"
          onClick={() => { setSuccess(false); setForm(initialForm); setStep(1); }}
        >
          Book Another
        </IOSButton>
      </motion.div>
    );
  }

  const stepLabels = ['Your Info', 'Preferences', 'Confirm'];

  return (
    <div className="w-full max-w-xl mx-auto">
      {/* Segmented Step Indicator */}
      <div className="flex gap-2 mb-12">
        {stepLabels.map((label, i) => {
          const s = (i + 1) as Step;
          const active = step === s;
          const done = step > s;
          return (
            <div key={i} className="flex-1">
              <div className={`h-1.5 rounded-full mb-3 transition-all duration-700 ${done ? 'bg-emerald-500' : active ? 'bg-[#0071E3]' : 'bg-black/05'}`} />
              <span className={`text-[10px] font-black uppercase tracking-widest transition-colors duration-500 ${active ? 'text-[#0071E3]' : done ? 'text-emerald-500' : 'text-[#717785]'}`}>
                {label}
              </span>
            </div>
          );
        })}
      </div>

      <AnimatePresence mode="wait">
        {/* STEP 1: Personal Info */}
        {step === 1 && (
          <motion.div
            key="step1"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="space-y-4"
          >
            <h3 className="text-2xl font-black text-[#1A1C1D] mb-8">Personal Details</h3>
            <InputField
              Icon={User}
              placeholder="Full Name"
              value={form.name}
              onChange={(v) => update('name', v)}
              id="booking-name"
            />
            <InputField
              Icon={Phone}
              placeholder="Phone Number (10 digits)"
              value={form.phone}
              onChange={(v) => update('phone', v)}
              type="tel"
              id="booking-phone"
            />
            <InputField
              Icon={Mail}
              placeholder="Email Address"
              value={form.email}
              onChange={(v) => update('email', v)}
              type="email"
              id="booking-email"
            />
          </motion.div>
        )}

        {/* STEP 2: Preferences */}
        {step === 2 && (
          <motion.div
            key="step2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-black text-[#1A1C1D] mb-8">Course Preferences</h3>

            {/* Class selector */}
            <div>
              <label className="text-[10px] font-black text-[#717785] uppercase tracking-[0.2em] mb-4 block">Class / Level</label>
              <div className="grid grid-cols-3 gap-3">
                {classes.map((c) => (
                  <button
                    key={c}
                    id={`class-${c.replace(/\s/g, '-').toLowerCase()}`}
                    onClick={() => update('class', c)}
                    className={`px-3 py-3 rounded-2xl text-sm font-bold transition-all duration-300 ${
                      form.class === c
                        ? 'bg-[#0071E3] text-white shadow-lg shadow-[#0071E3]/20'
                        : 'bg-black/05 text-[#414753] hover:bg-black/10'
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>

            {/* Mode Toggle */}
            <div className="grid grid-cols-2 gap-4">
              {(['online', 'offline'] as const).map((mode) => (
                <button
                  key={mode}
                  id={`mode-${mode}`}
                  onClick={() => update('mode', mode)}
                  className={`flex items-center justify-center gap-3 py-4 rounded-2xl text-sm font-bold transition-all duration-300 border-2 ${
                    form.mode === mode
                      ? 'bg-white border-[#0071E3] text-[#0071E3] shadow-md'
                      : 'bg-black/05 border-transparent text-[#717785] hover:bg-black/10'
                  }`}
                >
                  {mode === 'online' ? <Monitor size={18} /> : <MapPin size={18} />}
                  {mode.charAt(0).toUpperCase() + mode.slice(1)}
                </button>
              ))}
            </div>

            {/* Time Slot */}
            <div>
              <label className="text-[10px] font-black text-[#717785] uppercase tracking-[0.2em] mb-4 block">Preferred Time</label>
              <div className="grid grid-cols-2 gap-3">
                {timeSlots.map((t) => (
                  <button
                    key={t}
                    onClick={() => update('preferredTime', t)}
                    className={`px-4 py-3 rounded-2xl text-sm font-bold transition-all duration-300 text-left ${
                      form.preferredTime === t
                        ? 'bg-[#0071E3] text-white shadow-lg shadow-[#0071E3]/20'
                        : 'bg-black/05 text-[#414753] hover:bg-black/10'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* STEP 3: Confirm */}
        {step === 3 && (
          <motion.div
            key="step3"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            <h3 className="text-2xl font-black text-[#1A1C1D] mb-8">Final Review</h3>
            <div className="bg-black/05 rounded-[2rem] p-8 space-y-6">
              <SummaryRow label="Name" value={form.name} />
              <SummaryRow label="Contact" value={form.phone} />
              <SummaryRow label="Class" value={form.class} />
              <SummaryRow label="Mode" value={form.mode === 'online' ? '🖥 Online Interactive' : '📍 Offline at Unnao Center'} />
              <SummaryRow label="Time" value={form.preferredTime} />
            </div>

            <textarea
              placeholder="Any specific questions for our teachers? (Optional)"
              value={form.message}
              onChange={(e) => update('message', e.target.value)}
              rows={3}
              className="mt-6 w-full bg-black/05 border border-transparent rounded-[2rem] px-6 py-5 text-[#1A1C1D] font-medium placeholder-[#717785]/50 text-sm resize-none focus:outline-none focus:bg-white focus:border-[#0071E3]/20 focus:ring-4 focus:ring-[#0071E3]/05 transition-all"
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Error */}
      <AnimatePresence>
        {error && (
          <motion.p
            className="text-red-500 text-xs font-bold mt-4 text-center bg-red-50 py-2 rounded-lg"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>

      {/* Navigation Buttons */}
      <div className="flex gap-4 mt-12 pt-8 border-t border-black/05">
        {step > 1 && (
          <IOSButton
            variant="secondary"
            className="flex-1"
            onClick={() => setStep((s) => (s - 1) as Step)}
          >
            Back
          </IOSButton>
        )}
        {step < 3 ? (
          <IOSButton className="flex-1" onClick={handleNext}>
            Continue
            <ChevronRight size={18} />
          </IOSButton>
        ) : (
          <IOSButton
            className="flex-1"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? 'Booking...' : 'Book Free Demo'}
          </IOSButton>
        )}
      </div>
    </div>
  );
}

function InputField({
  Icon,
  placeholder,
  value,
  onChange,
  type = 'text',
  id,
}: {
  Icon: React.ElementType;
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  id?: string;
}) {
  return (
    <div className="relative group">
      <div className="absolute left-6 top-1/2 -translate-y-1/2 text-[#717785] group-focus-within:text-[#0071E3] transition-colors">
        <Icon size={18} />
      </div>
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-black/05 border border-transparent rounded-2xl py-4.5 pl-14 pr-6 text-[#1A1C1D] font-semibold placeholder-[#717785]/50 focus:outline-none focus:bg-white focus:border-[#0071E3]/20 focus:ring-4 focus:ring-[#0071E3]/05 transition-all outline-none"
      />
    </div>
  );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  if (!value) return null;
  return (
    <div className="flex justify-between items-start">
      <span className="text-[10px] font-black text-[#717785] uppercase tracking-widest pt-1">{label}</span>
      <span className="text-[#1A1C1D] font-bold text-right max-w-[200px]">{value}</span>
    </div>
  );
}
