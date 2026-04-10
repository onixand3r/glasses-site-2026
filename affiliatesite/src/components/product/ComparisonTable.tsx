'use client';

import { cn } from '@/lib/utils';
import Rating from '@/components/ui/Rating';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import { Check, X, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';

interface ComparisonProduct {
  id: string;
  name: string;
  image: string;
  price?: number;
  rating?: number;
  affiliateUrl?: string;
  specs: Record<string, string | boolean>;
  pros: string[];
  cons: string[];
  verdict?: string;
}

interface ComparisonTableProps {
  products: ComparisonProduct[];
  className?: string;
}

export default function ComparisonTable({ products, className }: ComparisonTableProps) {
  if (products.length < 2) {
    return (
      <div className="text-center py-12 text-slate-500">
        Need at least 2 products for comparison
      </div>
    );
  }

  // Get all unique spec keys
  const allSpecKeys = [...new Set(products.flatMap(p => Object.keys(p.specs)))];

  return (
    <div className={cn('overflow-x-auto', className)}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-w-[800px]"
      >
        {/* Header Row */}
        <div className="grid gap-4 mb-6" style={{ gridTemplateColumns: `200px repeat(${products.length}, 1fr)` }}>
          <div className="p-4 bg-slate-50 rounded-xl dark:bg-slate-800">
            <span className="font-semibold text-slate-700 dark:text-slate-300">Products</span>
          </div>
          {products.map((product, idx) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="relative p-4 bg-white rounded-xl border border-slate-200 shadow-sm dark:bg-slate-900 dark:border-slate-700"
            >
              {idx === 0 && (
                <Badge variant="success" size="sm" className="absolute -top-2 left-4">
                  Best Overall
                </Badge>
              )}
              <div className="aspect-square rounded-lg overflow-hidden bg-slate-100 mb-3">
                <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
              </div>
              <h4 className="font-bold text-slate-900 dark:text-white mb-1">{product.name}</h4>
              {product.price && (
                <p className="text-lg font-bold text-blue-600 mb-2">${product.price.toLocaleString()}</p>
              )}
              {product.rating && <Rating rating={product.rating} size="sm" />}
            </motion.div>
          ))}
        </div>

        {/* Specifications */}
        <div className="space-y-2">
          {allSpecKeys.map((key, rowIdx) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: rowIdx * 0.05 }}
              className="grid gap-4 py-3 border-b border-slate-100 dark:border-slate-800"
              style={{ gridTemplateColumns: `200px repeat(${products.length}, 1fr)` }}
            >
              <div className="p-2">
                <span className="font-medium text-slate-700 dark:text-slate-300">{key}</span>
              </div>
              {products.map((product, idx) => (
                <div key={`${product.id}-${key}`} className="p-2">
                  {typeof product.specs[key] === 'boolean' ? (
                    product.specs[key] ? (
                      <Check className="h-5 w-5 text-green-500" />
                    ) : (
                      <X className="h-5 w-5 text-red-400" />
                    )
                  ) : (
                    <span className="text-slate-600 dark:text-slate-400">
                      {product.specs[key] as string}
                    </span>
                  )}
                </div>
              ))}
            </motion.div>
          ))}
        </div>

        {/* Pros/Cons */}
        <div className="grid gap-4 mt-8" style={{ gridTemplateColumns: `200px repeat(${products.length}, 1fr)` }}>
          <div className="p-4">
            <span className="font-semibold text-slate-700 dark:text-slate-300">Pros</span>
          </div>
          {products.map((product, idx) => (
            <div key={`pros-${product.id}`} className="p-4 bg-green-50 rounded-xl dark:bg-green-900/20">
              <ul className="space-y-2">
                {product.pros.slice(0, 3).map((pro, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-slate-700 dark:text-slate-300">
                    <Check className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>{pro}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="grid gap-4 mt-2" style={{ gridTemplateColumns: `200px repeat(${products.length}, 1fr)` }}>
          <div className="p-4">
            <span className="font-semibold text-slate-700 dark:text-slate-300">Cons</span>
          </div>
          {products.map((product) => (
            <div key={`cons-${product.id}`} className="p-4 bg-red-50 rounded-xl dark:bg-red-900/20">
              <ul className="space-y-2">
                {product.cons.slice(0, 3).map((con, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-slate-700 dark:text-slate-300">
                    <X className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
                    <span>{con}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* CTA Buttons */}
        <div className="grid gap-4 mt-8" style={{ gridTemplateColumns: `200px repeat(${products.length}, 1fr)` }}>
          <div className="p-4" />
          {products.map((product) => (
            <div key={`cta-${product.id}`} className="p-4">
              {product.affiliateUrl ? (
                <a
                  href={product.affiliateUrl}
                  target="_blank"
                  rel="noopener noreferrer sponsored"
                  className="flex items-center justify-center gap-2 w-full py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors"
                >
                  <span>Check Price</span>
                  <ExternalLink className="h-4 w-4" />
                </a>
              ) : (
                <Button variant="outline" className="w-full">View Details</Button>
              )}
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
