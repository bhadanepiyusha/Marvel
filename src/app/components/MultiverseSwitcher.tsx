import { motion } from "motion/react";
import { universeThemes, Universe } from "../data/marvelData";

interface MultiverseSwitcherProps {
  currentUniverse: Universe;
  onUniverseChange: (universe: Universe) => void;
}

export default function MultiverseSwitcher({ currentUniverse, onUniverseChange }: MultiverseSwitcherProps) {
  return (
    <section className="py-24 px-8" style={{ backgroundColor: "#14141C" }}>
      <div className="max-w-7xl mx-auto">
        <motion.h2 
          className="text-5xl md:text-6xl mb-8 text-center"
          style={{ fontWeight: 700, color: "#FFFFFF" }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          Choose Your Universe
        </motion.h2>
        
        <motion.p 
          className="text-xl text-center mb-16 max-w-2xl mx-auto"
          style={{ color: "#B3B3B3" }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Experience different realities across the Marvel Multiverse. Each universe brings its own unique atmosphere and heroes.
        </motion.p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {universeThemes.map((universe, index) => {
            const isActive = currentUniverse === universe.id;
            
            return (
              <motion.button
                key={universe.id}
                className="relative p-8 rounded-lg overflow-hidden text-left transition-all duration-500"
                style={{
                  backgroundColor: "#151520",
                  border: isActive ? `3px solid ${universe.accentColor}` : "3px solid transparent",
                }}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ 
                  scale: 1.05,
                  transition: { duration: 0.3 }
                }}
                onClick={() => onUniverseChange(universe.id)}
              >
                {/* Background Gradient */}
                <motion.div 
                  className="absolute inset-0 opacity-30"
                  style={{
                    background: `radial-gradient(circle at center, ${universe.gradientFrom}, transparent 70%)`,
                  }}
                  animate={{
                    opacity: isActive ? 0.5 : 0.2,
                  }}
                  transition={{ duration: 0.5 }}
                />
                
                {/* Content */}
                <div className="relative z-10">
                  <div 
                    className="text-4xl mb-4"
                    style={{ 
                      fontWeight: 700,
                      color: isActive ? universe.accentColor : "#FFFFFF",
                    }}
                  >
                    {universe.name}
                  </div>
                  
                  {isActive && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="inline-block px-4 py-2 rounded-full text-sm"
                      style={{
                        backgroundColor: `${universe.accentColor}20`,
                        color: universe.accentColor,
                        fontWeight: 600,
                      }}
                    >
                      ACTIVE
                    </motion.div>
                  )}
                </div>
                
                {/* Glow Effect on Active */}
                {isActive && (
                  <motion.div 
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      boxShadow: `inset 0 0 40px ${universe.accentColor}40`,
                    }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                  />
                )}
              </motion.button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
