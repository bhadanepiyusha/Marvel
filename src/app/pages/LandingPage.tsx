import { motion } from "motion/react";
import { useNavigate, useOutletContext } from "react-router";
import { ArrowRight, Star } from "lucide-react";

interface OutletContext {
  accentColor: string;
  gradientFrom: string;
}

export default function LandingPage() {
  const navigate = useNavigate();
  const { accentColor } = useOutletContext<OutletContext>();

  const heroCards = [
    {
      name: "Doctor Strange",
      subtitle: "Sorcerer Supreme",
      imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNP2hjad8CzKlo5z9j0CokguQCsxHmcNfr8uq4PS8M2Q&s=10",
      tags: ["Magic", "Multiverse"],
      type: "Hero",
    },
    {
      name: "Hulk",
      subtitle: "The Strongest Avenger",
      imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRVidyXiZ_lYPY61lrr8dG3f1cqnPhq3IwsEDGqrmT4RQ&s=10",
      tags: ["Power", "Rage"],
      type: "Hero",
    },
    {
      name: "Captain America",
      subtitle: "The First Avenger",
      imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_W6xDMLVBkKmqC0rrIWWG88iCZlaB8HO8HVe3u5d0-g&s=10",
      tags: ["Leader", "Shield"],
      type: "Hero",
    },
    {
      name: "Black Panther",
      subtitle: "King of Wakanda",
      imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShrLJF4ljn17kGf_Y8yseNU8ZcTH0GF7Ojt5Qkrqdoow&s=10",
      tags: ["Vibranium", "Royalty"],
      type: "Hero",
    },
    {
      name: "Captain Marvel",
      subtitle: "Earth's Mightiest Hero",
      imageUrl: "https://www.themoviedb.org/t/p/w500/AtsgWhDnHTq68L0lLsUrCnM7TjG.jpg",
      tags: ["Cosmic", "Energy"],
      type: "Hero",
    },
    {
      name: "Ant-Man",
      subtitle: "Size-Changing Hero",
      imageUrl: "https://www.themoviedb.org/t/p/w500/qGQfSCCFoknGCHKH1S3dUNhGiuP.jpg",
      tags: ["Quantum", "Shrink"],
      type: "Hero",
    },
  ];

  const stats = [
    { label: "Characters", value: "900+" },
    { label: "Films", value: "30+" },
    { label: "Legacy", value: "80yr" },
  ];

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#0a0a0a" }}>
      {/* Hero Section - Full Width Split Layout */}
      <section className="relative min-h-screen w-full overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0">
          {/* Background Image */}
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: "url(https://images.unsplash.com/photo-1612036781124-62776b2a3eb5?w=1600&q=80)",
            }}
          />
          
          {/* Dark Overlay */}
          <div 
            className="absolute inset-0"
            style={{ 
              backgroundColor: "rgba(10, 10, 15, 0.75)",
            }}
          />
          
          {/* Animated Grid Lines */}
          <div 
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: "linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)",
              backgroundSize: "60px 60px",
            }}
          />
          
          {/* Red Radial Glow */}
          <div 
            className="absolute inset-0"
            style={{
              background: "radial-gradient(circle at 75% 50%, rgba(229, 24, 27, 0.15), transparent 50%)",
            }}
          />
        </div>

        {/* Main Content Container */}
        <div className="relative z-10 max-w-[1400px] mx-auto px-6 py-20 min-h-screen flex items-center">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 w-full">
            
            {/* LEFT COLUMN - Content */}
            <div className="flex flex-col justify-center">
              {/* Eyebrow Text */}
              <motion.div
                className="flex items-center gap-4 mb-6"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div 
                  className="w-12 h-[2px]"
                  style={{ backgroundColor: "#F5C518" }}
                />
                <span 
                  className="text-sm tracking-[0.2em] uppercase"
                  style={{ 
                    color: "#F5C518",
                    fontWeight: 600,
                    letterSpacing: "0.2em",
                  }}
                >
                  Welcome to the MCU
                </span>
              </motion.div>

              {/* Large Display Headline */}
              <motion.div
                className="mb-8"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <h1 className="leading-none">
                  {/* Line 1 - Outlined/Ghost Text */}
                  <div 
                    className="text-7xl md:text-8xl lg:text-9xl mb-2"
                    style={{
                      fontFamily: "'Bebas Neue', 'Anton', sans-serif",
                      fontWeight: 900,
                      color: "transparent",
                      WebkitTextStroke: "2px rgba(255,255,255,0.3)",
                      letterSpacing: "0.02em",
                    }}
                  >
                    EXPLORE
                  </div>
                  
                  {/* Line 2 - Bold Red */}
                  <div 
                    className="text-7xl md:text-8xl lg:text-9xl mb-2"
                    style={{
                      fontFamily: "'Bebas Neue', 'Anton', sans-serif",
                      fontWeight: 900,
                      color: "#E5181B",
                      letterSpacing: "0.02em",
                      textShadow: "0 0 40px rgba(229, 24, 27, 0.5)",
                    }}
                  >
                    MARVEL
                  </div>
                  
                  {/* Line 3 - White */}
                  <div 
                    className="text-7xl md:text-8xl lg:text-9xl"
                    style={{
                      fontFamily: "'Bebas Neue', 'Anton', sans-serif",
                      fontWeight: 900,
                      color: "#f0eee8",
                      letterSpacing: "0.02em",
                    }}
                  >
                    UNIVERSE
                  </div>
                </h1>
              </motion.div>

              {/* Body Paragraph */}
              <motion.p
                className="text-base md:text-lg mb-10 max-w-[380px]"
                style={{
                  color: "rgba(255,255,255,0.5)",
                  lineHeight: "1.8",
                }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                Dive into the complete cinematic saga of Earth's Mightiest Heroes. 
                Explore iconic characters, legendary battles, and the multiverse beyond.
              </motion.p>

              {/* CTA Buttons */}
              <motion.div
                className="flex flex-wrap gap-4 mb-12"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                {/* Primary Button - Red with Angled Corner */}
                <button
                  className="px-8 py-4 text-base font-semibold transition-all duration-300 hover:shadow-lg"
                  style={{
                    backgroundColor: "#E5181B",
                    color: "#ffffff",
                    clipPath: "polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 0 100%)",
                    boxShadow: "0 4px 20px rgba(229, 24, 27, 0.4)",
                  }}
                  onClick={() => navigate("/heroes")}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = "0 8px 30px rgba(229, 24, 27, 0.6)";
                    e.currentTarget.style.transform = "translateY(-2px)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = "0 4px 20px rgba(229, 24, 27, 0.4)";
                    e.currentTarget.style.transform = "translateY(0)";
                  }}
                >
                  Explore Heroes
                </button>

                {/* Secondary Button - Ghost/Outlined */}
                <button
                  className="px-8 py-4 text-base font-semibold transition-all duration-300 border-2"
                  style={{
                    backgroundColor: "transparent",
                    borderColor: "rgba(255,255,255,0.3)",
                    color: "#ffffff",
                  }}
                  onClick={() => navigate("/timeline")}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "#ffffff";
                    e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.05)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "rgba(255,255,255,0.3)";
                    e.currentTarget.style.backgroundColor = "transparent";
                  }}
                >
                  View Timeline
                </button>
              </motion.div>

              {/* Stats Row */}
              <motion.div
                className="flex gap-12"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
              >
                {stats.map((stat, index) => (
                  <div key={index}>
                    <div 
                      className="text-4xl md:text-5xl mb-1"
                      style={{
                        fontFamily: "'Bebas Neue', sans-serif",
                        fontWeight: 700,
                        color: "#E5181B",
                      }}
                    >
                      {stat.value}
                    </div>
                    <div 
                      className="text-xs uppercase tracking-wider"
                      style={{
                        color: "rgba(255,255,255,0.5)",
                      }}
                    >
                      {stat.label}
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* RIGHT COLUMN - Image Grid */}
            <div className="flex items-center justify-center lg:justify-end">
              <motion.div
                className="relative w-full max-w-[600px]"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 0.3 }}
              >
                {/* Asymmetric 2×3 Grid */}
                <div className="grid grid-cols-2 gap-4 auto-rows-[180px]">
                  {/* Tall Card - Spanning 2 rows */}
                  <motion.div
                    className="relative rounded-lg overflow-hidden row-span-2 group cursor-pointer border-2"
                    style={{ 
                      backgroundColor: "#151520",
                      borderColor: "rgba(229, 24, 27, 0)",
                    }}
                    whileHover={{ 
                      borderColor: "rgba(229, 24, 27, 1)",
                      scale: 1.02,
                    }}
                    transition={{ duration: 0.3 }}
                    onClick={() => navigate("/heroes")}
                  >
                    <div 
                      className="absolute inset-0 bg-cover bg-center"
                      style={{
                        backgroundImage: `url(${heroCards[0].imageUrl})`,
                        objectFit: "cover",
                      }}
                    />
                    <div 
                      className="absolute inset-0"
                      style={{
                        background: "linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.2) 50%, transparent 100%)",
                      }}
                    />
                    <div className="absolute top-3 right-3">
                      <span 
                        className="px-2 py-1 text-xs rounded"
                        style={{
                          backgroundColor: "rgba(229, 24, 27, 0.9)",
                          color: "#ffffff",
                        }}
                      >
                        {heroCards[0].type}
                      </span>
                    </div>
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 
                        className="text-xl font-bold mb-1"
                        style={{ color: "#ffffff" }}
                      >
                        {heroCards[0].name}
                      </h3>
                      <p 
                        className="text-sm mb-2"
                        style={{ color: "rgba(255,255,255,0.7)" }}
                      >
                        {heroCards[0].subtitle}
                      </p>
                      <div className="flex gap-2 mb-2">
                        {heroCards[0].tags.map((tag, i) => (
                          <span 
                            key={i}
                            className="text-xs px-2 py-0.5 rounded"
                            style={{
                              backgroundColor: "rgba(255,255,255,0.1)",
                              color: "rgba(255,255,255,0.8)",
                            }}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <span 
                        className="text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center gap-1"
                        style={{ color: "#F5C518" }}
                      >
                        View Profile <ArrowRight size={12} />
                      </span>
                    </div>
                  </motion.div>

                  {/* Top Right Card */}
                  <motion.div
                    className="relative rounded-lg overflow-hidden group cursor-pointer border-2"
                    style={{ 
                      backgroundColor: "#151520",
                      borderColor: "rgba(229, 24, 27, 0)",
                    }}
                    whileHover={{ 
                      borderColor: "rgba(229, 24, 27, 1)",
                      scale: 1.02,
                    }}
                    transition={{ duration: 0.3 }}
                    onClick={() => navigate("/heroes")}
                  >
                    <div 
                      className="absolute inset-0 bg-cover bg-center"
                      style={{
                        backgroundImage: `url(${heroCards[1].imageUrl})`,
                        objectFit: "cover",
                      }}
                    />
                    <div 
                      className="absolute inset-0"
                      style={{
                        background: "linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.2) 50%, transparent 100%)",
                      }}
                    />
                    <div className="absolute top-3 right-3">
                      <span 
                        className="px-2 py-1 text-xs rounded"
                        style={{
                          backgroundColor: "rgba(229, 24, 27, 0.9)",
                          color: "#ffffff",
                        }}
                      >
                        {heroCards[1].type}
                      </span>
                    </div>
                    <div className="absolute bottom-3 left-3 right-3">
                      <h3 
                        className="text-base font-bold mb-1"
                        style={{ color: "#ffffff" }}
                      >
                        {heroCards[1].name}
                      </h3>
                      <p 
                        className="text-xs"
                        style={{ color: "rgba(255,255,255,0.7)" }}
                      >
                        {heroCards[1].subtitle}
                      </p>
                    </div>
                  </motion.div>

                  {/* Middle Right Card */}
                  <motion.div
                    className="relative rounded-lg overflow-hidden group cursor-pointer border-2"
                    style={{ 
                      backgroundColor: "#151520",
                      borderColor: "rgba(229, 24, 27, 0)",
                    }}
                    whileHover={{ 
                      borderColor: "rgba(229, 24, 27, 1)",
                      scale: 1.02,
                    }}
                    transition={{ duration: 0.3 }}
                    onClick={() => navigate("/heroes")}
                  >
                    <div 
                      className="absolute inset-0 bg-cover bg-center"
                      style={{
                        backgroundImage: `url(${heroCards[2].imageUrl})`,
                        objectFit: "cover",
                      }}
                    />
                    <div 
                      className="absolute inset-0"
                      style={{
                        background: "linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.2) 50%, transparent 100%)",
                      }}
                    />
                    <div className="absolute top-3 right-3">
                      <span 
                        className="px-2 py-1 text-xs rounded"
                        style={{
                          backgroundColor: "rgba(229, 24, 27, 0.9)",
                          color: "#ffffff",
                        }}
                      >
                        {heroCards[2].type}
                      </span>
                    </div>
                    <div className="absolute bottom-3 left-3 right-3">
                      <h3 
                        className="text-base font-bold mb-1"
                        style={{ color: "#ffffff" }}
                      >
                        {heroCards[2].name}
                      </h3>
                      <p 
                        className="text-xs"
                        style={{ color: "rgba(255,255,255,0.7)" }}
                      >
                        {heroCards[2].subtitle}
                      </p>
                    </div>
                  </motion.div>

                  {/* Bottom Wide Card - Spanning full width */}
                  <motion.div
                    className="relative rounded-lg overflow-hidden col-span-2 group cursor-pointer border-2"
                    style={{ 
                      backgroundColor: "#151520",
                      borderColor: "rgba(229, 24, 27, 0)",
                    }}
                    whileHover={{ 
                      borderColor: "rgba(229, 24, 27, 1)",
                      scale: 1.02,
                    }}
                    transition={{ duration: 0.3 }}
                    onClick={() => navigate("/heroes")}
                  >
                    <div 
                      className="absolute inset-0 bg-cover bg-center"
                      style={{
                        backgroundImage: `url(${heroCards[3].imageUrl})`,
                        objectFit: "cover",
                      }}
                    />
                    <div 
                      className="absolute inset-0"
                      style={{
                        background: "linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.2) 50%, transparent 100%)",
                      }}
                    />
                    <div className="absolute top-3 right-3">
                      <span 
                        className="px-2 py-1 text-xs rounded"
                        style={{
                          backgroundColor: "rgba(229, 24, 27, 0.9)",
                          color: "#ffffff",
                        }}
                      >
                        {heroCards[3].type}
                      </span>
                    </div>
                    <div className="absolute bottom-3 left-3 right-3">
                      <h3 
                        className="text-base font-bold mb-1"
                        style={{ color: "#ffffff" }}
                      >
                        {heroCards[3].name}
                      </h3>
                      <p 
                        className="text-xs"
                        style={{ color: "rgba(255,255,255,0.7)" }}
                      >
                        {heroCards[3].subtitle}
                      </p>
                    </div>
                  </motion.div>
                </div>

                {/* Diagonal Red Slash Accent */}
                <div 
                  className="absolute top-1/2 left-1/2 w-1 h-64 -rotate-45 pointer-events-none"
                  style={{
                    backgroundColor: "#E5181B",
                    opacity: 0.3,
                    transform: "translate(-50%, -50%) rotate(-45deg)",
                  }}
                />
              </motion.div>
            </div>
          </div>
        </div>


        {/* Scroll Indicator - Bottom Left */}
        <motion.div
          className="absolute bottom-12 left-12 flex items-center gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
        >
          <motion.div
            className="w-[2px] h-16"
            style={{ backgroundColor: "#E5181B" }}
            animate={{ scaleY: [1, 1.5, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
          <span 
            className="text-xs tracking-[0.2em] uppercase rotate-90 origin-left"
            style={{ color: "rgba(255,255,255,0.5)" }}
          >
            Scroll to explore
          </span>
        </motion.div>
      </section>
    </div>
  );
}