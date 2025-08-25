

"use client";

export default function GuidesError({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <main className="mx-auto w-full max-w-3xl px-4 py-8">
      <h1 className="font-serif text-2xl font-bold">Uups – da ging was schief.</h1>
      <p className="mt-2 text-neutral-600">{error.message}</p>
      <button
        onClick={reset}
        className="mt-4 rounded border px-4 py-2 text-sm"
        aria-label="Erneut versuchen"
      >
        Erneut versuchen
      </button>
    </main>
  );
}
