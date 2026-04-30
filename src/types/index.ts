import type { LucideIcon } from "lucide-react";

export type LucideIconName = string;

export interface NavLink {
  label: string;
  href: string;
  icon?: LucideIconName;
  description?: string;
  badge?: string;
  children?: NavLink[];
}

export interface SocialLink {
  label: string;
  href: string;
  icon: LucideIconName;
}

export interface ServiceType {
  name: string;
  slug: string;
  icon: LucideIconName;
  shortDescription: string;
  heroTitle: string;
  heroDescription: string;
  comingSoon?: boolean;
}

export interface Stat {
  value: string;
  label: string;
}

export interface ProcessStep {
  step: number;
  title: string;
  description: string;
  icon: LucideIconName;
}

export interface Testimonial {
  name: string;
  quote: string;
  rating: number;
  role?: string;
  savings?: string;
  image?: SanityImage;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface SanityImage {
  _type: "image";
  asset: { _ref: string; _type: "reference" };
  alt?: string;
  hotspot?: { x: number; y: number; height: number; width: number };
  crop?: { top: number; bottom: number; left: number; right: number };
}

export interface SeoFields {
  title?: string;
  description?: string;
  keywords?: string[];
  ogImage?: SanityImage;
}

export interface Author {
  name: string;
  slug: string;
  role?: string;
  image?: SanityImage;
}

export interface Category {
  title: string;
  slug: string;
}

export interface BlogPost {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: unknown;
  publishedAt: string;
  category?: Category;
  author?: Author;
  readingTime?: number;
  image?: SanityImage;
  tags?: string[];
  seo?: SeoFields;
}

export interface QuoteFormData {
  name: string;
  email: string;
  phone: string;
  insuranceType: ServiceType["slug"];
  currentProvider?: string;
  currentPremium?: number;
  notes?: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}

export interface CalculatorFormData {
  insuranceType: ServiceType["slug"];
  currentPremium: number;
  coverageAmount: number;
  yearsWithProvider: number;
  zipCode?: string;
}

export type IconComponent = LucideIcon;
