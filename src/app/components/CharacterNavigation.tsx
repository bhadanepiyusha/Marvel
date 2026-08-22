import { motion } from "motion/react";
import { useNavigate } from "react-router";
import { ArrowRight } from "lucide-react";
import { characters } from "../data/marvelData";

interface CharacterNavigationProps {
  accentColor: string;
}

export default function CharacterNavigation({ accentColor }: CharacterNavigationProps) {
  const navigate = useNavigate();

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Tech": return "#1F80FF";
      case "Magic": return "#FFD700";
      case "Strength": return "#00FF7F";
      case "Enhanced": return "#E10600";
      default: return "#E10600";
    }
  };

  return (
    <section id="characters" className="py-24 px-8" style={{ backgroundColor: "#0F0F14" }}>
      <div className="max-w-7xl mx-auto">
        <motion.h2 
          className="text-5xl md:text-6xl mb-16 text-center"
          style={{ fontWeight: 700, color: "#FFFFFF" }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          Choose Your Hero
        </motion.h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {characters.map((character, index) => {
            const categoryColor = getCategoryColor(character.powerCategory);
            
            return (
              <motion.div
                key={character.id}
                className="relative group cursor-pointer overflow-hidden rounded-lg"
                style={{ 
                  backgroundColor: "#151520",
                }}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ 
                  scale: 1.05,
                  transition: { duration: 0.3 }
                }}
                onClick={() => navigate(`/character/${character.id}`)}
              >
                {/* Character Image */}
<div className="relative" style={{ aspectRatio: "3/4" }}>
  {/* Character Image */}
<div className="relative" style={{ aspectRatio: "3/4" }}>
  <img
    src={
      character.id === "hulk"
        ? "/images/hulk.jpg"
        : character.id === "doctor-strange"
        ? "/images/doctor-strange.jpg"
        : character.id === "captain-america"
        ? "/images/captain-america.jpg"
        : character.imageUrl
    }
    alt={character.name}
    className="w-full h-full object-cover"
  />

  <div 
    className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent"
  />
</div>

  <div 
    className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent"
  />
</div>
                
                {/* Glow Border on Hover */}
                <motion.div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                  style={{
                    boxShadow: `inset 0 0 30px ${accentColor}60`,
                    border: `2px solid ${accentColor}40`,
                    borderRadius: "0.5rem",
                  }}
                />
                
                {/* Content Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  {/* Power Category Badge */}
                  <div 
                    className="inline-block px-3 py-1 rounded-full text-xs mb-3"
                    style={{ 
                      backgroundColor: `${categoryColor}30`,
                      color: categoryColor,
                      fontWeight: 600,
                      border: `1px solid ${categoryColor}60`,
                    }}
                  >
                    {character.powerCategory}
                  </div>
                  
                  {/* Character Name */}
                  <h3 
                    className="text-3xl mb-1"
                    style={{ 
                      fontWeight: 700,
                      color: "#FFFFFF",
                      textShadow: "0 2px 8px rgba(0,0,0,0.8)",
                    }}
                  >
                    {character.name}
                  </h3>
                  
                  {/* Real Name */}
                  <p 
                    className="text-sm mb-3"
                    style={{ 
                      color: "#B3B3B3",
                      fontWeight: 500,
                    }}
                  >
                    {character.realName}
                  </p>
                  
                  {/* Short Description */}
                  <p 
                    className="text-sm leading-relaxed mb-4 line-clamp-2"
                    style={{ 
                      color: "#B3B3B3",
                    }}
                  >
                    {character.shortDescription}
                  </p>
                  
                  {/* View Full Profile Button */}
                  <motion.div
                    className="flex items-center gap-2 text-sm"
                    style={{ 
                      color: accentColor,
                      fontWeight: 600,
                    }}
                    whileHover={{ x: 4 }}
                  >
                    <span>View Full Profile</span>
                    <ArrowRight size={16} />
                  </motion.div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}