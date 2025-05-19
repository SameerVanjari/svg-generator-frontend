import React from "react";
import { Link } from "react-router-dom";

const NotFound404: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-6 bg-gray-100">
      <h1 className="text-6xl font-bold text-red-500">404</h1>
      <p className="mt-4 text-lg text-gray-700">
        Oops! The page you're looking for doesn't exist.
      </p>
      <Link
        to="/"
        className="px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg font-medium text-lg hover:opacity-90 transition-all transform hover:scale-105 flex items-center gap-2 mx-auto"
      >
        Go Back Home
      </Link>
    </div>
  );
};

export default NotFound404;
