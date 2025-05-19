import { Bell, Menu, Sparkles, X } from "lucide-react";
import { useEffect, useState } from "react";
import Cookies from "js-cookie"; // Install this package if not already installed

interface NavbarProps {}

const NavBar: React.FC<NavbarProps> = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [notifications] = useState(2); // Example notification count

  useEffect(() => {
    const authToken = Cookies.get("auth_token"); // Replace "auth_token" with the actual cookie name
    setIsLoggedIn(!!authToken);
  }, []);

  // Mock user data
  const user = {
    name: "Alex Johnson",
    avatar: "/api/placeholder/32/32",
    plan: "Pro",
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-slate-900/80 border-b border-white/10">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-purple-400" />
            <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
              IconAI
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <a
              href="#features"
              className="text-gray-300 hover:text-white transition-colors"
            >
              Features
            </a>
            <a
              href="#examples"
              className="text-gray-300 hover:text-white transition-colors"
            >
              Examples
            </a>
            <a
              href="#pricing"
              className="text-gray-300 hover:text-white transition-colors"
            >
              Pricing
            </a>

            {isLoggedIn ? (
              <div className="flex items-center gap-4">
                <div className="relative">
                  <Bell className="w-6 h-6 text-gray-300 cursor-pointer hover:text-white transition-colors" />
                  {notifications > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                      {notifications}
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-3 cursor-pointer pl-4 border-l border-gray-700">
                  <img
                    src={user.avatar}
                    alt="User avatar"
                    className="w-8 h-8 rounded-full border border-purple-400"
                  />
                  <div>
                    <p className="text-sm font-medium text-white">
                      {user.name}
                    </p>
                    <p className="text-xs text-purple-400">{user.plan}</p>
                  </div>
                </div>
              </div>
            ) : (
              <button
                onClick={() => (window.location.href = "/auth/register")}
                className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg font-medium hover:opacity-90 transition-opacity"
              >
                Register
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-gray-300 hover:text-white"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden backdrop-blur-xl bg-slate-900/95 border-b border-white/10">
          <div className="px-4 py-4 space-y-4">
            <a
              href="#features"
              className="block text-gray-300 hover:text-white transition-colors"
            >
              Features
            </a>
            <a
              href="#examples"
              className="block text-gray-300 hover:text-white transition-colors"
            >
              Examples
            </a>
            <a
              href="#pricing"
              className="block text-gray-300 hover:text-white transition-colors"
            >
              Pricing
            </a>
            {isLoggedIn ? (
              <div className="flex items-center gap-3">
                <img
                  src={user.avatar}
                  alt="User avatar"
                  className="w-8 h-8 rounded-full border border-purple-400"
                />
                <div>
                  <p className="text-sm font-medium text-white">{user.name}</p>
                  <p className="text-xs text-purple-400">{user.plan}</p>
                </div>
              </div>
            ) : (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  window.location.href = "/auth/register";
                }}
                className="w-full px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg font-medium hover:opacity-90 transition-opacity"
              >
                Register
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
