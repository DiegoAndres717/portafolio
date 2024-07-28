'use client';
import React from "react";

interface AppointmentSkeletonProps {
  lines?: number; 
}

const AppointmentSkeleton: React.FC<AppointmentSkeletonProps> = ({ lines = 2 }) => (
  <div className="flex flex-col items-center bg-white rounded-lg shadow-md p-4 animate-pulse">
    {[...Array(lines)].map((_, index) => (
      <div key={index} className="h-4 bg-gray-200 rounded w-full mb-2"></div>
    ))}
  </div>
);

export default AppointmentSkeleton;