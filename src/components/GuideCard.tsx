// src/components/GuideCard.tsx
import Link from "next/link";
import Image from "next/image";
import type { GuidePost } from "@/lib/wp";

export default function GuideCard({ post }: { post: GuidePost }) {
  const img = post.featuredImage?.node?.sourceUrl ?? null;
  const alt = post.featuredImage?.node?.altText ?? post.title;

  return (
    <article className="flex h-full flex-col overflow-hidden rounded-2xl border bg-white shadow-sm transition hover:shadow-md">
      <Link
        href={`/guides/${post.slug}`}
        className="grid h-full grid-rows-[auto_1fr]"
        onClick={() => {
          if (typeof window !== "undefined") {
            window.dispatchEvent(
              new CustomEvent("track", {
                detail: { event: "guide_click", slug: post.slug, title: post.title },
              })
            );
          }
        }}
      >
        {/* Feste Höhe → verhindert Hero-Übergröße */}
        <div className="relative h-[240px] w-full overflow-hidden">
          {img ? (
            <Image
              src={img}
              alt={alt}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 33vw"
              className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            />
          ) : (
            <div className="absolute inset-0 grid place-items-center bg-neutral-100 text-neutral-500">
              Kein Bild
            </div>
          )}
        </div>

        <div className="flex flex-1 flex-col gap-2 p-4">
          <h3 className="font-serif text-lg font-bold leading-snug">{post.title}</h3>
          {post.excerpt && (
            <div
              className="line-clamp-2 text-sm text-neutral-600"
              suppressHydrationWarning
              dangerouslySetInnerHTML={{ __html: post.excerpt }}
            />
          )}
        </div>
      </Link>
    </article>
  );
}
