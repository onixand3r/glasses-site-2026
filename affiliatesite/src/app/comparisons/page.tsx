import { Metadata } from 'next';
import ComparisonTable from '@/components/product/ComparisonTable';
import { ArrowRight, GitCompare } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Product Comparisons',
  description: 'Compare tech products side by side. Find the best laptop, smartphone, or headphones for your needs.',
};

// Demo comparison data
const demoComparisons = [
  {
    id: '1',
    title: 'Best Laptops 2024',
    slug: 'laptops-2024',
    description: 'Compare the top laptops for work, gaming, and everyday use.',
    products: [
      {
        id: 'p1',
        name: 'MacBook Pro 14"',
        image: 'https://picsum.photos/seed/macbook/400/400',
        price: 1999,
        rating: 4.8,
        affiliateUrl: '#',
        specs: {
          'Processor': 'M3 Pro',
          'RAM': '18GB',
          'Storage': '512GB SSD',
          'Display': '14.2" Liquid Retina XDR',
          'Battery': 'Up to 17 hours',
          'Weight': '3.5 lbs',
        },
        pros: [
          'Incredible M3 Pro performance',
          'Stunning Liquid Retina XDR display',
          'All-day battery life',
          'Premium build quality',
        ],
        cons: [
          'Expensive base configuration',
          'Limited port selection',
          'No touchscreen option',
        ],
      },
      {
        id: 'p2',
        name: 'Dell XPS 15',
        image: 'https://picsum.photos/seed/dell/400/400',
        price: 1499,
        rating: 4.5,
        affiliateUrl: '#',
        specs: {
          'Processor': 'Intel Core i7-13700H',
          'RAM': '16GB DDR5',
          'Storage': '512GB SSD',
          'Display': '15.6" OLED 3.5K',
          'Battery': 'Up to 13 hours',
          'Weight': '4.23 lbs',
        },
        pros: [
          'Gorgeous OLED display',
          'Strong performance',
          'Premium design',
          'Good port selection',
        ],
        cons: [
          'Webcam below screen',
          'Can get warm under load',
          'Battery life could be better',
        ],
      },
      {
        id: 'p3',
        name: 'ThinkPad X1 Carbon',
        image: 'https://picsum.photos/seed/thinkpad/400/400',
        price: 1649,
        rating: 4.6,
        affiliateUrl: '#',
        specs: {
          'Processor': 'Intel Core i7-1365U',
          'RAM': '16GB LPDDR5',
          'Storage': '512GB SSD',
          'Display': '14" 2.8K OLED',
          'Battery': 'Up to 15 hours',
          'Weight': '2.48 lbs',
        },
        pros: [
          'Incredible keyboard',
          'Ultra-lightweight design',
          'Excellent business features',
          'Military-grade durability',
        ],
        cons: [
          'Expensive',
          'Average speakers',
          'Not ideal for gaming',
        ],
      },
    ],
  },
  {
    id: '2',
    title: 'Best Smartphones 2024',
    slug: 'smartphones-2024',
    description: 'Compare flagship phones from Apple, Samsung, Google, and more.',
    products: [
      {
        id: 'p4',
        name: 'iPhone 15 Pro Max',
        image: 'https://picsum.photos/seed/iphone/400/400',
        price: 1199,
        rating: 4.9,
        affiliateUrl: '#',
        specs: {
          'Display': '6.7" Super Retina XDR',
          'Processor': 'A17 Pro',
          'RAM': '8GB',
          'Storage': '256GB - 1TB',
          'Camera': '48MP Triple',
          'Battery': 'Up to 29 hours video',
        },
        pros: [
          'Best-in-class performance',
          'Exceptional camera system',
          'Titanium design',
          'USB-C with USB 3',
        ],
        cons: [
          'Very expensive',
          'Slow charging',
          'No 120Hz on base model',
        ],
      },
      {
        id: 'p5',
        name: 'Samsung Galaxy S24 Ultra',
        image: 'https://picsum.photos/seed/samsung/400/400',
        price: 1299,
        rating: 4.7,
        affiliateUrl: '#',
        specs: {
          'Display': '6.8" Dynamic AMOLED 2X',
          'Processor': 'Snapdragon 8 Gen 3',
          'RAM': '12GB',
          'Storage': '256GB - 1TB',
          'Camera': '200MP Quad',
          'Battery': '5000mAh',
        },
        pros: [
          'Massive, beautiful display',
          'Versatile camera with 100x zoom',
          'S Pen included',
          '7 years of updates',
        ],
        cons: [
          'Expensive',
          'Large and heavy',
          'S Pen slot not for everyone',
        ],
      },
    ],
  },
];

export default function ComparisonsPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900/50">
      {/* Header */}
      <div className="bg-gradient-to-br from-blue-600 to-blue-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 rounded-full text-sm mb-6">
              <GitCompare className="h-4 w-4" />
              Side-by-Side Comparisons
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              Compare Tech Products
            </h1>
            <p className="text-lg text-blue-100">
              Make informed decisions with our detailed side-by-side comparisons of the latest tech products.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
        {demoComparisons.map((comparison, index) => (
          <section
            key={comparison.id}
            id={comparison.slug}
            className="opacity-0 animate-[fadeIn_0.5s_ease-out_forwards]"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-2">
                {comparison.title}
              </h2>
              <p className="text-slate-600 dark:text-slate-400">
                {comparison.description}
              </p>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 p-6 overflow-hidden dark:bg-slate-900 dark:border-slate-800">
              <ComparisonTable products={comparison.products} />
            </div>
          </section>
        ))}

        {/* CTA */}
        <div className="text-center py-12">
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
            Can't find what you're looking for?
          </h3>
          <p className="text-slate-600 dark:text-slate-400 mb-6 max-w-md mx-auto">
            Browse all our reviews to find the perfect product for your needs.
          </p>
          <Link
            href="/products"
            className="inline-flex items-center gap-2 px-8 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors"
          >
            Browse All Reviews
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
