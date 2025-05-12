import React from "react";
import { Outlet } from "react-router-dom";
import background from "@/assets/images/background.png"; // Ensure you have a valid image path

const AuthLayout = () => {
  return (
    <div className="relative flex h-screen w-screen bg-gradient-to-br from-slate-900 to-slate-800 text-white">
      <img
        src={background}
        alt="Auth Background"
        className="absolute inset-0 w-1/2 h-full object-cover"
      />
      <div className="absolute inset-0 bg-black/40 "></div> {/* Dark overlay */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/4 -translate-y-1/2 p-5 rounded-lg shadow-md bg-white/10 backdrop-blur-md border border-white/20 min-w-1/4 w-full max-w-md">
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;
