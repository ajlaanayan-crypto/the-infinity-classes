import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { AuthProvider } from '@/lib/auth-context';
import { Navbar } from '@/components/Navbar';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'The Infinity Classes | Quality Education. Redefined.',
  description:
    'Premium coaching for Classes 6–12, JEE & NEET in Unnao, UP. Online and offline batches with expert faculty, concept-based learning, and affordable fees.',
  keywords: 'coaching classes Unnao, JEE NEET coaching UP, The Infinity Classes, online offline tuition',
  openGraph: {
    title: 'The Infinity Classes | Quality Education. Redefined.',
    description: 'Premium coaching for Classes 6–12, JEE & NEET in Unnao, UP.',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="bg-[#FFFFFF] text-[#1D1D1F] antialiased selection:bg-[#0071E3]/10 selection:text-[#0071E3]">
        <div className="fixed inset-0 grain-overlay z-[9999] pointer-events-none opacity-[0.03]" />
        <AuthProvider>
          <Navbar />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
