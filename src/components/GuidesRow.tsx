// src/components/GuidesRow.tsx
import Link from "next/link";
import { getGuides } from "@/lib/wp";
import GuideSlider from "@/components/GuideSlider";

type Props = { showHeading?: boolean };

export default async function GuidesRow({ showHeading = true }: Props) {
  const posts = await getGuides(6).catch(() => []);
  if (!posts?.length) return null;

  return (
    <section data-scope="guides-row" className="relative z-10 py-6">
      {/* exakt wie Hero/obere Bereiche */}
      <div className="mx-auto w-full max-w-7xl px-4">
        {showHeading && (
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-2xl font-extrabold text-green-900">
              Guides &amp; Ratgeber
            </h2>
            <Link
              href="/guides"
              className="inline-flex items-center rounded-xl bg-white/80 px-4 py-2 text-sm font-semibold text-green-900 shadow hover:bg-white"
            >
              Alle Guides
            </Link>
          </div>
        )}
        <GuideSlider posts={posts} />
      </div>
    </section>
  );
}
