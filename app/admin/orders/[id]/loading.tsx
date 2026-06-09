export default function AdminOrderDetailLoading() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-10 animate-pulse">
      <div className="h-4 w-28 bg-gray-100 rounded mb-6" />
      <div className="flex items-start justify-between mb-6">
        <div>
          <div className="h-7 w-36 bg-gray-200 rounded mb-2" />
          <div className="h-4 w-40 bg-gray-100 rounded" />
        </div>
        <div className="h-6 w-24 bg-gray-100 rounded-full" />
      </div>
      {[1, 2, 3].map((i) => (
        <div key={i} className="bg-white rounded-2xl border border-gray-100 p-5 mb-5 space-y-3">
          <div className="h-4 w-24 bg-gray-200 rounded mb-3" />
          <div className="h-4 w-full bg-gray-100 rounded" />
          <div className="h-4 w-3/4 bg-gray-100 rounded" />
          <div className="h-4 w-2/3 bg-gray-100 rounded" />
        </div>
      ))}
    </div>
  );
}
