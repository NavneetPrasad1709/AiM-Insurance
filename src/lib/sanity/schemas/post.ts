export const post = {
  name: "post",
  title: "Blog Post",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule: { required: () => unknown; max: (n: number) => unknown }) =>
        (Rule.required() as { max: (n: number) => unknown }).max(120),
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (Rule: { required: () => unknown }) => Rule.required(),
    },
    {
      name: "excerpt",
      title: "Excerpt",
      type: "text",
      rows: 3,
      validation: (Rule: { required: () => unknown; max: (n: number) => unknown }) =>
        (Rule.required() as { max: (n: number) => unknown }).max(220),
    },
    {
      name: "mainImage",
      title: "Main image",
      type: "image",
      options: { hotspot: true },
      fields: [{ name: "alt", title: "Alt text", type: "string" }],
    },
    {
      name: "categories",
      title: "Categories",
      type: "array",
      of: [{ type: "reference", to: [{ type: "category" }] }],
      validation: (Rule: { required: () => unknown; min: (n: number) => unknown }) =>
        (Rule.required() as { min: (n: number) => unknown }).min(1),
    },
    {
      name: "author",
      title: "Author",
      type: "reference",
      to: [{ type: "author" }],
    },
    {
      name: "publishedAt",
      title: "Published at",
      type: "datetime",
      validation: (Rule: { required: () => unknown }) => Rule.required(),
    },
    {
      name: "body",
      title: "Body",
      type: "array",
      of: [
        { type: "block" },
        { type: "image", options: { hotspot: true } },
      ],
    },
    {
      name: "tags",
      title: "Tags",
      type: "array",
      of: [{ type: "string" }],
      options: { layout: "tags" },
    },
    {
      name: "seo",
      title: "SEO",
      type: "object",
      fields: [
        { name: "title", type: "string", title: "Meta title" },
        { name: "description", type: "text", rows: 2, title: "Meta description" },
        {
          name: "keywords",
          type: "array",
          title: "Keywords",
          of: [{ type: "string" }],
          options: { layout: "tags" },
        },
        {
          name: "ogImage",
          type: "image",
          title: "Open Graph image",
          options: { hotspot: true },
        },
      ],
    },
  ],
  preview: {
    select: { title: "title", media: "mainImage", subtitle: "publishedAt" },
  },
};
