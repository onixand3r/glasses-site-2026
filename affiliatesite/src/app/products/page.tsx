import { Metadata } from 'next';
import ProductCard from '@/components/product/ProductCard';
import { getProducts, getCategories, parseProductData } from '@/lib/ghost';
import { Search, Filter, ChevronDown } from 'lucide-react';

export const metadata: Metadata = {
  title: 'All Reviews',
  description: 'Browse all our in-depth tech product reviews. Find the perfect laptop, smartphone, headphones, and more.',
};

export const revalidate = 3600;

export default async function ProductsPage() {
  const [products, categories] = await Promise.all([
    getProducts(20),
    getCategories(),
  ]);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900/50">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 dark:bg-slate-900 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-2">
            All Reviews
          </h1>
          <p className="text-slate-600 dark:text-slate-400">
            Browse our complete collection of in-depth tech reviews
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <aside className="lg:w-64 flex-shrink-0">
            <div className="bg-white rounded-2xl border border-slate-200 p-6 sticky top-24 dark:bg-slate-900 dark:border-slate-800">
              <div className="flex items-center gap-2 mb-4">
                <Filter className="h-5 w-5 text-slate-400" />
                <h2 className="font-semibold text-slate-900 dark:text-white">Filters</h2>
              </div>

              {/* Categories */}
              <div className="mb-6">
                <h3 className="text-sm font-medium text-slate-700 mb-3 dark:text-slate-300">Category</h3>
                <div className="space-y-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" className="rounded border-slate-300 text-blue-600" />
                    <span className="text-sm text-slate-600 dark:text-slate-400">All Categories</span>
                  </label>
                  {categories.slice(0, 5).map((cat) => (
                    <label key={cat.id} className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" className="rounded border-slate-300 text-blue-600" />
                      <span className="text-sm text-slate-600 dark:text-slate-400">{cat.name}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div className="mb-6">
                <h3 className="text-sm font-medium text-slate-700 mb-3 dark:text-slate-300">Price Range</h3>
                <div className="space-y-2">
                  {['Under $100', '$100 - $500', '$500 - $1000', 'Over $1000'].map((range) => (
                    <label key={range} className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" className="rounded border-slate-300 text-blue-600" />
                      <span className="text-sm text-slate-600 dark:text-slate-400">{range}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Rating */}
              <div>
                <h3 className="text-sm font-medium text-slate-700 mb-3 dark:text-slate-300">Rating</h3>
                <div className="space-y-2">
                  {['4 Stars & Up', '3 Stars & Up', '2 Stars & Up'].map((rating) => (
                    <label key={rating} className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" className="rounded border-slate-300 text-blue-600" />
                      <span className="text-sm text-slate-600 dark:text-slate-400">{rating}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* Products Grid */}
          <div className="flex-1">
            {/* Sort Bar */}
            <div className="flex items-center justify-between mb-6 bg-white rounded-xl border border-slate-200 p-4 dark:bg-slate-900 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <Search className="h-5 w-5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search products..."
                  className="flex-1 outline-none text-slate-900 dark:text-white bg-transparent"
                />
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-slate-600 dark:text-slate-400">Sort by:</span>
                <select className="text-sm bg-transparent border-0 outline-none text-slate-900 dark:text-white cursor-pointer">
                  <option>Most Recent</option>
                  <option>Highest Rated</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                </select>
                <ChevronDown className="h-4 w-4 text-slate-400" />
              </div>
            </div>

            {/* Grid */}
            {products.length > 0 ? (
              <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
                {products.map((post) => (
                  <ProductCard
                    key={post.id}
                    post={post}
                    productData={parseProductData(post)}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-16 bg-white rounded-2xl border border-slate-200 dark:bg-slate-900 dark:border-slate-800">
                <p className="text-slate-500 dark:text-slate-400 mb-2">No products found</p>
                <p className="text-sm text-slate-400">Add content in Ghost CMS to see products here.</p>
              </div>
            )}

            {/* Pagination */}
            {products.length > 0 && (
              <div className="flex items-center justify-center gap-2 mt-8">
                <button className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-blue-600 dark:text-slate-400">
                  Previous
                </button>
                <button className="px-4 py-2 text-sm font-medium bg-blue-600 text-white rounded-lg">
                  1
                </button>
                <button className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-blue-600 dark:text-slate-400">
                  2
                </button>
                <button className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-blue-600 dark:text-slate-400">
                  3
                </button>
                <button className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-blue-600 dark:text-slate-400">
                  Next
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
