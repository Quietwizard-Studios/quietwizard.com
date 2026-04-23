export interface Article {
  id: string;
  title: string;
  slug: string;
  category: string | null;
  body: string | null;
  cover_image_url: string | null;
  published: boolean;
  published_at: string | null;
  read_time_minutes: number | null;
  author_name: string | null;
  seo_title: string | null;
  seo_description: string | null;
  tags: string[] | null;
  updated_at: string;
  created_at: string;
}

export interface Service {
  id: string;
  label: string;
  title: string;
  price: string | null;
  description: string | null;
  tags: string[] | null;
  featured: boolean;
  sort_order: number;
}

export interface Setting {
  key: string;
  value: string;
}

export interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  company: string | null;
  message: string;
  read: boolean;
  created_at: string;
}
