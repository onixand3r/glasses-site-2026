declare module '@tryghost/content-api' {
  export interface GhostAPIOptions {
    url: string;
    key: string;
    version: string;
  }

  export interface PostBrowseOptions {
    limit?: number | 'all';
    page?: number;
    filter?: string;
    include?: string[];
    order?: string[];
    formats?: string[];
  }

  export interface PostReadOptions {
    id?: string;
    slug?: string;
  }

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
    codeinjection_head?: string;
    [key: string]: unknown;
  }

  export interface GhostTag {
    id: string;
    name: string;
    slug: string;
    description: string | null;
    feature_image: string | null;
    [key: string]: unknown;
  }

  export interface GhostAuthor {
    id: string;
    name: string;
    slug: string;
    profile_image: string | null;
    bio: string | null;
    [key: string]: unknown;
  }

  export interface PostsAPI {
    browse(options?: PostBrowseOptions): Promise<GhostPost[]>;
    read(options: PostReadOptions, extras?: { include?: string[] }): Promise<GhostPost>;
  }

  export interface TagsAPI {
    browse(options?: { limit?: number | 'all'; order?: string[] }): Promise<GhostTag[]>;
    read(options: { slug: string }): Promise<GhostTag>;
  }

  export interface AuthorsAPI {
    browse(options?: { limit?: number | 'all' }): Promise<GhostAuthor[]>;
  }

  export interface GhostAPI {
    posts: PostsAPI;
    tags: TagsAPI;
    authors: AuthorsAPI;
  }

  // The module exports a constructor function
  const GhostContentAPI: {
    new (options: GhostAPIOptions): GhostAPI;
    (options: GhostAPIOptions): GhostAPI;
  };

  export default GhostContentAPI;
}
