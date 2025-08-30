"use client";
import React, { useEffect, useState } from "react";

interface LoaderProps {
  duration?: number; // duration in ms for full progress
}

const Loader: React.FC<LoaderProps> = ({ duration = 2000 }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let start: number | null = null;

    const animate = (timestamp: number) => {
      if (!start) start = timestamp;
      const elapsed = timestamp - start;
      const percentage = Math.min((elapsed / duration) * 100, 100);
      setProgress(percentage);

      if (percentage < 100) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [duration]);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[#0d0f1a]/80 z-50">
      <div className="w-72 h-2 bg-[#11151c] rounded-full overflow-hidden">
        <div
          className="h-2 bg-[#08a015] rounded-full transition-all duration-200 ease-out"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  );
};

export default Loader;
