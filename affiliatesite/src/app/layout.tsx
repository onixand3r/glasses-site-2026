import type { Metadata } from 'next';
import '@/styles/globals.css';
import { Header, Footer } from '@/components/layout';

export const metadata: Metadata = {
  title: {
    default: 'TechReviewPro - Expert Tech Reviews & Comparisons',
    template: '%s | TechReviewPro',
  },
  description: 'In-depth tech product reviews, comparisons, and buying guides. Find the perfect laptop, smartphone, headphones, and more.',
  keywords: ['tech reviews', 'product comparisons', 'laptop reviews', 'smartphone reviews', 'tech buying guide'],
  authors: [{ name: 'TechReviewPro Team' }],
  creator: 'TechReviewPro',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://techreview.pro',
    siteName: 'TechReviewPro',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TechReviewPro',
    description: 'Expert tech reviews and comparisons',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen flex flex-col bg-white dark:bg-slate-950">
        <Header />
        <main className="flex-1 pt-16 lg:pt-20">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
