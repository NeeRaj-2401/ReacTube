import React from "react";

const LoaderModal = () => {
  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-5 rounded-md flex items-center">
        <svg
          className="animate-spin h-8 w-8 mr-4 text-blue-500"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647zM20 12a8 8 0 01-8 8v-4a4 4 0 004.783-3.783L20 12zm-8-8a7.963 7.963 0 015.938 3h-3.875A4.002 4.002 0 0012 8V4z"
          ></path>
        </svg>
        <span className="text-gray-700">Loading...</span>
      </div>
    </div>
  );
};

export default LoaderModal;
