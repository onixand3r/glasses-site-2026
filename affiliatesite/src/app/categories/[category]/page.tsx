import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getProductsByCategory, getCategoryBySlug, parseProductData, getCategories } from '@/lib/ghost';
import ProductCard from '@/components/product/ProductCard';
import Badge from '@/components/ui/Badge';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

interface PageProps {
  params: Promise<{ category: string }>;
}

export const revalidate = 3600;

export async function generateStaticParams() {
  const categories = await getCategories();
  return categories.map((cat) => ({ category: cat.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { category } = await params;
  const cat = await getCategoryBySlug(category);
  if (!cat) return { title: 'Category Not Found' };

  return {
    title: `${cat.name} Reviews`,
    description: cat.description || `Browse our ${cat.name} reviews and comparisons`,
  };
}

export default async function CategoryPage({ params }: PageProps) {
  const { category: categorySlug } = await params;
  const [category, products] = await Promise.all([
    getCategoryBySlug(categorySlug),
    getProductsByCategory(categorySlug, 12),
  ]);

  if (!category) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900/50">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 dark:bg-slate-900 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center gap-3 mb-4">
            <Badge variant="primary">{products.length} Products</Badge>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-2">
            {category.name} Reviews
          </h1>
          {category.description && (
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-3xl">
              {category.description}
            </p>
          )}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Featured */}
        {products.length > 0 && products[0] && (
          <div className="mb-12">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6">
              Featured in {category.name}
            </h2>
            <div className="grid lg:grid-cols-2 gap-6">
              <div className="lg:row-span-2">
                <ProductCard
                  post={products[0]}
                  productData={parseProductData(products[0])}
                  className="h-full"
                />
              </div>
              {products.slice(1, 3).map((post) => (
                <ProductCard
                  key={post.id}
                  post={post}
                  productData={parseProductData(post)}
                />
              ))}
            </div>
          </div>
        )}

        {/* All Products */}
        {products.length > 3 && (
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6">
              All {category.name} Reviews
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.slice(3).map((post) => (
                <ProductCard
                  key={post.id}
                  post={post}
                  productData={parseProductData(post)}
                />
              ))}
            </div>
          </div>
        )}

        {/* Empty State */}
        {products.length === 0 && (
          <div className="text-center py-16 bg-white rounded-2xl border border-slate-200 dark:bg-slate-900 dark:border-slate-800">
            <p className="text-slate-500 dark:text-slate-400 mb-4">
              No reviews found in this category yet.
            </p>
            <Link
              href="/products"
              className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700"
            >
              Browse all reviews
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
