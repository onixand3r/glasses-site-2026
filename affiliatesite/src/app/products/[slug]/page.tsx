import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getProductBySlug, parseProductData } from '@/lib/ghost';
import Rating, { RatingBreakdown } from '@/components/ui/Rating';
import Badge from '@/components/ui/Badge';
import ProsConsList from '@/components/product/ProsConsList';
import SpecTable from '@/components/product/SpecTable';
import AffiliateButton from '@/components/product/AffiliateButton';
import { Calendar, Clock, User, Share2, Bookmark } from 'lucide-react';
import Link from 'next/link';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export const revalidate = 3600;

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getProductBySlug(slug);
  if (!post) return { title: 'Product Not Found' };

  return {
    title: post.title,
    description: post.excerpt || `Read our in-depth review of ${post.title}`,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: post.feature_image ? [post.feature_image] : [],
    },
  };
}

export default async function ProductPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getProductBySlug(slug);

  if (!post) {
    notFound();
  }

  const productData = parseProductData(post);
  const category = post.tags?.find(t => !t.slug.startsWith('hash-'));

  return (
    <article className="min-h-screen bg-white dark:bg-slate-950">
      {/* Breadcrumb */}
      <div className="bg-slate-50 border-b border-slate-200 dark:bg-slate-900 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-slate-500 hover:text-blue-600 dark:text-slate-400">
              Home
            </Link>
            <span className="text-slate-300 dark:text-slate-600">/</span>
            <Link href="/products" className="text-slate-500 hover:text-blue-600 dark:text-slate-400">
              Reviews
            </Link>
            {category && (
              <>
                <span className="text-slate-300 dark:text-slate-600">/</span>
                <Link
                  href={`/categories/${category.slug}`}
                  className="text-slate-500 hover:text-blue-600 dark:text-slate-400"
                >
                  {category.name}
                </Link>
              </>
            )}
            <span className="text-slate-300 dark:text-slate-600">/</span>
            <span className="text-slate-900 dark:text-white font-medium truncate">{post.title}</span>
          </nav>
        </div>
      </div>

      {/* Hero */}
      <div className="bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Image */}
            <div className="relative aspect-square bg-white rounded-3xl overflow-hidden shadow-xl dark:bg-slate-800 animate-[fadeIn_0.5s_ease-out]">
              {post.feature_image ? (
                <img
                  src={post.feature_image}
                  alt={post.feature_image_alt || post.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="flex items-center justify-center h-full text-slate-400">
                  No image available
                </div>
              )}
              {post.featured && (
                <Badge variant="primary" className="absolute top-4 left-4">
                  Editor's Pick
                </Badge>
              )}
            </div>

            {/* Info */}
            <div className="space-y-6 animate-[fadeIn_0.5s_ease-out_0.1s_both]">
              <div className="flex items-center gap-3">
                {category && (
                  <Link href={`/categories/${category.slug}`}>
                    <Badge variant="default">{category.name}</Badge>
                  </Link>
                )}
              </div>

              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white">
                {post.title}
              </h1>

              <p className="text-lg text-slate-600 dark:text-slate-400">
                {post.excerpt || 'Read our comprehensive review below...'}
              </p>

              {/* Rating */}
              {productData.rating && (
                <div className="bg-white rounded-2xl p-6 border border-slate-200 dark:bg-slate-800 dark:border-slate-700">
                  <RatingBreakdown
                    ratings={{
                      overall: productData.rating,
                      performance: 4.5,
                      value: 4.0,
                      design: 4.8,
                      features: 4.2,
                    }}
                  />
                </div>
              )}

              {/* Price & CTA */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                {productData.price && (
                  <div className="text-3xl font-bold text-slate-900 dark:text-white">
                    ${productData.price.toLocaleString()}
                  </div>
                )}
                {productData.affiliateUrl && (
                  <AffiliateButton
                    url={productData.affiliateUrl}
                    price={productData.price}
                  />
                )}
              </div>

              {/* Meta */}
              <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500 dark:text-slate-400">
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  {new Date(post.published_at).toLocaleDateString('en-US', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  {post.reading_time} min read
                </div>
                {post.authors?.[0] && (
                  <div className="flex items-center gap-1">
                    <User className="h-4 w-4" />
                    {post.authors[0].name}
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="flex items-center gap-3">
                <button className="flex items-center gap-2 px-4 py-2 text-slate-600 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400">
                  <Share2 className="h-4 w-4" />
                  Share
                </button>
                <button className="flex items-center gap-2 px-4 py-2 text-slate-600 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400">
                  <Bookmark className="h-4 w-4" />
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-12">
            {/* Pros/Cons */}
            {productData.pros && productData.cons && (
              <ProsConsList pros={productData.pros} cons={productData.cons} />
            )}

            {/* Review Content */}
            <div
              className="prose prose-lg max-w-none dark:prose-invert prose-headings:text-slate-900 dark:prose-headings:text-white prose-a:text-blue-600 dark:prose-a:text-blue-400"
              dangerouslySetInnerHTML={{ __html: post.html }}
            />

            {/* Specifications */}
            {productData.specs && Object.keys(productData.specs).length > 0 && (
              <div>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
                  Specifications
                </h2>
                <SpecTable specs={productData.specs} />
              </div>
            )}

            {/* Verdict */}
            {productData.verdict && (
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-8 dark:from-blue-900/20 dark:to-blue-800/20">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                  Our Verdict
                </h2>
                <p className="text-lg text-slate-700 dark:text-slate-300">
                  {productData.verdict}
                </p>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <aside className="space-y-8">
            {/* Quick Buy */}
            {productData.affiliateUrl && (
              <div className="bg-white rounded-2xl border border-slate-200 p-6 sticky top-24 dark:bg-slate-900 dark:border-slate-800">
                <h3 className="font-semibold text-slate-900 dark:text-white mb-4">
                  Quick Buy
                </h3>
                {productData.price && (
                  <div className="text-2xl font-bold text-blue-600 mb-4">
                    ${productData.price.toLocaleString()}
                  </div>
                )}
                <a
                  href={productData.affiliateUrl}
                  target="_blank"
                  rel="noopener noreferrer sponsored"
                  className="block w-full text-center py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors"
                >
                  Check Price
                </a>
              </div>
            )}

            {/* Related */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 dark:bg-slate-900 dark:border-slate-800">
              <h3 className="font-semibold text-slate-900 dark:text-white mb-4">
                Related Reviews
              </h3>
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-16 h-16 bg-slate-100 rounded-lg dark:bg-slate-800" />
                    <div className="flex-1">
                      <div className="h-3 bg-slate-200 rounded w-full mb-1 dark:bg-slate-700" />
                      <div className="h-3 bg-slate-100 rounded w-2/3 dark:bg-slate-800" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </article>
  );
}
