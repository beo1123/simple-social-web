
export default function PostDetailLoading() {
    return (
        <div className="container mx-auto p-4 max-w-2xl">
            <div className="animate-pulse space-y-4">
                <div className="h-6 bg-gray-300 rounded w-1/3"></div>
                <div className="h-48 bg-gray-200 rounded-lg"></div>
                <div className="h-4 bg-gray-300 rounded w-2/3"></div>
                <div className="h-4 bg-gray-300 rounded w-1/2"></div>
            </div>

            <div className="mt-6 animate-pulse space-y-4">
                <div className="h-5 bg-gray-300 rounded w-24"></div>
                {[...Array(3)].map((_, i) => (
                    <div key={i} className="flex space-x-3">
                        <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
                        <div className="flex-1 space-y-2">
                            <div className="h-4 bg-gray-300 rounded w-1/4"></div>
                            <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                            <div className="h-4 bg-gray-200 rounded w-full"></div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}