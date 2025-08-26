import Link from "next/link";
import { getGuides } from "@/lib/wp";
import GuideSlider from "@/components/GuideSlider";

export default async function GuidesRow({ showHeading = true }: { showHeading?: boolean }) {
  const posts = await getGuides(9); // 1/2/3 Cards sichtbar
  if (!posts?.length) return null;

  return (
    <section
      data-scope="guides-row"
      className="relative z-10 mx-auto w-full max-w-7xl px-4 py-6 overflow-hidden"
    >
      {showHeading && (
        <header className="mb-3 flex items-end justify-between">
          <h2 className="font-serif text-xl font-bold">Guides & Ratgeber</h2>
          <Link href="/guides" className="text-sm underline">
            Alle ansehen
          </Link>
        </header>
      )}
      <GuideSlider posts={posts} />
    </section>
  );
}
