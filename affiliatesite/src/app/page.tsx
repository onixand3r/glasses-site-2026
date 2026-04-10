import Link from 'next/link';
import { ArrowRight, TrendingUp, Award, Clock, Zap } from 'lucide-react';
import ProductCard from '@/components/product/ProductCard';
import Badge from '@/components/ui/Badge';
import { getProducts, getFeaturedProducts, getCategories, parseProductData } from '@/lib/ghost';

export const revalidate = 3600; // Revalidate every hour

export default async function HomePage() {
  // Fetch data from Ghost
  const [products, featuredProducts, categories] = await Promise.all([
    getProducts(6),
    getFeaturedProducts(3),
    getCategories(),
  ]);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 to-transparent" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto animate-[fadeIn_0.6s_ease-out]">
            <Badge variant="primary" size="lg" className="mb-6">
              <Zap className="h-4 w-4 mr-1" />
              Expert Reviews & Comparisons
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-blue-100 to-blue-200 bg-clip-text text-transparent">
              Find Your Perfect Tech
            </h1>
            <p className="text-lg md:text-xl text-slate-300 mb-8">
              In-depth reviews, side-by-side comparisons, and unbiased recommendations to help you make the right choice.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/products"
                className="inline-flex items-center gap-2 px-8 py-4 bg-blue-600 hover:bg-blue-700 rounded-xl font-semibold transition-colors"
              >
                Browse Reviews
                <ArrowRight className="h-5 w-5" />
              </Link>
              <Link
                href="/comparisons"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 hover:bg-white/20 rounded-xl font-semibold backdrop-blur-sm transition-colors"
              >
                Compare Products
              </Link>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 animate-[fadeIn_0.6s_ease-out_0.3s_both]">
            {[
              { icon: Award, value: '500+', label: 'Expert Reviews' },
              { icon: TrendingUp, value: '100+', label: 'Comparisons' },
              { icon: Clock, value: '24/7', label: 'Updated Daily' },
              { icon: Zap, value: '10M+', label: 'Monthly Readers' },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <stat.icon className="h-8 w-8 mx-auto mb-2 text-blue-400" />
                <div className="text-2xl md:text-3xl font-bold">{stat.value}</div>
                <div className="text-sm text-slate-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Reviews */}
      <section className="py-16 lg:py-24 bg-slate-50 dark:bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white">
                Editor's Picks
              </h2>
              <p className="text-slate-600 dark:text-slate-400 mt-1">
                Our top-rated products handpicked by experts
              </p>
            </div>
            <Link
              href="/products?featured=true"
              className="hidden md:inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium"
            >
              View all
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProducts.length > 0 ? (
              featuredProducts.map((post) => (
                <ProductCard
                  key={post.id}
                  post={post}
                  productData={parseProductData(post)}
                />
              ))
            ) : (
              // Placeholder cards when no data
              <>
                {[1, 2, 3].map((i) => (
                  <div key={i} className="bg-white rounded-2xl border border-slate-200 overflow-hidden dark:bg-slate-900 dark:border-slate-800">
                    <div className="aspect-video bg-slate-200 dark:bg-slate-800" />
                    <div className="p-5">
                      <div className="h-6 bg-slate-200 rounded mb-2 dark:bg-slate-700" />
                      <div className="h-4 bg-slate-100 rounded w-3/4 dark:bg-slate-800" />
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white">
              Browse by Category
            </h2>
            <p className="text-slate-600 dark:text-slate-400 mt-2">
              Find reviews for exactly what you're looking for
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.length > 0 ? (
              categories.slice(0, 6).map((category) => (
                <Link
                  key={category.id}
                  href={`/categories/${category.slug}`}
                  className="group p-6 bg-white rounded-2xl border border-slate-200 hover:border-blue-300 hover:shadow-lg transition-all dark:bg-slate-900 dark:border-slate-800 dark:hover:border-blue-600"
                >
                  <div className="text-center">
                    <div className="w-12 h-12 mx-auto mb-3 bg-blue-100 rounded-xl flex items-center justify-center group-hover:bg-blue-200 transition-colors dark:bg-blue-900/30 dark:group-hover:bg-blue-900/50">
                      <span className="text-2xl">💻</span>
                    </div>
                    <h3 className="font-semibold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400">
                      {category.name}
                    </h3>
                    {category.description && (
                      <p className="text-xs text-slate-500 mt-1 line-clamp-2">{category.description}</p>
                    )}
                  </div>
                </Link>
              ))
            ) : (
              // Placeholder categories
              ['Laptops', 'Smartphones', 'Headphones', 'Cameras', 'Gaming', 'Smart Home'].map((name) => (
                <div key={name} className="p-6 bg-white rounded-2xl border border-slate-200 dark:bg-slate-900 dark:border-slate-800">
                  <div className="text-center">
                    <div className="w-12 h-12 mx-auto mb-3 bg-slate-100 rounded-xl dark:bg-slate-800" />
                    <div className="h-4 bg-slate-200 rounded w-16 mx-auto dark:bg-slate-700" />
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Latest Reviews */}
      <section className="py-16 lg:py-24 bg-slate-50 dark:bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white">
                Latest Reviews
              </h2>
              <p className="text-slate-600 dark:text-slate-400 mt-1">
                Fresh from our lab to your screen
              </p>
            </div>
            <Link
              href="/products"
              className="hidden md:inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium"
            >
              View all
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.length > 0 ? (
              products.map((post) => (
                <ProductCard
                  key={post.id}
                  post={post}
                  productData={parseProductData(post)}
                />
              ))
            ) : (
              // Placeholder content
              <div className="col-span-full text-center py-12 text-slate-500">
                <p>Connect your Ghost CMS to see products here.</p>
                <p className="text-sm mt-2">No products found. Start by adding content in Ghost.</p>
              </div>
            )}
          </div>

          {products.length > 0 && (
            <div className="text-center mt-10">
              <Link
                href="/products"
                className="inline-flex items-center gap-2 px-8 py-3 bg-slate-900 text-white rounded-xl font-semibold hover:bg-slate-800 transition-colors dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100"
              >
                View All Reviews
                <ArrowRight className="h-5 w-5" />
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-16 lg:py-24 bg-gradient-to-br from-blue-600 to-blue-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Stay Ahead of the Curve
          </h2>
          <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
            Get weekly updates with the latest reviews, exclusive deals, and buying guides delivered straight to your inbox.
          </p>
          <form className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full sm:flex-1 px-5 py-3 rounded-xl text-slate-900 placeholder-slate-500 outline-none focus:ring-2 focus:ring-white/50"
            />
            <button
              type="submit"
              className="w-full sm:w-auto px-8 py-3 bg-white text-blue-600 rounded-xl font-semibold hover:bg-blue-50 transition-colors"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
