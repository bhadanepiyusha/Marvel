import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import { Play, X, Film, DollarSign, Star } from "lucide-react";
import { timeline } from "../data/marvelData";

interface TimelineSectionProps {
  accentColor: string;
}

export default function TimelineSection({ accentColor }: TimelineSectionProps) {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

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
          MCU Timeline
        </motion.h2>
        
        {/* Desktop: Horizontal Scroll */}
        <div className="hidden md:block overflow-x-auto pb-8">
          <div className="min-w-max flex items-start gap-16 px-8 relative">
            {timeline.map((event, index) => (
              <div 
                key={index}
                className="relative flex flex-col items-center"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {/* Year Marker */}
                <motion.div 
                  className="text-3xl mb-8 text-center w-32"
                  style={{ 
                    fontWeight: 700,
                    color: hoveredIndex === index ? accentColor : "#FFFFFF",
                  }}
                  initial={{ opacity: 0, y: -20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  {event.year}
                </motion.div>
                
                {/* Timeline Dot */}
                <motion.div 
                  className="w-6 h-6 rounded-full mb-8 z-10 cursor-pointer"
                  style={{ 
                    backgroundColor: hoveredIndex === index ? accentColor : "#FFFFFF",
                    boxShadow: hoveredIndex === index ? `0 0 20px ${accentColor}` : "none",
                  }}
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  whileHover={{ scale: 1.3 }}
                  onClick={() => event.movieDetails && setExpandedIndex(expandedIndex === index ? null : index)}
                />
                
                {/* Movie Card */}
                <motion.div 
                  className="p-6 rounded-lg w-80 cursor-pointer"
                  style={{ 
                    backgroundColor: "#151520",
                    border: hoveredIndex === index ? `2px solid ${accentColor}60` : "2px solid transparent",
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ 
                    y: -8,
                    boxShadow: `0 0 30px ${accentColor}40`,
                  }}
                  onClick={() => event.movieDetails && setExpandedIndex(expandedIndex === index ? null : index)}
                >
                  <h3 
                    className="text-2xl mb-3"
                    style={{ fontWeight: 700, color: "#FFFFFF" }}
                  >
                    {event.movie}
                  </h3>
                  <p style={{ color: "#B3B3B3" }}>
                    {event.description}
                  </p>
                  {event.movieDetails && (
                    <p 
                      className="text-sm mt-4"
                      style={{ color: accentColor, fontWeight: 600 }}
                    >
                      Click for details
                    </p>
                  )}
                </motion.div>
              </div>
            ))}
          </div>
          
          {/* Timeline Line */}
          <motion.div 
            className="absolute h-1 left-0 right-0 top-[8.5rem]"
            style={{ 
              backgroundColor: accentColor,
              opacity: 0.3,
            }}
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, delay: 0.5 }}
          />
        </div>
        
        {/* Mobile: Vertical Stack */}
        <div className="md:hidden space-y-8">
          {timeline.map((event, index) => (
            <motion.div 
              key={index}
              className="relative pl-12"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              {/* Vertical Line */}
              {index < timeline.length - 1 && (
                <div 
                  className="absolute left-3 top-8 bottom-0 w-0.5"
                  style={{ backgroundColor: `${accentColor}60` }}
                />
              )}
              
              {/* Dot */}
              <div 
                className="absolute left-0 top-0 w-6 h-6 rounded-full cursor-pointer"
                style={{ 
                  backgroundColor: accentColor,
                  boxShadow: `0 0 15px ${accentColor}`,
                }}
                onClick={() => event.movieDetails && setExpandedIndex(expandedIndex === index ? null : index)}
              />
              
              {/* Content */}
              <div 
                className="p-6 rounded-lg cursor-pointer"
                style={{ backgroundColor: "#151520" }}
                onClick={() => event.movieDetails && setExpandedIndex(expandedIndex === index ? null : index)}
              >
                <div className="text-2xl mb-2" style={{ fontWeight: 700, color: accentColor }}>
                  {event.year}
                </div>
                <h3 className="text-xl mb-2" style={{ fontWeight: 700, color: "#FFFFFF" }}>
                  {event.movie}
                </h3>
                <p style={{ color: "#B3B3B3" }}>
                  {event.description}
                </p>
                {event.movieDetails && (
                  <p 
                    className="text-sm mt-4"
                    style={{ color: accentColor, fontWeight: 600 }}
                  >
                    Tap for details
                  </p>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      
      {/* Expandable Movie Panel */}
      <AnimatePresence>
        {expandedIndex !== null && timeline[expandedIndex].movieDetails && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-8"
            style={{ backgroundColor: "rgba(10, 10, 15, 0.95)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setExpandedIndex(null)}
          >
            <motion.div
              className="relative max-w-5xl w-full rounded-lg overflow-hidden"
              style={{ backgroundColor: "#151520" }}
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                className="absolute top-6 right-6 z-10 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300"
                style={{ backgroundColor: "rgba(10, 10, 15, 0.8)" }}
                onClick={() => setExpandedIndex(null)}
              >
                <X size={24} color="#FFFFFF" />
              </button>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
                {/* Poster */}
                <div className="relative rounded-lg overflow-hidden" style={{ aspectRatio: "2/3" }}>
                  <img 
                    src={timeline[expandedIndex].movieDetails!.posterUrl}
                    alt={timeline[expandedIndex].movieDetails!.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                {/* Details */}
                <div className="flex flex-col justify-center space-y-6">
                  <div>
                    <h3 
                      className="text-4xl mb-4"
                      style={{ fontWeight: 700, color: "#FFFFFF" }}
                    >
                      {timeline[expandedIndex].movieDetails!.title}
                    </h3>
                    
                    <div className="flex flex-wrap items-center gap-4 mb-4">
                      <span style={{ color: accentColor, fontWeight: 600 }}>
                        {timeline[expandedIndex].movieDetails!.year}
                      </span>
                      <span style={{ color: "#B3B3B3" }}>•</span>
                      <span style={{ color: "#B3B3B3" }}>
                        {timeline[expandedIndex].movieDetails!.phase}
                      </span>
                      <span style={{ color: "#B3B3B3" }}>•</span>
                      <span style={{ color: "#B3B3B3" }}>
                        {timeline[expandedIndex].movieDetails!.runtime}
                      </span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center gap-2">
                      <Film size={20} color={accentColor} />
                      <div>
                        <div className="text-xs" style={{ color: "#B3B3B3" }}>Director</div>
                        <div style={{ color: "#FFFFFF", fontWeight: 600 }}>
                          {timeline[expandedIndex].movieDetails!.director}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <DollarSign size={20} color={accentColor} />
                      <div>
                        <div className="text-xs" style={{ color: "#B3B3B3" }}>Box Office</div>
                        <div style={{ color: "#FFFFFF", fontWeight: 600 }}>
                          {timeline[expandedIndex].movieDetails!.boxOffice}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Star size={20} color={accentColor} fill={accentColor} />
                      <div>
                        <div className="text-xs" style={{ color: "#B3B3B3" }}>Rating</div>
                        <div style={{ color: "#FFFFFF", fontWeight: 600 }}>
                          {timeline[expandedIndex].movieDetails!.rating}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <p 
                    className="leading-relaxed"
                    style={{ color: "#B3B3B3" }}
                  >
                    {timeline[expandedIndex].movieDetails!.plotSummary}
                  </p>
                  
                  <motion.button
                    className="px-8 py-4 rounded-md flex items-center justify-center gap-3 transition-all duration-300 w-full"
                    style={{
                      backgroundColor: accentColor,
                      color: "#FFFFFF",
                      fontWeight: 600,
                    }}
                    whileHover={{ 
                      scale: 1.02,
                      boxShadow: `0 0 30px ${accentColor}60`,
                    }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Play size={20} fill="#FFFFFF" />
                    Watch Trailer
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
