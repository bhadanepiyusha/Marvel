import { motion } from "motion/react";
import { useParams, useNavigate, useOutletContext } from "react-router";
import { Zap, Shield, User } from "lucide-react";
import { characters, movies } from "../data/marvelData";
import BackButton from "../components/BackButton";

interface OutletContext {
  accentColor: string;
}

export default function CharacterProfile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { accentColor } = useOutletContext<OutletContext>();
  
  const character = characters.find(c => c.id === id);
  
  if (!character) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: "#0A0A0F" }}>
        <div className="text-center">
          <h1 className="text-4xl mb-4" style={{ fontWeight: 700, color: "#FFFFFF" }}>
            Character Not Found
          </h1>
          <button
            onClick={() => navigate("/heroes")}
            className="px-6 py-3 rounded-md"
            style={{ backgroundColor: accentColor, color: "#FFFFFF", fontWeight: 600 }}
          >
            Back to Heroes
          </button>
        </div>
      </div>
    );
  }
  
  const relatedMovies = movies.filter(movie => 
    character.movies.some(charMovie => movie.title.includes(charMovie))
  );

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Tech": return "#1F80FF";
      case "Magic": return "#FFD700";
      case "Strength": return "#00FF7F";
      case "Enhanced": return "#E10600";
      default: return "#E10600";
    }
  };

  const categoryColor = getCategoryColor(character.powerCategory);

  const StatBar = ({ label, value, color }: { label: string; value: number; color: string }) => (
    <div className="mb-4">
      <div className="flex justify-between mb-2">
        <span style={{ color: "#FFFFFF", fontWeight: 600 }}>{label}</span>
        <span style={{ color: color, fontWeight: 600 }}>{value}%</span>
      </div>
      <div className="h-2 rounded-full" style={{ backgroundColor: "#151520" }}>
        <motion.div
          className="h-full rounded-full"
          style={{ backgroundColor: color }}
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
        />
      </div>
    </div>
  );

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#0A0A0F" }}>
      {/* Hero Banner */}
      <section className="relative h-[70vh] overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img 
            src={character.imageUrl}
            alt={character.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0F] via-[#0A0A0F]/80 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0F] via-transparent to-[#0A0A0F]" />
        </div>
        
        {/* Back Button */}
        <div className="absolute top-8 left-8 z-20">
          <BackButton accentColor={categoryColor} to="/heroes" />
        </div>
        
        {/* Character Name & Info */}
        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-16 z-10">
          <div className="max-w-7xl mx-auto">
            {/* Power Category Badge */}
            <motion.div 
              className="inline-block px-4 py-2 rounded-full text-sm mb-4"
              style={{ 
                backgroundColor: `${categoryColor}30`,
                color: categoryColor,
                fontWeight: 600,
                border: `2px solid ${categoryColor}60`,
              }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              {character.powerCategory}
            </motion.div>
            
            <motion.h1 
              className="text-6xl md:text-8xl mb-3"
              style={{ 
                fontWeight: 700,
                color: "#FFFFFF",
                textShadow: "0 4px 20px rgba(0,0,0,0.8)",
              }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {character.name}
            </motion.h1>
            
            {/* Real Name Subtitle */}
            <motion.p 
              className="text-2xl md:text-3xl"
              style={{ 
                color: "#B3B3B3",
                fontWeight: 500,
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              {character.realName}
            </motion.p>
          </div>
        </div>
      </section>
      
      {/* Overview Section */}
      <section className="py-16 px-8" style={{ backgroundColor: "#0F0F14" }}>
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <User size={32} color={categoryColor} />
              <h2 
                className="text-4xl"
                style={{ fontWeight: 700, color: "#FFFFFF" }}
              >
                Overview
              </h2>
            </div>
            <p 
              className="text-xl leading-relaxed"
              style={{ color: "#B3B3B3" }}
            >
              {character.description}
            </p>
          </motion.div>
        </div>
      </section>
      
      {/* Powers & Stats Section */}
      <section className="py-16 px-8" style={{ backgroundColor: "#0A0A0F" }}>
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Powers & Abilities */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <Zap size={32} color={categoryColor} />
                <h2 
                  className="text-4xl"
                  style={{ fontWeight: 700, color: "#FFFFFF" }}
                >
                  Powers & Abilities
                </h2>
              </div>
              
              <div className="space-y-3 mb-8">
                {character.powers.map((power, index) => (
                  <motion.div
                    key={index}
                    className="flex items-center gap-3 p-4 rounded-lg"
                    style={{ backgroundColor: "#151520" }}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                    whileHover={{ 
                      backgroundColor: "#1A1A28",
                      x: 8,
                    }}
                  >
                    <div 
                      className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: categoryColor }}
                    >
                      <Zap size={20} color="#FFFFFF" />
                    </div>
                    <span 
                      className="text-lg"
                      style={{ color: "#FFFFFF", fontWeight: 500 }}
                    >
                      {power}
                    </span>
                  </motion.div>
                ))}
              </div>
              
              {/* Weapons */}
              {character.weapons && character.weapons.length > 0 && (
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <Shield size={24} color={categoryColor} />
                    <h3 
                      className="text-2xl"
                      style={{ fontWeight: 700, color: "#FFFFFF" }}
                    >
                      Weapons & Equipment
                    </h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {character.weapons.map((weapon, index) => (
                      <motion.span
                        key={index}
                        className="px-4 py-2 rounded-full text-sm"
                        style={{ 
                          backgroundColor: "#151520",
                          color: "#FFFFFF",
                          fontWeight: 500,
                        }}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.4, delay: 0.8 + index * 0.1 }}
                        whileHover={{ 
                          backgroundColor: categoryColor,
                          scale: 1.05,
                        }}
                      >
                        {weapon}
                      </motion.span>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
            
            {/* Character Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <h2 
                className="text-4xl mb-6"
                style={{ fontWeight: 700, color: "#FFFFFF" }}
              >
                Character Stats
              </h2>
              <div className="p-8 rounded-lg" style={{ backgroundColor: "#151520" }}>
                <StatBar label="Strength" value={character.stats.strength} color={categoryColor} />
                <StatBar label="Speed" value={character.stats.speed} color={categoryColor} />
                <StatBar label="Intelligence" value={character.stats.intelligence} color={categoryColor} />
                <StatBar label="Combat" value={character.stats.combat} color={categoryColor} />
                <StatBar label="Durability" value={character.stats.durability} color={categoryColor} />
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Appearances in MCU */}
      {relatedMovies.length > 0 && (
        <section className="py-16 px-8" style={{ backgroundColor: "#0F0F14" }}>
          <div className="max-w-7xl mx-auto">
            <motion.h2 
              className="text-4xl mb-8"
              style={{ fontWeight: 700, color: "#FFFFFF" }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
            >
              Appearances in MCU
            </motion.h2>
            
            <div className="overflow-x-auto pb-4">
              <div className="flex gap-6 min-w-max">
                {relatedMovies.map((movie, index) => (
                  <motion.div
                    key={movie.id}
                    className="relative rounded-lg overflow-hidden group cursor-pointer"
                    style={{ 
                      backgroundColor: "#151520",
                      width: "280px",
                      aspectRatio: "2/3",
                    }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                    whileHover={{ 
                      scale: 1.05,
                      boxShadow: `0 0 30px ${categoryColor}40`,
                    }}
                  >
                    <img 
                      src={movie.posterUrl}
                      alt={movie.title}
                      className="w-full h-full object-cover"
                    />
                    
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute bottom-0 left-0 right-0 p-4">
                        <h3 
                          className="text-lg mb-2"
                          style={{ fontWeight: 700, color: "#FFFFFF" }}
                        >
                          {movie.title}
                        </h3>
                        <div className="flex flex-col gap-1">
                          <div className="flex items-center gap-2 text-sm">
                            <span style={{ color: categoryColor, fontWeight: 600 }}>
                              {movie.year}
                            </span>
                            <span style={{ color: "#B3B3B3" }}>•</span>
                            <span style={{ color: "#B3B3B3" }}>
                              {movie.phase}
                            </span>
                          </div>
                          {movie.role && (
                            <span 
                              className="text-xs px-2 py-1 rounded-full inline-block w-fit"
                              style={{ 
                                backgroundColor: `${categoryColor}30`,
                                color: categoryColor,
                                fontWeight: 600,
                              }}
                            >
                              {movie.role} Role
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}