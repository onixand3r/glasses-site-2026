import GhostContentAPI from '@tryghost/content-api';

// Initialize Ghost API client
// These values should be set in your environment variables
const api = new GhostContentAPI({
  url: process.env.GHOST_API_URL || 'http://localhost:2368',
  key: process.env.GHOST_CONTENT_API_KEY || '',
  version: 'v5.0',
});

export interface GhostPost {
  id: string;
  uuid: string;
  title: string;
  slug: string;
  html: string;
  excerpt: string;
  feature_image: string | null;
  feature_image_alt: string | null;
  featured: boolean;
  published_at: string;
  updated_at: string;
  created_at: string;
  tags: GhostTag[];
  authors: GhostAuthor[];
  reading_time: number;
  // Custom fields stored in code injection
  codeinjection_head?: string;
}

export interface GhostTag {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  feature_image: string | null;
}

export interface GhostAuthor {
  id: string;
  name: string;
  slug: string;
  profile_image: string | null;
  bio: string | null;
}

// Parse custom product data from code injection
export interface ProductData {
  price?: number;
  affiliateUrl?: string;
  rating?: number;
  pros?: string[];
  cons?: string[];
  specs?: Record<string, string>;
  verdict?: string;
}

export function parseProductData(post: GhostPost): ProductData {
  const data: ProductData = {};

  if (post.codeinjection_head) {
    try {
      // Look for productData in code injection
      const match = post.codeinjection_head.match(/window\.productData\s*=\s*(\{[\s\S]*?\});/);
      if (match) {
        const parsed = JSON.parse(match[1]);
        return parsed;
      }
    } catch (e) {
      console.error('Failed to parse product data:', e);
    }
  }

  return data;
}

// Fetch all posts (products)
export async function getProducts(limit: number = 10, page: number = 1) {
  try {
    const posts = await api.posts.browse({
      limit,
      page,
      include: ['tags', 'authors'],
      order: ['published_at DESC'],
    });
    return posts as GhostPost[];
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
}

// Fetch featured posts
export async function getFeaturedProducts(limit: number = 5) {
  try {
    const posts = await api.posts.browse({
      limit,
      filter: 'featured:true',
      include: ['tags', 'authors'],
    });
    return posts as GhostPost[];
  } catch (error) {
    console.error('Error fetching featured products:', error);
    return [];
  }
}

// Fetch single post by slug
export async function getProductBySlug(slug: string) {
  try {
    const post = await api.posts.read({
      slug,
    }, {
      include: ['tags', 'authors'],
    });
    return post as GhostPost;
  } catch (error) {
    console.error('Error fetching product:', error);
    return null;
  }
}

// Fetch posts by tag (category)
export async function getProductsByCategory(tagSlug: string, limit: number = 10) {
  try {
    const posts = await api.posts.browse({
      limit,
      filter: `tag:${tagSlug}`,
      include: ['tags', 'authors'],
    });
    return posts as GhostPost[];
  } catch (error) {
    console.error('Error fetching products by category:', error);
    return [];
  }
}

// Fetch all tags (categories)
export async function getCategories() {
  try {
    const tags = await api.tags.browse({
      limit: 'all',
      order: ['name ASC'],
    });
    return tags as GhostTag[];
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
}

// Fetch a single tag by slug
export async function getCategoryBySlug(slug: string) {
  try {
    const tag = await api.tags.read({
      slug,
    });
    return tag as GhostTag;
  } catch (error) {
    console.error('Error fetching category:', error);
    return null;
  }
}

export default api;
