// src/app/page.tsx
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-[70vh] flex items-center justify-center text-white px-4">
      <div className="max-w-3xl w-full text-center space-y-6">
        <h1 className="text-4xl font-semibold">Bio-Lieferdienste in deiner Nähe finden</h1>
        <p className="text-white/70">
          Neutraler Überblick über Bio-Lieferservices in Deutschland, Österreich und der Schweiz.
        </p>

        {/* Simple GET-Form → /lieferdienste?q=...&land=... */}
        <form action="/lieferdienste" method="GET" className="flex gap-2 justify-center">
          <input
            type="text"
            name="q"
            placeholder="Stadt oder Anbieter (z. B. Berlin, Biokiste...)"
            className="w-full max-w-md px-3 py-2 rounded-lg text-slate-900"
          />
          <select name="land" className="px-3 py-2 rounded-lg text-slate-900">
            <option value="">Land</option>
            <option value="DE">DE</option>
            <option value="AT">AT</option>
            <option value="CH">CH</option>
          </select>
          <button className="px-4 py-2 rounded-lg bg-white/90 text-slate-900">Suchen</button>
        </form>

        <div className="text-sm text-white/70">
          Oder direkt:{" "}
          <div className="inline-flex gap-2">
            {["Berlin", "München", "Hamburg", "Köln", "Zürich", "Wien"].map((r) => (
              <Link
                key={r}
                href={`/lieferdienste?q=${encodeURIComponent(r)}`}
                className="underline hover:no-underline"
              >
                {r}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <Link
            href="/lieferdienste"
            className="inline-block mt-6 px-4 py-2 rounded-lg bg-white/90 text-slate-900"
          >
            Zur Liste
          </Link>
        </div>
      </div>
    </main>
  );
}
