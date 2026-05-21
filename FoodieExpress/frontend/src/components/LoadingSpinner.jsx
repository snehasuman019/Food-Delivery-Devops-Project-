import React from 'react';

const LoadingSpinner = ({ fullScreen = false }) => {
  const spinnerContent = (
    <div className="flex flex-col items-center justify-center space-y-4">
      {/* Outer animated ring */}
      <div className="relative w-16 h-16">
        <div className="absolute inset-0 rounded-full border-4 border-t-[#FF6B35] border-r-transparent border-b-transparent border-l-transparent animate-spin"></div>
        <div className="absolute inset-2 rounded-full border-4 border-b-[#E63946] border-t-transparent border-r-transparent border-l-transparent animate-spin [animation-direction:reverse] [animation-duration:1.5s]"></div>
        <div className="absolute inset-4 rounded-full border-4 border-l-[#FFB703] border-t-transparent border-r-transparent border-b-transparent animate-pulse"></div>
      </div>
      
      {/* Text label */}
      <p className="text-lg font-semibold tracking-wider bg-gradient-to-r from-[#FF6B35] to-[#E63946] bg-clip-text text-transparent animate-pulse">
        Cooking up your experience...
      </p>
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-50/80 dark:bg-slate-950/80 backdrop-blur-md">
        {spinnerContent}
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center p-8 w-full">
      {spinnerContent}
    </div>
  );
};

export default LoadingSpinner;
