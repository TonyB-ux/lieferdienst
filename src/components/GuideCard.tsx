import Link from "next/link";
import Image from "next/image";
import type { GuidePost } from "@/lib/wp";

export default function GuideCard({ post }: { post: GuidePost }) {
  const img = post.featuredImage?.node?.sourceUrl ?? null;
  const alt = post.featuredImage?.node?.altText ?? post.title ?? "";

  return (
    // ⚠️ WICHTIG: „glass card“ sorgt für dein Glass-Design
    <article className="glass card h-full">
      {/* Bild-Zeile (fix 200px) */}
      <div className="relative h-[200px] w-full overflow-hidden rounded-t-2xl">
        {img ? (
          <Image
            src={img}
            alt={alt}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 33vw"
            className="object-cover transition-transform duration-500 hover:scale-[1.03]"
            priority={false}
          />
        ) : (
          <div className="absolute inset-0 grid place-items-center bg-neutral-100 text-neutral-500">
            Kein Bild
          </div>
        )}
      </div>

      {/* Content-Zeile */}
      <div
        className="
          flex min-h-0 flex-col gap-2 p-4
          [&_a]:no-underline [&_a]:text-inherit [&_a:hover]:underline
        "
        style={{ textDecoration: "none" }}
      >
        <h3 className="font-serif text-lg font-bold leading-snug">{post.title}</h3>

        {post.excerpt && (
          <div
            className="line-clamp-2 text-sm text-neutral-700"
            suppressHydrationWarning
            dangerouslySetInnerHTML={{ __html: post.excerpt }}
          />
        )}

        <div className="mt-auto">
          <Link href={`/guides/${post.slug}`} className="btn btn-ghost text-sm">
            Lesen
          </Link>
        </div>
      </div>
    </article>
  );
}
