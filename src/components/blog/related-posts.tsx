import { PostCard, type PostCardData } from "./post-card";

interface RelatedPostsProps {
  posts: PostCardData[];
  heading?: string;
}

export function RelatedPosts({
  posts,
  heading = "Related Articles",
}: RelatedPostsProps) {
  if (!posts.length) return null;

  return (
    <section
      aria-labelledby="related-posts-heading"
      className="mt-20 border-t border-border pt-16"
    >
      <div className="mb-8 flex items-end justify-between gap-4">
        <h2
          id="related-posts-heading"
          className="font-heading text-2xl md:text-3xl font-bold text-white tracking-tight"
        >
          {heading}
        </h2>
        <span className="hidden text-sm font-heading font-semibold uppercase tracking-[0.18em] text-text-muted sm:inline">
          More from the blog
        </span>
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <PostCard key={post.slug} post={post} variant="compact" />
        ))}
      </div>
    </section>
  );
}

export default RelatedPosts;
