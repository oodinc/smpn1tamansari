import React from 'react';
import { useLoading } from '../context/LoadingContext';

const LoadingSpinner = () => {
  const { isLoading } = useLoading();

  if (!isLoading) return null;

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-16 h-16 border-4 border-t-blue-500 border-solid rounded-full animate-spin"></div>
    </div>
  );
};

export default LoadingSpinner;
