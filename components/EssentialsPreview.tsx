import Link from "next/link";
import { getRenterEssentialPosts } from "@/lib/renter-essentials";
import { activeProvidersForSlot } from "@/lib/monetisation";

type EssentialsPreviewProps = {
  slugs?: string[];
  title?: string;
  description?: string;
  className?: string;
};

export default function EssentialsPreview({
  slugs,
  title = "Useful kit for the next step",
  description = "Practical Amazon UK product guides for viewing, moving into and living in a London rental.",
  className = "mb-12",
}: EssentialsPreviewProps) {
  const posts = getRenterEssentialPosts(slugs);
  const providers = activeProvidersForSlot("renterEssentials");

  if (posts.length === 0) return null;

  return (
    <section className={className}>
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">{title}</h2>
        <p className="text-sm text-slate-400 max-w-2xl">{description}</p>
        {providers.length > 0 && (
          <p className="mt-2 text-xs text-slate-500">
            {providers.map((provider) => provider.disclosure).join(" ")}
          </p>
        )}
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/essentials/${post.slug}`}
            className="rounded-lg bg-slate-900 border border-slate-800 p-5 hover:border-slate-600 transition-colors"
          >
            <p className="text-xs uppercase tracking-wide text-emerald-400 mb-2">
              Renter essentials
            </p>
            <h3 className="font-semibold text-white mb-2">{post.shortTitle}</h3>
            <p className="text-sm text-slate-400 line-clamp-2 mb-4">
              {post.metaDescription}
            </p>
            <div className="flex flex-wrap gap-2">
              {post.products.slice(0, 3).map((product) => (
                <span
                  key={product.asin}
                  className="rounded-full bg-slate-800 px-2.5 py-1 text-xs text-slate-300"
                >
                  {product.shortName}
                </span>
              ))}
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
