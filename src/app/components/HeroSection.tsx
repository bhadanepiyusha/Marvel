import { motion } from "motion/react";
import { ChevronDown } from "lucide-react";

interface HeroSectionProps {
  accentColor: string;
  gradientFrom: string;
}

export default function HeroSection({ accentColor, gradientFrom }: HeroSectionProps) {
  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
      {/* Background Video Simulation (using animated gradient) */}
      <motion.div 
        className="absolute inset-0"
        style={{ backgroundColor: "#0A0A0F" }}
        animate={{
          backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `radial-gradient(circle at 20% 50%, ${accentColor}40 0%, transparent 50%),
                             radial-gradient(circle at 80% 50%, ${accentColor}20 0%, transparent 50%)`,
            backgroundSize: "200% 200%",
          }}
        />
      </motion.div>
      
      {/* Dark Overlay for readability (60-70%) */}
      <div 
        className="absolute inset-0"
        style={{ backgroundColor: "rgba(10, 10, 15, 0.65)" }}
      />
      
      {/* Radial Glow Behind Headline */}
      <div 
        className="absolute inset-0 opacity-40"
        style={{
          background: `radial-gradient(circle at center, ${gradientFrom}, transparent 70%)`,
        }}
      />
      
      {/* Content */}
      <motion.div 
        className="relative z-10 text-center px-8 max-w-7xl"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <motion.h1 
          className="text-[5rem] md:text-[6rem] lg:text-[7.5rem] mb-8 tracking-tight"
          style={{ 
            fontWeight: 700,
            lineHeight: 0.95,
            color: "#FFFFFF",
            textShadow: `0 0 40px ${accentColor}60, 0 4px 20px rgba(0,0,0,0.8)`,
          }}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        >
          Marvel Multiverse<br />Explorer
        </motion.h1>
        
        <motion.p 
          className="text-xl md:text-2xl mb-12 tracking-wide"
          style={{ 
            color: "#FFFFFF",
            textShadow: "0 2px 10px rgba(0,0,0,0.8)",
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          Explore Heroes • Travel the Timeline • Enter Infinite Universes
        </motion.p>
        
        {/* Two Buttons */}
        <motion.div 
          className="flex flex-col sm:flex-row items-center justify-center gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <motion.button
            className="px-12 py-4 rounded-md text-lg transition-all duration-300 min-w-[240px]"
            style={{
              backgroundColor: accentColor,
              color: "#FFFFFF",
              fontWeight: 600,
              boxShadow: `0 0 30px ${accentColor}60`,
            }}
            whileHover={{ 
              scale: 1.05,
              boxShadow: `0 0 40px ${accentColor}80`,
            }}
            whileTap={{ scale: 0.98 }}
            onClick={() => {
              document.getElementById("characters")?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            Enter the Multiverse
          </motion.button>
          
          <motion.button
            className="px-12 py-4 rounded-md text-lg transition-all duration-300 border-2 min-w-[240px]"
            style={{
              backgroundColor: "rgba(0, 0, 0, 0)",
              borderColor: accentColor,
              color: "#FFFFFF",
              fontWeight: 600,
            }}
            whileHover={{ 
              scale: 1.05,
              backgroundColor: `${accentColor}20`,
              boxShadow: `0 0 30px ${accentColor}40`,
            }}
            whileTap={{ scale: 0.98 }}
            onClick={() => {
              document.getElementById("characters")?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            Explore Heroes
          </motion.button>
        </motion.div>
      </motion.div>
      
      {/* Scroll Indicator */}
      <motion.div 
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
      >
        <span 
          className="text-sm tracking-widest"
          style={{ 
            color: "#FFFFFF",
            textShadow: "0 2px 8px rgba(0,0,0,0.8)",
          }}
        >
          SCROLL
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown size={24} color="#FFFFFF" />
        </motion.div>
      </motion.div>
    </section>
  );
}