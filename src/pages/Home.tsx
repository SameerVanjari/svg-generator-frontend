import React from "react";
import { Sparkles, ArrowRight, Palette, Zap, Download } from "lucide-react";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();
  const features = [
    {
      icon: <Palette className="w-5 h-5" />,
      title: "AI-Powered Design",
      description:
        "Transform text descriptions into beautiful vector icons using advanced AI technology. Our system understands natural language and converts your ideas into clean, professional SVG icons.",
    },
    {
      icon: <Zap className="w-5 h-5" />,
      title: "Instant Generation",
      description:
        "Get your custom icons in seconds, no design skills required. Skip the lengthy design process and complex software - just describe what you want and get instant results.",
    },
    {
      icon: <Download className="w-5 h-5" />,
      title: "SVG Download",
      description:
        "Download your icons in SVG format for perfect scaling at any size. Use them in your websites, apps, or design projects with complete flexibility and crisp rendering.",
    },
  ];

  const exampleIcons = [
    // Rocket Launch Icon
    '<svg viewBox="0 0 24 24" width="100%" height="100%"><path d="M12 2L9 7l3 3 3-3-3-5zm0 8l-3 8h6l-3-8z" stroke="currentColor" fill="none" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M8 15a6 6 0 00-3 5M16 15a6 6 0 013 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><path d="M6 20c1-1 3-1 6-1s5 0 6 1" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>',

    // Abstract Wave Pattern
    '<svg viewBox="0 0 24 24" width="100%" height="100%"><path d="M2 12s2-3 5-3 5 3 7 3 5-3 8-3" stroke="currentColor" fill="none" stroke-width="1.5" stroke-linecap="round"/><path d="M2 8s2-3 5-3 5 3 7 3 5-3 8-3" stroke="currentColor" fill="none" stroke-width="1.5" stroke-linecap="round" opacity="0.5"/><path d="M2 16s2-3 5-3 5 3 7 3 5-3 8-3" stroke="currentColor" fill="none" stroke-width="1.5" stroke-linecap="round" opacity="0.5"/></svg>',

    // Geometric Mountain Landscape
    '<svg viewBox="0 0 24 24" width="100%" height="100%"><path d="M2 18l5-5 3 3 4-4 3 3 5-5v8H2z" stroke="currentColor" fill="none" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><circle cx="19" cy="7" r="2" stroke="currentColor" fill="none" stroke-width="1.5"/><path d="M7 8l10 10M17 8l-10 10" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" opacity="0.2"/></svg>',
  ];

  return (
    <div>
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center pt-32 pb-16">
          <div className="flex items-center justify-center gap-3 mb-6">
            <Sparkles className="w-12 h-12 text-purple-400" />
            <h1 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
              AI Vector Icon Generator
            </h1>
          </div>
          <p className="text-xl text-gray-300 mb-4 max-w-2xl mx-auto">
            Transform your ideas into beautiful vector icons instantly using the
            power of AI. Create unique, scalable icons with just a text
            description.
          </p>
          <button
            onClick={() => navigate("/image-gen")}
            className="px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg font-medium text-lg hover:opacity-90 transition-all transform hover:scale-105 flex items-center gap-2 mx-auto"
          >
            Try it now <ArrowRight className="w-5 h-5" />
          </button>
        </div>
        {/* Example Icons and Features sections */}

        {/* Example Icons */}
        <div id="examples" className="py-20">
          <h2 className="text-3xl font-bold text-center mb-4">
            See it in Action
          </h2>
          <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
            Our AI understands natural language and generates professional
            vector icons. Here are some examples of what you can create.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {exampleIcons.map((icon, index) => (
              <div
                key={index}
                className="backdrop-blur-xl bg-white/5 rounded-2xl p-8 border border-white/10 flex flex-col items-center transform hover:scale-105 transition-transform"
              >
                <div
                  className="w-24 h-24 mb-4"
                  dangerouslySetInnerHTML={{ __html: icon }}
                />
                <div className="text-center text-gray-400">
                  {index === 0 && "Rocket Launch"}
                  {index === 1 && "Abstract Waves"}
                  {index === 2 && "Mountain Scene"}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Features */}
        <div id="features" className="py-20">
          <h2 className="text-3xl font-bold text-center mb-4">
            Why Choose IconAI?
          </h2>
          <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
            Create custom icons in seconds with our advanced AI technology. No
            design skills required.
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="backdrop-blur-xl bg-white/5 rounded-xl p-6 border border-white/10"
              >
                <div className="text-purple-400 mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Pricing Section */}
        <div id="pricing" className="py-20">
          <h2 className="text-3xl font-bold text-center mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
            Start creating custom icons today with our flexible pricing plans.
          </p>
          <div className="max-w-lg mx-auto backdrop-blur-xl bg-white/5 rounded-2xl p-8 border border-white/10 text-center">
            <h3 className="text-2xl font-bold mb-2">Free Beta Access</h3>
            <p className="text-gray-400 mb-6">
              We're currently in beta! Try our service completely free.
            </p>
            <button
              onClick={() => navigate("/image-gen")}
              className="px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg font-medium hover:opacity-90 transition-opacity w-full"
            >
              Start Creating Icons
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
