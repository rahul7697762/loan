import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Bajaj Referral Partner - Instant Personal Loans Up To ₹50 Lakhs',
  description:
    'Authorized Bajaj Referral Partner. Apply for instant personal loans up to ₹50 Lakhs with quick mobile verification.',
  icons: {
    icon: '/icon.svg',
    shortcut: '/icon.svg',
    apple: '/icon.svg',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className={`${inter.className} min-h-full bg-[#0042b3] text-white flex flex-col`}>
        {children}
      </body>
    </html>
  );
}
