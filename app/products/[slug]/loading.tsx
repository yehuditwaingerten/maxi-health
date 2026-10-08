export default function ProductLoading() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden md:flex animate-pulse">
        <div className="w-full md:w-72 h-64 bg-gray-100 shrink-0" />
        <div className="p-6 flex flex-col gap-4 flex-1">
          <div className="h-3 w-20 bg-gray-100 rounded" />
          <div className="h-6 w-3/4 bg-gray-200 rounded" />
          <div className="space-y-2">
            <div className="h-4 w-full bg-gray-100 rounded" />
            <div className="h-4 w-5/6 bg-gray-100 rounded" />
            <div className="h-4 w-4/6 bg-gray-100 rounded" />
          </div>
          <div className="mt-auto flex items-center justify-between pt-4 border-t border-gray-100">
            <div className="h-8 w-20 bg-gray-200 rounded" />
            <div className="h-10 w-32 bg-gray-100 rounded-xl" />
          </div>
        </div>
      </div>
    </div>
  );
}
