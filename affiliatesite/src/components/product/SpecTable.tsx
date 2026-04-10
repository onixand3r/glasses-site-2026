'use client';

import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface SpecTableProps {
  specs: Record<string, string>;
  className?: string;
}

export default function SpecTable({ specs, className }: SpecTableProps) {
  const entries = Object.entries(specs);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn('bg-slate-50 rounded-2xl overflow-hidden dark:bg-slate-800/50', className)}
    >
      <table className="w-full">
        <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
          {entries.map(([key, value], index) => (
            <motion.tr
              key={key}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className="hover:bg-slate-100 dark:hover:bg-slate-700/50 transition-colors"
            >
              <td className="px-5 py-3.5 text-sm font-medium text-slate-600 dark:text-slate-400 w-1/3">
                {key}
              </td>
              <td className="px-5 py-3.5 text-sm text-slate-900 dark:text-white">
                {value}
              </td>
            </motion.tr>
          ))}
        </tbody>
      </table>
    </motion.div>
  );
}
