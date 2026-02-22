export default function ArticlesSectionSkeleton() {
  return (
    <div>
      <h1 className="text-2xl font-semibold mb-2 mt-6">Recent Articles</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index} className="bg-card rounded-lg">
            <div className="animate-pulse">
              <div className="h-48 w-full bg-zinc-800 rounded-lg"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}