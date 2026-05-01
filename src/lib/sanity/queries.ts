import { groq } from "next-sanity";

export const postsQuery = groq`
  *[_type == "post" && defined(slug.current)] | order(publishedAt desc) {
    _id,
    title,
    "slug": slug.current,
    excerpt,
    mainImage,
    publishedAt,
    "category": categories[0]->{ "title": title, "slug": slug.current },
    author->{ name, "slug": slug.current, role, image },
    tags,
    "readingTime": round(length(pt::text(body)) / 5 / 180)
  }
`;

export const postBySlugQuery = groq`
  *[_type == "post" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    excerpt,
    mainImage,
    body,
    publishedAt,
    tags,
    "category": categories[0]->{ "title": title, "slug": slug.current },
    author->{ name, "slug": slug.current, role, bio, image },
    seo,
    "readingTime": round(length(pt::text(body)) / 5 / 180)
  }
`;

export const postSlugsQuery = groq`
  *[_type == "post" && defined(slug.current)][].slug.current
`;

export const categoriesQuery = groq`
  *[_type == "category"] | order(title asc) {
    _id,
    title,
    "slug": slug.current,
    description,
    "postCount": count(*[_type == "post" && references(^._id)])
  }
`;

export const featuredPostsQuery = groq`
  *[_type == "post" && defined(slug.current)] | order(publishedAt desc)[0...3] {
    _id,
    title,
    "slug": slug.current,
    excerpt,
    mainImage,
    publishedAt,
    "category": categories[0]->{ "title": title, "slug": slug.current },
    author->{ name, role },
    "readingTime": round(length(pt::text(body)) / 5 / 180)
  }
`;

export const relatedPostsQuery = groq`
  *[_type == "post"
    && slug.current != $slug
    && count(categories[@._ref in $categoryIds]) > 0]
    | order(publishedAt desc)[0...3] {
      _id,
      title,
      "slug": slug.current,
      excerpt,
      mainImage,
      publishedAt,
      "category": categories[0]->{ "title": title, "slug": slug.current },
      author->{ name },
      "readingTime": round(length(pt::text(body)) / 5 / 180)
    }
`;
