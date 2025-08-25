import Link from "next/link";
import Image from "next/image";
import type { GuidePost } from "@/lib/wp";

export default function GuideCard({ post }: { post: GuidePost }) {
  const img = post.featuredImage?.node?.sourceUrl ?? null;
  const alt = post.featuredImage?.node?.altText ?? post.title;

  return (
    <article className="group grid h-full grid-rows-[200px_1fr] overflow-hidden rounded-2xl border bg-white shadow-sm transition hover:shadow-md">
      <Link
        href={`/guides/${post.slug}`}
        className="contents" // lässt die Grid-Zeilen auf dem Link wirken
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
        {/* Bildzeile (fix 200px) */}
        <div className="relative h-[200px] w-full overflow-hidden">
          {img ? (
            <Image
              src={img}
              alt={alt}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 33vw"
              className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              priority={false}
            />
          ) : (
            <div className="absolute inset-0 grid place-items-center bg-neutral-100 text-neutral-500">
              Kein Bild
            </div>
          )}
        </div>

        {/* Contentzeile */}
        <div className="flex min-h-0 flex-col gap-2 p-4">
          <h3 className="font-serif text-lg font-bold leading-snug">{post.title}</h3>
          {post.excerpt && (
            <div
              className="line-clamp-2 text-sm text-neutral-600"
              suppressHydrationWarning
              dangerouslySetInnerHTML={{ __html: post.excerpt }}
            />
          )}
          <span className="mt-auto inline-block text-sm font-medium text-green-700">
            Lesen →
          </span>
        </div>
      </Link>
    </article>
  );
}
