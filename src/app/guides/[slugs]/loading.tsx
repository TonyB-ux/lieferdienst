export default function LoadingGuide() {
    return (
      <main className="mx-auto w-full max-w-3xl px-4 py-8">
        <div className="h-8 w-2/3 animate-pulse rounded bg-neutral-200" />
        <div className="mt-4 aspect-[16/9] w-full animate-pulse rounded-2xl bg-neutral-200" />
        <div className="mt-6 space-y-2">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="h-3 w-full animate-pulse rounded bg-neutral-200" />
          ))}
        </div>
      </main>
    );
  }
  