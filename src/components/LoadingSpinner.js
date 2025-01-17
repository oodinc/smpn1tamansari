import React from 'react';
import { useLoading } from '../contexts/LoadingContext'; // Import the hook

const LoadingSpinner = () => {
  const { loading } = useLoading(); // Access the loading state

  if (!loading) return null; // Do not render the spinner if not loading

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-16 h-16 border-4 border-t-blue-500 border-solid rounded-full animate-spin"></div>
    </div>
  );
};

export default LoadingSpinner;
