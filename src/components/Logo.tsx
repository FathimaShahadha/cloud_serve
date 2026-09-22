import React from 'react';
interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}
export function Logo({ size = 'md', className = '' }: LogoProps) {
  const sizeClasses = {
    sm: 'h-6',
    md: 'h-8',
    lg: 'h-12'
  };
  const textClasses = {
    sm: 'text-lg',
    md: 'text-2xl',
    lg: 'text-4xl'
  };
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <svg
        viewBox="0 0 100 100"
        className={`${sizeClasses[size]} text-primary`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg">
        
        {/* Cloud Base */}
        <path
          d="M25 65C16.7157 65 10 58.2843 10 50C10 41.7157 16.7157 35 25 35C26.3533 35 27.6647 35.1794 28.9135 35.5126C31.5791 23.8967 41.979 15 54.5 15C69.6878 15 82 27.3122 82 42.5C82 43.1495 81.9775 43.7938 81.9335 44.432C87.3195 46.5168 91 51.8159 91 58C91 65.732 84.732 72 77 72H25V65Z"
          fill="currentColor" />
        
        {/* Wrench/Service Element */}
        <path
          d="M65 45L45 65M65 45C67.7614 45 70 42.7614 70 40C70 37.2386 67.7614 35 65 35C62.2386 35 60 37.2386 60 40C60 40.8525 60.2133 41.6552 60.5876 42.3536L42.3536 60.5876C41.6552 60.2133 40.8525 60 40 60C37.2386 60 35 62.2386 35 65C35 67.7614 37.2386 70 40 70C42.7614 70 45 67.7614 45 65C45 64.1475 44.7867 63.3448 44.4124 62.6464L62.6464 44.4124C63.3448 44.7867 64.1475 45 65 45Z"
          stroke="#0891B2"
          strokeWidth="6"
          strokeLinecap="round"
          strokeLinejoin="round" />
        
      </svg>
      <span
        className={`font-bold tracking-tight text-primary ${textClasses[size]}`}>
        
        Cloud<span className="text-secondary">Serve</span>
      </span>
    </div>);

}