import React, { useEffect, useState } from 'react';

interface LoadingProgressProps {
  onComplete: () => void;
}

function LoadingProgress({ onComplete }: LoadingProgressProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(onComplete, 500);
          return 100;
        }
        return prev + 2;
      });
    }, 50);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center">
      <div className="text-center space-y-6">
        <img 
          src="https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
          alt="Fish"
          className="w-24 h-24 mx-auto rounded-full object-cover shadow-lg mb-4"
        />
        <div className="relative w-64 h-2 bg-blue-100 rounded-full overflow-hidden">
          <div 
            className="absolute top-0 left-0 h-full bg-blue-600 transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="text-lg font-semibold text-blue-900">
          Loading Aqua Attract...
        </p>
      </div>
    </div>
  );
}

export default LoadingProgress;