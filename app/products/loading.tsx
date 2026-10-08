function SkeletonCard() {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden animate-pulse">
      <div className="aspect-square bg-gray-100" />
      <div className="p-4 space-y-2">
        <div className="h-3 w-16 bg-gray-100 rounded" />
        <div className="h-4 w-full bg-gray-100 rounded" />
        <div className="h-4 w-2/3 bg-gray-100 rounded" />
        <div className="flex justify-between pt-2">
          <div className="h-5 w-12 bg-gray-100 rounded" />
          <div className="h-7 w-20 bg-gray-100 rounded-lg" />
        </div>
      </div>
    </div>
  );
}

export default function ProductsLoading() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <div className="h-7 w-36 bg-gray-200 rounded mb-2 animate-pulse" />
      <div className="h-4 w-24 bg-gray-100 rounded mb-8 animate-pulse" />
      <div className="h-4 w-20 bg-emerald-100 rounded mb-4 animate-pulse" />
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)}
      </div>
    </div>
  );
}
