'use client';

import { cn } from '@/lib/utils';
import { Check, X } from 'lucide-react';
import { motion } from 'framer-motion';

interface ProsConsListProps {
  pros: string[];
  cons: string[];
  className?: string;
}

export default function ProsConsList({ pros, cons, className }: ProsConsListProps) {
  return (
    <div className={cn('grid md:grid-cols-2 gap-6', className)}>
      {/* Pros */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="bg-green-50 rounded-2xl p-6 dark:bg-green-900/20"
      >
        <h3 className="flex items-center gap-2 text-lg font-bold text-green-700 dark:text-green-400 mb-4">
          <Check className="h-5 w-5" />
          Pros
        </h3>
        <ul className="space-y-3">
          {pros.map((pro, index) => (
            <motion.li
              key={index}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-start gap-3 text-slate-700 dark:text-slate-300"
            >
              <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
              <span>{pro}</span>
            </motion.li>
          ))}
        </ul>
      </motion.div>

      {/* Cons */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="bg-red-50 rounded-2xl p-6 dark:bg-red-900/20"
      >
        <h3 className="flex items-center gap-2 text-lg font-bold text-red-700 dark:text-red-400 mb-4">
          <X className="h-5 w-5" />
          Cons
        </h3>
        <ul className="space-y-3">
          {cons.map((con, index) => (
            <motion.li
              key={index}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-start gap-3 text-slate-700 dark:text-slate-300"
            >
              <X className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
              <span>{con}</span>
            </motion.li>
          ))}
        </ul>
      </motion.div>
    </div>
  );
}
