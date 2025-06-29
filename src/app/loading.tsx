export default function Loading() {
  return (
    <div className="min-h-screen bg-[#0b0b0b] text-white font-sans px-6 pt-28 pb-28 flex flex-col items-center relative">
      {/* Skeleton header */}
      <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-full max-w-5xl px-6">
        <div className="w-full h-10 bg-[#121212] border border-[#2a2a2a] shadow-sm rounded-xl animate-pulse"></div>
      </div>

      {/* Skeleton hero */}
      <div className="text-center max-w-2xl mt-6 mb-20 w-full">
        <div className="flex flex-wrap justify-center gap-2 mb-6">
          {[1, 2, 3, 4].map((i) => (
            <div 
              key={i}
              className="bg-[#141414] h-8 w-32 rounded-full border border-[#2a2a2a] animate-pulse"
            ></div>
          ))}
        </div>
        
        {/* Skeleton heading (LCP element) */}
        <div className="h-12 bg-[#141414] rounded-lg w-3/4 mx-auto mb-4 animate-pulse"></div>
        <div className="h-4 bg-[#141414] rounded w-1/2 mx-auto animate-pulse"></div>
      </div>

      {/* Skeleton content */}
      <div className="w-full max-w-2xl space-y-6">
        <div className="h-32 bg-[#141414] rounded-xl w-full animate-pulse"></div>
        <div className="h-40 bg-[#141414] rounded-xl w-full animate-pulse"></div>
      </div>
    </div>
  );
} 