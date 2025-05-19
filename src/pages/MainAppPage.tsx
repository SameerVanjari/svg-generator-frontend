import React, { useState } from "react";
import {
  Sparkles,
  Loader2,
  Home,
  Settings,
  History,
  LogOut,
} from "lucide-react";
import OutlineTracer from "../components/OutlineTracer";
import NavBar from "@/components/Navbar";

const MainAppPage = () => {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [svgUrl, setSvgUrl] = useState("");
  const [error, setError] = useState("");

  const generateIcon = async () => {
    if (!prompt.trim()) return;

    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/generate-svg`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ userinput: prompt }),
        }
      );

      const data = await response.json();
      setSvgUrl(data?.data?.images[0]?.url);
    } catch (err) {
      console.log("error => ", err);
      setError("Failed to generate icon. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen bg-gray-900">
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 border-r border-gray-700 flex flex-col">
        <nav className="flex-1 p-4 space-y-2 pt-20">
          <button className="flex items-center gap-3 text-white w-full p-2 rounded-lg hover:bg-purple-600/20 transition-colors">
            <Home className="w-5 h-5" />
            <span>Dashboard</span>
          </button>

          <button className="flex items-center gap-3 bg-purple-600/30 text-white w-full p-2 rounded-lg hover:bg-purple-600/40 transition-colors">
            <Sparkles className="w-5 h-5" />
            <span>Generate Icons</span>
          </button>

          <button className="flex items-center gap-3 text-gray-300 w-full p-2 rounded-lg hover:bg-purple-600/20 transition-colors">
            <History className="w-5 h-5" />
            <span>My Icons</span>
          </button>

          <button className="flex items-center gap-3 text-gray-300 w-full p-2 rounded-lg hover:bg-purple-600/20 transition-colors">
            <Settings className="w-5 h-5" />
            <span>Settings</span>
          </button>
        </nav>

        <div className="p-4 border-t border-gray-700">
          <button className="flex items-center gap-3 text-gray-300 w-full p-2 rounded-lg hover:bg-red-500/20 hover:text-red-400 transition-colors">
            <LogOut className="w-5 h-5" />
            <span>Log Out</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div
        className={`flex-1 flex flex-col overflow-hidden pt-16 transition-all duration-300`}
      >
        {/* Top header */}

        <NavBar />

        {/* Content area */}
        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-2xl mx-auto">
            <div className="backdrop-blur-xl bg-white/10 rounded-2xl p-8 shadow-xl border border-white/20">
              <div className="space-y-6">
                <div>
                  <label
                    htmlFor="prompt"
                    className="block text-sm font-medium mb-2 text-gray-300"
                  >
                    Describe your icon
                  </label>
                  <div className="flex gap-3">
                    <input
                      type="text"
                      id="prompt"
                      value={prompt}
                      onChange={(e) => setPrompt(e.target.value)}
                      placeholder="e.g., a minimalist rocket launching to space"
                      className="flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400 text-white placeholder-gray-400"
                      onKeyDown={(e) => e.key === "Enter" && generateIcon()}
                    />
                    <button
                      onClick={generateIcon}
                      disabled={loading || !prompt.trim()}
                      className="px-6 py-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg font-medium hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                    >
                      {loading ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          Generating...
                        </>
                      ) : (
                        "Generate"
                      )}
                    </button>
                  </div>
                </div>

                {error && <div className="text-red-400 text-sm">{error}</div>}

                {svgUrl && !loading && (
                  <div className="flex flex-col items-center gap-6 pt-4">
                    <div className="w-40 h-40 bg-white/5 rounded-xl p-4 flex items-center justify-center border border-white/10">
                      <img
                        src={svgUrl}
                        alt="generated image"
                        className="w-full h-full"
                      />
                    </div>
                    <OutlineTracer url={svgUrl} />

                    <div className="flex gap-3 w-full">
                      <button className="flex-1 px-4 py-2 bg-purple-500/20 text-purple-300 rounded-lg hover:bg-purple-500/30 transition-colors">
                        Download SVG
                      </button>
                      <button className="flex-1 px-4 py-2 bg-blue-500/20 text-blue-300 rounded-lg hover:bg-blue-500/30 transition-colors">
                        Save to Library
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {!svgUrl && !loading && (
              <div className="mt-8 p-6 bg-white/5 rounded-2xl border border-white/10 text-center">
                <div className="mb-4 flex justify-center">
                  <Sparkles className="w-12 h-12 text-purple-400/50" />
                </div>
                <h3 className="text-lg font-medium text-gray-200 mb-2">
                  Generate your first icon
                </h3>
                <p className="text-gray-400 text-sm">
                  Enter a description and click generate to create a custom
                  vector icon using AI.
                </p>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default MainAppPage;
