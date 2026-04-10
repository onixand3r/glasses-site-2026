'use client';

import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { ExternalLink, ShoppingCart } from 'lucide-react';

interface AffiliateButtonProps {
  url: string;
  price?: number;
  label?: string;
  variant?: 'primary' | 'secondary';
  className?: string;
}

export default function AffiliateButton({
  url,
  price,
  label = 'Check Price',
  variant = 'primary',
  className,
}: AffiliateButtonProps) {
  return (
    <motion.a
      href={url}
      target="_blank"
      rel="noopener noreferrer sponsored"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={cn(
        'inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold text-lg',
        'transition-all duration-200 shadow-lg',
        variant === 'primary'
          ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 shadow-blue-500/25'
          : 'bg-gradient-to-r from-orange-500 to-orange-600 text-white hover:from-orange-600 hover:to-orange-700 shadow-orange-500/25',
        className
      )}
    >
      <ShoppingCart className="h-5 w-5" />
      <span>{label}</span>
      {price && <span className="opacity-90">- ${price.toLocaleString()}</span>}
      <ExternalLink className="h-4 w-4 ml-1" />
    </motion.a>
  );
}
