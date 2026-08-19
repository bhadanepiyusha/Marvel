import { motion } from "motion/react";
import { useNavigate, useOutletContext } from "react-router";
import { ArrowRight, Users, User } from "lucide-react";
import { characters } from "../data/marvelData";
import BackButton from "../components/BackButton";

interface OutletContext {
  accentColor: string;
}

export default function HeroesPage() {
  const navigate = useNavigate();
  const { accentColor } = useOutletContext<OutletContext>();

  const heroes = characters.filter(c => c.type === "Hero");
  const teams = characters.filter(c => c.type === "Team");

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Tech": return "#1F80FF";
      case "Magic": return "#FFD700";
      case "Strength": return "#00FF7F";
      case "Enhanced": return "#E10600";
      case "Team": return "#FF1F80";
      default: return accentColor;
    }
  };

  return (
    <div className="min-h-screen pt-24" style={{ backgroundColor: "#0A0A0F" }}>
      {/* Back Button */}
      <div className="px-8 py-4">
        <div className="max-w-7xl mx-auto">
          <BackButton accentColor={accentColor} to="/" />
        </div>
      </div>
      
      {/* Header */}
      <section className="py-16 px-8" style={{ backgroundColor: "#0F0F14" }}>
        <div className="max-w-7xl mx-auto text-center">
          <motion.h1 
            className="text-5xl md:text-7xl mb-6"
            style={{ fontWeight: 700, color: "#FFFFFF" }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Heroes & Teams
          </motion.h1>
          
          <motion.p 
            className="text-xl"
            style={{ color: "#B3B3B3" }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Explore the Marvel Cinematic Universe
          </motion.p>
        </div>
      </section>
      
      {/* Heroes Grid */}
      <section className="py-16 px-8" style={{ backgroundColor: "#0A0A0F" }}>
        <div className="max-w-7xl mx-auto">
          <motion.div 
            className="flex items-center gap-3 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <User size={32} color={accentColor} />
            <h2 
              className="text-4xl"
              style={{ fontWeight: 700, color: "#FFFFFF" }}
            >
              Heroes
            </h2>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {heroes.map((hero, index) => {
              const categoryColor = getCategoryColor(hero.powerCategory);
              
              return (
                <motion.div
                  key={hero.id}
                  className="relative group cursor-pointer overflow-hidden rounded-xl"
                  style={{ 
                    backgroundColor: "#151520",
                  }}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.05 }}
                  whileHover={{ 
                    scale: 1.03,
                    transition: { duration: 0.3 }
                  }}
                  onClick={() => navigate(`/character/${hero.id}`)}
                >
                  {/* Hero Image */}
                  <div className="relative" style={{ aspectRatio: "3/4" }}>
                    <img 
                      src={hero.imageUrl}
                      alt={hero.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent" />
                    
                    {/* Tag Badge */}
                    <div 
                      className="absolute top-4 right-4 px-3 py-1 rounded-full text-xs backdrop-blur-sm"
                      style={{ 
                        backgroundColor: "rgba(225, 6, 0, 0.9)",
                        color: "#FFFFFF",
                        fontWeight: 600,
                      }}
                    >
                      Hero
                    </div>
                  </div>
                  
                  {/* Glow Border on Hover */}
                  <motion.div 
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                    style={{
                      boxShadow: `inset 0 0 30px ${categoryColor}60`,
                      border: `2px solid ${categoryColor}40`,
                      borderRadius: "0.75rem",
                    }}
                  />
                  
                  {/* Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    {/* Hero Name */}
                    <h3 
                      className="text-2xl mb-1"
                      style={{ 
                        fontWeight: 700,
                        color: "#FFFFFF",
                        textShadow: "0 2px 8px rgba(0,0,0,0.8)",
                      }}
                    >
                      {hero.name}
                    </h3>
                    
                    {/* Real Name */}
                    <p 
                      className="text-sm mb-3"
                      style={{ 
                        color: "#B3B3B3",
                        fontWeight: 500,
                      }}
                    >
                      {hero.realName}
                    </p>
                    
                    {/* Movies List */}
                    <div className="mb-3">
                      <div className="text-xs mb-1" style={{ color: "#B3B3B3" }}>
                        MCU Appearances:
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {hero.movies.slice(0, 3).map((movie, i) => (
                          <span 
                            key={i}
                            className="text-xs px-2 py-1 rounded-md"
                            style={{ 
                              backgroundColor: "rgba(255,255,255,0.1)",
                              color: "#FFFFFF",
                            }}
                          >
                            {movie}
                          </span>
                        ))}
                        {hero.movies.length > 3 && (
                          <span 
                            className="text-xs px-2 py-1 rounded-md"
                            style={{ 
                              backgroundColor: "rgba(255,255,255,0.1)",
                              color: "#FFFFFF",
                            }}
                          >
                            +{hero.movies.length - 3}
                          </span>
                        )}
                      </div>
                    </div>
                    
                    {/* First Appearance */}
                    <p 
                      className="text-xs mb-2"
                      style={{ color: "#B3B3B3" }}
                    >
                      First: {hero.firstAppearance}
                    </p>
                    
                    {/* View Profile */}
                    <motion.div
                      className="flex items-center gap-2 text-sm"
                      style={{ 
                        color: categoryColor,
                        fontWeight: 600,
                      }}
                      whileHover={{ x: 4 }}
                    >
                      <span>View Profile</span>
                      <ArrowRight size={16} />
                    </motion.div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
      
      {/* Teams Section */}
      <section className="py-16 px-8" style={{ backgroundColor: "#0F0F14" }}>
        <div className="max-w-7xl mx-auto">
          <motion.div 
            className="flex items-center gap-3 mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <Users size={32} color={accentColor} />
            <h2 
              className="text-4xl"
              style={{ fontWeight: 700, color: "#FFFFFF" }}
            >
              Teams
            </h2>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {teams.map((team, index) => {
              const teamColor = getCategoryColor("Team");
              
              return (
                <motion.div
                  key={team.id}
                  className="relative group cursor-pointer overflow-hidden rounded-xl"
                  style={{ 
                    backgroundColor: "#151520",
                  }}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ 
                    scale: 1.02,
                    transition: { duration: 0.3 }
                  }}
                  onClick={() => navigate(`/character/${team.id}`)}
                >
                  {/* Team Image */}
                  <div className="relative" style={{ aspectRatio: "16/9" }}>
                    <img 
                      src={team.imageUrl}
                      alt={team.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
                    
                    {/* Tag Badge */}
                    <div 
                      className="absolute top-4 right-4 px-3 py-1 rounded-full text-xs backdrop-blur-sm"
                      style={{ 
                        backgroundColor: teamColor,
                        color: "#FFFFFF",
                        fontWeight: 600,
                      }}
                    >
                      Team
                    </div>
                  </div>
                  
                  {/* Glow Border on Hover */}
                  <motion.div 
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                    style={{
                      boxShadow: `inset 0 0 30px ${teamColor}60`,
                      border: `2px solid ${teamColor}40`,
                      borderRadius: "0.75rem",
                    }}
                  />
                  
                  {/* Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 
                      className="text-3xl mb-2"
                      style={{ 
                        fontWeight: 700,
                        color: "#FFFFFF",
                        textShadow: "0 2px 8px rgba(0,0,0,0.8)",
                      }}
                    >
                      {team.name}
                    </h3>
                    
                    <p 
                      className="text-sm mb-4"
                      style={{ 
                        color: "#B3B3B3",
                        fontWeight: 500,
                      }}
                    >
                      {team.realName}
                    </p>
                    
                    {/* Core Members */}
                    {team.teamMembers && (
                      <div className="mb-4">
                        <div className="text-xs mb-2" style={{ color: "#B3B3B3" }}>
                          Core Members:
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {team.teamMembers.map((member, i) => (
                            <span 
                              key={i}
                              className="text-xs px-3 py-1 rounded-full"
                              style={{ 
                                backgroundColor: `${teamColor}30`,
                                color: teamColor,
                                fontWeight: 600,
                                border: `1px solid ${teamColor}60`,
                              }}
                            >
                              {member}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {/* Team Movies */}
                    <div className="mb-3">
                      <div className="text-xs mb-1" style={{ color: "#B3B3B3" }}>
                        Team Movies:
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {team.movies.map((movie, i) => (
                          <span 
                            key={i}
                            className="text-xs px-2 py-1 rounded-md"
                            style={{ 
                              backgroundColor: "rgba(255,255,255,0.1)",
                              color: "#FFFFFF",
                            }}
                          >
                            {movie}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    {/* View Details */}
                    <motion.div
                      className="flex items-center gap-2 text-sm"
                      style={{ 
                        color: teamColor,
                        fontWeight: 600,
                      }}
                      whileHover={{ x: 4 }}
                    >
                      <span>View Details</span>
                      <ArrowRight size={16} />
                    </motion.div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}