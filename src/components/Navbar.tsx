import { Menu, Sparkles, X } from "lucide-react";
import { SetStateAction, useState } from "react";

interface NavbarProps {
  setShowGenerator: React.Dispatch<SetStateAction<boolean>>;
}

const NavBar: React.FC<NavbarProps> = ({ setShowGenerator }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
            <button
              onClick={() => setShowGenerator(true)}
              className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg font-medium hover:opacity-90 transition-opacity"
            >
              Try Now
            </button>
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
            <button
              onClick={() => {
                setShowGenerator(true);
                setMobileMenuOpen(false);
              }}
              className="w-full px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg font-medium hover:opacity-90 transition-opacity"
            >
              Try Now
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
