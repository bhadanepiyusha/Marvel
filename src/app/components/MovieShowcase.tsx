import { motion } from "motion/react";
import { Play, Star, Film, Clock } from "lucide-react";
import { movies } from "../data/marvelData";

interface MovieShowcaseProps {
  accentColor: string;
}

export default function MovieShowcase({ accentColor }: MovieShowcaseProps) {
  // Featured movie (first one)
  const featuredMovie = movies[0];
  const relatedMovies = movies.slice(1);

  return (
    <section className="py-24 px-8" style={{ backgroundColor: "#0A0A0F" }}>
      <div className="max-w-7xl mx-auto">
        <motion.h2 
          className="text-5xl md:text-6xl mb-16 text-center"
          style={{ fontWeight: 700, color: "#FFFFFF" }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          Featured Films
        </motion.h2>
        
        {/* Featured Movie */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center mb-16"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          {/* Poster */}
          <motion.div 
            className="relative rounded-lg overflow-hidden group"
            style={{ 
              backgroundColor: "#151520",
              aspectRatio: "2/3",
            }}
            whileHover={{ 
              scale: 1.02,
              boxShadow: `0 0 40px ${accentColor}40`,
            }}
            transition={{ duration: 0.3 }}
          >
            <img 
              src={}
              alt={featuredMovie.title}
              className="w-full h-full object-cover"
            />
            
            {/* Hover Overlay */}
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <motion.div
                initial={{ scale: 0.8 }}
                whileHover={{ scale: 1 }}
                className="w-20 h-20 rounded-full flex items-center justify-center cursor-pointer"
                style={{ backgroundColor: accentColor }}
              >
                <Play size={32} fill="#FFFFFF" color="#FFFFFF" />
              </motion.div>
            </div>
            
            {/* Glow Border */}
            <motion.div 
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
              style={{
                boxShadow: `inset 0 0 30px ${accentColor}60`,
                border: `2px solid ${accentColor}40`,
                borderRadius: "0.5rem",
              }}
            />
          </motion.div>
          
          {/* Details */}
          <div className="space-y-6">
            <div>
              <h3 
                className="text-4xl md:text-5xl mb-4"
                style={{ fontWeight: 700, color: "#FFFFFF" }}
              >
                {featuredMovie.title}
              </h3>
              
              <div className="flex flex-wrap items-center gap-4 mb-6">
                <span 
                  className="text-xl"
                  style={{ color: accentColor, fontWeight: 600 }}
                >
                  {featuredMovie.year}
                </span>
                
                <span style={{ color: "#B3B3B3" }}>•</span>
                
                <div className="flex items-center gap-2">
                  <Film size={18} color="#B3B3B3" />
                  <span style={{ color: "#B3B3B3" }}>{featuredMovie.phase}</span>
                </div>
                
                <span style={{ color: "#B3B3B3" }}>•</span>
                
                <div className="flex items-center gap-2">
                  <Clock size={18} color="#B3B3B3" />
                  <span style={{ color: "#B3B3B3" }}>{featuredMovie.runtime}</span>
                </div>
                
                <span style={{ color: "#B3B3B3" }}>•</span>
                
                <div className="flex items-center gap-2">
                  <Star size={18} fill={accentColor} color={accentColor} />
                  <span style={{ color: "#B3B3B3" }}>{featuredMovie.rating}</span>
                </div>
              </div>
            </div>
            
            <p 
              className="text-lg leading-relaxed"
              style={{ color: "#B3B3B3" }}
            >
              {featuredMovie.plotSummary}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <motion.button
                className="px-8 py-4 rounded-md flex items-center justify-center gap-3 transition-all duration-300 flex-1"
                style={{
                  backgroundColor: accentColor,
                  color: "#FFFFFF",
                  fontWeight: 600,
                }}
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: `0 0 30px ${accentColor}60`,
                }}
                whileTap={{ scale: 0.95 }}
              >
                <Play size={20} fill="#FFFFFF" />
                Watch Trailer
              </motion.button>
              
              <motion.button
                className="px-8 py-4 rounded-md transition-all duration-300 border-2 flex-1"
                style={{
                  backgroundColor: "rgba(0, 0, 0, 0)",
                  borderColor: accentColor,
                  color: "#FFFFFF",
                  fontWeight: 600,
                }}
                whileHover={{ 
                  scale: 1.05,
                  backgroundColor: `${accentColor}20`,
                }}
                whileTap={{ scale: 0.95 }}
              >
                View Details
              </motion.button>
            </div>
          </div>
        </motion.div>
        
        {/* Related Movies - Horizontal Scroll */}
        <div className="mt-16">
          <motion.h3 
            className="text-3xl mb-8"
            style={{ fontWeight: 700, color: "#FFFFFF" }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            More from the MCU
          </motion.h3>
          
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
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ 
                    scale: 1.05,
                    boxShadow: `0 0 30px ${accentColor}40`,
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
                      <h4 
                        className="text-lg mb-2"
                        style={{ fontWeight: 700, color: "#FFFFFF" }}
                      >
                        {movie.title}
                      </h4>
                      <div className="flex items-center gap-3 text-sm">
                        <span style={{ color: accentColor, fontWeight: 600 }}>
                          {movie.year}
                        </span>
                        <span style={{ color: "#B3B3B3" }}>•</span>
                        <span style={{ color: "#B3B3B3" }}>
                          {movie.phase}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Play Button Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div 
                      className="w-16 h-16 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: `${accentColor}90` }}
                    >
                      <Play size={24} fill="#FFFFFF" color="#FFFFFF" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}