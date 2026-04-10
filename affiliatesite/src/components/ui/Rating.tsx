'use client';

import { cn } from '@/lib/utils';
import { Star } from 'lucide-react';

interface RatingProps {
  rating: number;
  maxRating?: number;
  size?: 'sm' | 'md' | 'lg';
  showValue?: boolean;
  className?: string;
}

export default function Rating({
  rating,
  maxRating = 5,
  size = 'md',
  showValue = true,
  className,
}: RatingProps) {
  const sizes = {
    sm: 'h-3 w-3',
    md: 'h-4 w-4',
    lg: 'h-5 w-5',
  };

  const getRatingColor = (rating: number) => {
    if (rating >= 4) return 'text-yellow-400';
    if (rating >= 3) return 'text-orange-400';
    return 'text-red-400';
  };

  return (
    <div className={cn('flex items-center gap-1.5', className)}>
      <div className="flex items-center gap-0.5">
        {Array.from({ length: maxRating }).map((_, i) => {
          const filled = i < Math.floor(rating);
          const partial = i === Math.floor(rating) && rating % 1 !== 0;

          return (
            <span key={i} className="relative">
              <Star
                className={cn(
                  sizes[size],
                  filled || partial ? 'fill-current' : 'fill-slate-200',
                  getRatingColor(rating)
                )}
              />
              {partial && (
                <Star
                  className={cn(sizes[size], 'absolute top-0 left-0 text-slate-300 fill-slate-200')}
                  style={{ clipPath: `inset(0 ${(1 - (rating % 1)) * 100}% 0 0)` }}
                />
              )}
            </span>
          );
        })}
      </div>
      {showValue && (
        <span className={cn(
          'font-bold',
          size === 'sm' && 'text-xs',
          size === 'md' && 'text-sm',
          size === 'lg' && 'text-base',
          'text-slate-700 dark:text-slate-300'
        )}>
          {rating.toFixed(1)}
        </span>
      )}
    </div>
  );
}

// Rating breakdown component for detailed reviews
interface RatingBreakdownProps {
  ratings: {
    overall: number;
    performance?: number;
    value?: number;
    design?: number;
    features?: number;
  };
  className?: string;
}

export function RatingBreakdown({ ratings, className }: RatingBreakdownProps) {
  const categories = [
    { key: 'performance', label: 'Performance' },
    { key: 'value', label: 'Value for Money' },
    { key: 'design', label: 'Design' },
    { key: 'features', label: 'Features' },
  ].filter(c => ratings[c.key as keyof typeof ratings] !== undefined);

  return (
    <div className={cn('space-y-3', className)}>
      <div className="flex items-center justify-between">
        <span className="text-lg font-bold text-slate-900 dark:text-white">Overall Rating</span>
        <div className="flex items-center gap-2">
          <span className="text-3xl font-bold text-blue-600">{ratings.overall.toFixed(1)}</span>
          <span className="text-slate-500">/ 5</span>
        </div>
      </div>
      {categories.length > 0 && (
        <div className="space-y-2 pt-2 border-t border-slate-200 dark:border-slate-700">
          {categories.map(({ key, label }) => {
            const value = ratings[key as keyof typeof ratings] as number;
            return (
              <div key={key} className="flex items-center justify-between text-sm">
                <span className="text-slate-600 dark:text-slate-400">{label}</span>
                <div className="flex items-center gap-2">
                  <div className="w-24 h-2 bg-slate-100 rounded-full overflow-hidden dark:bg-slate-800">
                    <div
                      className="h-full bg-blue-600 rounded-full"
                      style={{ width: `${(value / 5) * 100}%` }}
                    />
                  </div>
                  <span className="font-medium text-slate-700 dark:text-slate-300 w-8 text-right">
                    {value.toFixed(1)}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
