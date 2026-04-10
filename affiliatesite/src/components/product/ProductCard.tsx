'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import Rating from '@/components/ui/Rating';
import Badge from '@/components/ui/Badge';
import { ExternalLink } from 'lucide-react';
import type { GhostPost, parseProductData } from '@/lib/ghost';

interface ProductCardProps {
  post: GhostPost;
  productData?: ReturnType<typeof parseProductData>;
  className?: string;
}

export default function ProductCard({ post, productData, className }: ProductCardProps) {
  const category = post.tags?.find(t => t.slug !== 'hash-product')?.name || 'Review';

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -8 }}
      className={cn(
        'group bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm',
        'hover:shadow-xl hover:border-blue-200',
        'dark:bg-slate-900 dark:border-slate-800 dark:hover:border-blue-600',
        'transition-all duration-300',
        className
      )}
    >
      <Link href={`/products/${post.slug}`}>
        {/* Image */}
        <div className="relative aspect-video overflow-hidden bg-slate-100 dark:bg-slate-800">
          {post.feature_image ? (
            <img
              src={post.feature_image}
              alt={post.feature_image_alt || post.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="flex items-center justify-center h-full text-slate-400">
              No image
            </div>
          )}
          <div className="absolute top-3 left-3 flex gap-2">
            {post.featured && (
              <Badge variant="primary" size="sm">Editor's Pick</Badge>
            )}
            <Badge variant="default" size="sm">{category}</Badge>
          </div>
          {productData?.rating && (
            <div className="absolute bottom-3 right-3 bg-white/95 backdrop-blur-sm rounded-lg px-2 py-1 shadow-lg dark:bg-slate-900/95">
              <Rating rating={productData.rating} size="sm" />
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-5">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
            {post.title}
          </h3>
          <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-2 mb-4">
            {post.excerpt || 'Click to read the full review...'}
          </p>

          <div className="flex items-center justify-between">
            {productData?.price ? (
              <span className="text-xl font-bold text-slate-900 dark:text-white">
                ${productData.price.toLocaleString()}
              </span>
            ) : (
              <span className="text-sm text-slate-500">Check Price</span>
            )}
            <span className="text-xs text-slate-400">
              {post.reading_time} min read
            </span>
          </div>
        </div>
      </Link>

      {/* Affiliate CTA */}
      {productData?.affiliateUrl && (
        <div className="px-5 pb-5">
          <a
            href={productData.affiliateUrl}
            target="_blank"
            rel="noopener noreferrer sponsored"
            className="flex items-center justify-center gap-2 w-full py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl font-medium hover:from-blue-700 hover:to-blue-800 transition-all"
            onClick={(e) => e.stopPropagation()}
          >
            <span>Check Price</span>
            <ExternalLink className="h-4 w-4" />
          </a>
        </div>
      )}
    </motion.article>
  );
}
