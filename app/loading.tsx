export default function HomeLoading() {
  return (
    <div>
      <div className="bg-gradient-to-br from-emerald-500 to-teal-600 py-16 px-4">
        <div className="max-w-5xl mx-auto text-center space-y-4">
          <div className="h-10 w-72 bg-white/20 rounded-xl mx-auto animate-pulse" />
          <div className="h-5 w-96 bg-white/20 rounded-lg mx-auto animate-pulse" />
          <div className="h-10 w-40 bg-white/30 rounded-full mx-auto animate-pulse" />
        </div>
      </div>
      <div className="max-w-5xl mx-auto px-4 py-12">
        <div className="h-6 w-40 bg-gray-200 rounded mb-6 animate-pulse" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="bg-white rounded-2xl border border-gray-100 overflow-hidden animate-pulse">
              <div className="aspect-square bg-gray-100" />
              <div className="p-4 space-y-2">
                <div className="h-3 w-16 bg-gray-100 rounded" />
                <div className="h-4 w-full bg-gray-100 rounded" />
                <div className="h-4 w-2/3 bg-gray-100 rounded" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
