export default function LoadingGuides() {
    return (
      <main className="mx-auto w-full max-w-7xl px-4 py-8">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="animate-pulse rounded-2xl border p-4">
              <div className="mb-3 aspect-[16/9] w-full rounded-xl bg-neutral-200" />
              <div className="h-4 w-3/4 rounded bg-neutral-200" />
              <div className="mt-2 h-3 w-5/6 rounded bg-neutral-200" />
            </div>
          ))}
        </div>
      </main>
    );
  }
  
  