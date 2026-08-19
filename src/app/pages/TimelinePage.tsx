import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import { useOutletContext } from "react-router";
import { Play, X, Film, DollarSign, Star, Calendar, Clock } from "lucide-react";
import { timeline, movies } from "../data/marvelData";
import BackButton from "../components/BackButton";

interface OutletContext {
  accentColor: string;
}

export default function TimelinePage() {
  const { accentColor } = useOutletContext<OutletContext>();
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const [orderMode, setOrderMode] = useState<"chronological" | "release">("chronological");
  const [selectedPhase, setSelectedPhase] = useState<number | null>(null);
  const [selectedSaga, setSelectedSaga] = useState<"Infinity Saga" | "Multiverse Saga" | null>(null);

  // Filter timeline based on selections
  const filteredTimeline = timeline.filter(event => {
    if (selectedPhase && event.phase !== selectedPhase) return false;
    if (selectedSaga && event.movieDetails?.saga !== selectedSaga) return false;
    return true;
  });

  // Sort based on order mode
  const sortedTimeline = [...filteredTimeline].sort((a, b) => {
    if (orderMode === "release") {
      return (a.movieDetails?.year || a.year) - (b.movieDetails?.year || b.year);
    }
    return a.year - b.year;
  });

  // Group by phase
  const phases = [
    { number: 1, name: "Phase 1", color: "#E10600" },
    { number: 2, name: "Phase 2", color: "#1F80FF" },
    { number: 3, name: "Phase 3", color: "#FFD700" },
  ];

  const getPhaseColor = (phase: number) => {
    return phases.find(p => p.number === phase)?.color || accentColor;
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
        <div className="max-w-7xl mx-auto">
          <motion.h1 
            className="text-5xl md:text-7xl mb-6 text-center"
            style={{ fontWeight: 700, color: "#FFFFFF" }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            MCU Timeline
          </motion.h1>
          
          <motion.p 
            className="text-xl text-center mb-12"
            style={{ color: "#B3B3B3" }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            From 1943 to Present • {timeline.length} Films
          </motion.p>
          
          {/* Filters and Toggle */}
          <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
            {/* Order Toggle */}
            <div className="flex gap-2 p-1 rounded-lg" style={{ backgroundColor: "#151520" }}>
              <button
                className="px-6 py-2 rounded-md transition-all duration-300"
                style={{
                  backgroundColor: orderMode === "chronological" ? accentColor : "transparent",
                  color: "#FFFFFF",
                  fontWeight: 600,
                }}
                onClick={() => setOrderMode("chronological")}
              >
                Chronological
              </button>
              <button
                className="px-6 py-2 rounded-md transition-all duration-300"
                style={{
                  backgroundColor: orderMode === "release" ? accentColor : "transparent",
                  color: "#FFFFFF",
                  fontWeight: 600,
                }}
                onClick={() => setOrderMode("release")}
              >
                Release Order
              </button>
            </div>
            
            {/* Phase Filter */}
            <div className="flex gap-2 flex-wrap justify-center">
              <button
                className="px-4 py-2 rounded-md transition-all duration-300"
                style={{
                  backgroundColor: selectedPhase === null ? accentColor : "#151520",
                  color: "#FFFFFF",
                  fontWeight: 600,
                  border: selectedPhase === null ? "none" : "1px solid rgba(255,255,255,0.1)",
                }}
                onClick={() => setSelectedPhase(null)}
              >
                All Phases
              </button>
              {phases.map(phase => (
                <button
                  key={phase.number}
                  className="px-4 py-2 rounded-md transition-all duration-300"
                  style={{
                    backgroundColor: selectedPhase === phase.number ? phase.color : "#151520",
                    color: "#FFFFFF",
                    fontWeight: 600,
                    border: selectedPhase === phase.number ? "none" : "1px solid rgba(255,255,255,0.1)",
                  }}
                  onClick={() => setSelectedPhase(phase.number)}
                >
                  {phase.name}
                </button>
              ))}
            </div>
            
            {/* Saga Filter */}
            <div className="flex gap-2">
              <button
                className="px-4 py-2 rounded-md transition-all duration-300"
                style={{
                  backgroundColor: selectedSaga === "Infinity Saga" ? "#E10600" : "#151520",
                  color: "#FFFFFF",
                  fontWeight: 600,
                  border: "1px solid rgba(255,255,255,0.1)",
                }}
                onClick={() => setSelectedSaga(selectedSaga === "Infinity Saga" ? null : "Infinity Saga")}
              >
                Infinity Saga
              </button>
              <button
                className="px-4 py-2 rounded-md transition-all duration-300"
                style={{
                  backgroundColor: selectedSaga === "Multiverse Saga" ? "#FFD700" : "#151520",
                  color: "#FFFFFF",
                  fontWeight: 600,
                  border: "1px solid rgba(255,255,255,0.1)",
                }}
                onClick={() => setSelectedSaga(selectedSaga === "Multiverse Saga" ? null : "Multiverse Saga")}
              >
                Multiverse Saga
              </button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Storytelling Section */}
      <section className="py-20 px-8" style={{ backgroundColor: "#0A0A0F" }}>
        <div className="max-w-7xl mx-auto">
          <motion.h2 
            className="text-4xl md:text-5xl mb-16 text-center"
            style={{ fontWeight: 700, color: "#FFFFFF" }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Marvel Timeline: The Story So Far
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Block 1 */}
            <motion.div 
              className="p-8 rounded-xl"
              style={{ 
                backgroundColor: "#0F0F14",
                border: "1px solid rgba(255,255,255,0.05)",
              }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5 }}
            >
              <h3 
                className="text-2xl mb-4"
                style={{ 
                  fontWeight: 700, 
                  color: "#E10600",
                }}
              >
                The First Avenger (1943)
              </h3>
              <p style={{ color: "#B3B3B3", lineHeight: 1.8 }}>
                The birth of a super soldier marks the beginning of the Marvel Cinematic Universe.
              </p>
            </motion.div>
            
            {/* Block 2 */}
            <motion.div 
              className="p-8 rounded-xl"
              style={{ 
                backgroundColor: "#0F0F14",
                border: "1px solid rgba(255,255,255,0.05)",
              }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <h3 
                className="text-2xl mb-4"
                style={{ 
                  fontWeight: 700, 
                  color: "#1F80FF",
                }}
              >
                The Rise of Heroes (2010–2012)
              </h3>
              <p style={{ color: "#B3B3B3", lineHeight: 1.8 }}>
                Iron Man, Thor, Hulk, and Captain America unite to form the Avengers.
              </p>
            </motion.div>
            
            {/* Block 3 */}
            <motion.div 
              className="p-8 rounded-xl"
              style={{ 
                backgroundColor: "#0F0F14",
                border: "1px solid rgba(255,255,255,0.05)",
              }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h3 
                className="text-2xl mb-4"
                style={{ 
                  fontWeight: 700, 
                  color: "#FFD700",
                }}
              >
                Infinity Saga
              </h3>
              <p style={{ color: "#B3B3B3", lineHeight: 1.8 }}>
                The battle against Thanos reshapes the universe and leads to the Blip.
              </p>
            </motion.div>
            
            {/* Block 4 */}
            <motion.div 
              className="p-8 rounded-xl"
              style={{ 
                backgroundColor: "#0F0F14",
                border: "1px solid rgba(255,255,255,0.05)",
              }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <h3 
                className="text-2xl mb-4"
                style={{ 
                  fontWeight: 700, 
                  color: "#FF1F80",
                }}
              >
                The Multiverse Saga
              </h3>
              <p style={{ color: "#B3B3B3", lineHeight: 1.8 }}>
                Reality fractures, timelines collide, and new universes emerge.
              </p>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Timeline - Horizontal Scroll */}
      <section className="py-16 px-8">
        <div className="max-w-7xl mx-auto">
          <div className="overflow-x-auto pb-8 scrollbar-thin">
            <div className="min-w-max flex items-start gap-12 px-8 relative">
              {sortedTimeline.map((event, index) => {
                const phaseColor = getPhaseColor(event.phase);
                const displayYear = orderMode === "chronological" ? (event.inUniverseYear || event.year) : event.year;
                
                return (
                  <div 
                    key={index}
                    className="relative flex flex-col items-center"
                  >
                    {/* Year Marker */}
                    <motion.div 
                      className="text-2xl mb-6 text-center w-32"
                      style={{ 
                        fontWeight: 700,
                        color: phaseColor,
                      }}
                      initial={{ opacity: 0, y: -20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: index * 0.05 }}
                    >
                      {displayYear}
                    </motion.div>
                    
                    {/* Phase Badge */}
                    <div 
                      className="text-xs px-3 py-1 rounded-full mb-4"
                      style={{ 
                        backgroundColor: `${phaseColor}30`,
                        color: phaseColor,
                        fontWeight: 600,
                        border: `1px solid ${phaseColor}60`,
                      }}
                    >
                      Phase {event.phase}
                    </div>
                    
                    {/* Timeline Dot */}
                    <motion.div 
                      className="w-6 h-6 rounded-full mb-6 z-10 cursor-pointer"
                      style={{ 
                        backgroundColor: phaseColor,
                        boxShadow: `0 0 20px ${phaseColor}80`,
                      }}
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: index * 0.05 }}
                      whileHover={{ scale: 1.3 }}
                      onClick={() => event.movieDetails && setExpandedIndex(expandedIndex === index ? null : index)}
                    />
                    
                    {/* Movie Card */}
                    <motion.div 
                      className="p-6 rounded-xl w-80 cursor-pointer relative overflow-hidden"
                      style={{ 
                        backgroundColor: "#151520",
                        border: `2px solid transparent`,
                      }}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: index * 0.05 }}
                      whileHover={{ 
                        y: -8,
                        borderColor: `${phaseColor}60`,
                        boxShadow: `0 0 30px ${phaseColor}40`,
                      }}
                      onClick={() => event.movieDetails && setExpandedIndex(expandedIndex === index ? null : index)}
                    >
                      {/* Movie Poster Thumbnail */}
                      {event.movieDetails && (
                        <div className="w-full h-40 mb-4 rounded-lg overflow-hidden">
                          <img 
                            src={event.movieDetails.posterUrl}
                            alt={event.movie}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}
                      
                      <h3 
                        className="text-xl mb-2"
                        style={{ fontWeight: 700, color: "#FFFFFF" }}
                      >
                        {event.movie}
                      </h3>
                      <p className="text-sm mb-4" style={{ color: "#B3B3B3" }}>
                        {event.description}
                      </p>
                      
                      {event.movieDetails && (
                        <>
                          <div className="flex items-center gap-2 mb-2 text-sm">
                            <Film size={16} color={phaseColor} />
                            <span style={{ color: "#B3B3B3" }}>{event.movieDetails.saga}</span>
                          </div>
                          <p 
                            className="text-sm"
                            style={{ color: phaseColor, fontWeight: 600 }}
                          >
                            Click for details
                          </p>
                        </>
                      )}
                    </motion.div>
                  </div>
                );
              })}
            </div>
            
            {/* Timeline Line */}
            <motion.div 
              className="absolute h-1 left-0 right-0 top-[7.5rem] -z-10"
              style={{ 
                background: `linear-gradient(90deg, ${phases.map(p => p.color).join(", ")})`,
                opacity: 0.3,
              }}
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, delay: 0.5 }}
            />
          </div>
        </div>
      </section>
      
      {/* Expandable Movie Detail Modal */}
      <AnimatePresence>
        {expandedIndex !== null && sortedTimeline[expandedIndex].movieDetails && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-8 overflow-y-auto"
            style={{ backgroundColor: "rgba(10, 10, 15, 0.95)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setExpandedIndex(null)}
          >
            <motion.div
              className="relative max-w-6xl w-full rounded-xl overflow-hidden my-8"
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
              
              {/* Backdrop Image */}
              <div className="relative h-64 md:h-96">
                <img 
                  src={sortedTimeline[expandedIndex].movieDetails!.backdropUrl}
                  alt={sortedTimeline[expandedIndex].movieDetails!.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#151520] to-transparent" />
              </div>
              
              <div className="p-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {/* Poster */}
                  <div className="lg:col-span-1">
                    <div className="relative rounded-lg overflow-hidden" style={{ aspectRatio: "2/3" }}>
                      <img 
                        src={sortedTimeline[expandedIndex].movieDetails!.posterUrl}
                        alt={sortedTimeline[expandedIndex].movieDetails!.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  
                  {/* Details */}
                  <div className="lg:col-span-2 flex flex-col justify-center space-y-6">
                    <div>
                      <h3 
                        className="text-4xl mb-4"
                        style={{ fontWeight: 700, color: "#FFFFFF" }}
                      >
                        {sortedTimeline[expandedIndex].movieDetails!.title}
                      </h3>
                      
                      <div className="flex flex-wrap items-center gap-4 mb-4">
                        <span style={{ color: accentColor, fontWeight: 600 }}>
                          {sortedTimeline[expandedIndex].movieDetails!.year}
                        </span>
                        <span style={{ color: "#B3B3B3" }}>•</span>
                        <span style={{ color: "#B3B3B3" }}>
                          In-Universe: {sortedTimeline[expandedIndex].movieDetails!.inUniverseYear}
                        </span>
                        <span style={{ color: "#B3B3B3" }}>•</span>
                        <span style={{ color: "#B3B3B3" }}>
                          Phase {sortedTimeline[expandedIndex].movieDetails!.phase}
                        </span>
                        <span style={{ color: "#B3B3B3" }}>•</span>
                        <span style={{ color: "#B3B3B3" }}>
                          {sortedTimeline[expandedIndex].movieDetails!.saga}
                        </span>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      <div className="flex items-center gap-2">
                        <Film size={20} color={accentColor} />
                        <div>
                          <div className="text-xs" style={{ color: "#B3B3B3" }}>Director</div>
                          <div className="text-sm" style={{ color: "#FFFFFF", fontWeight: 600 }}>
                            {sortedTimeline[expandedIndex].movieDetails!.director}
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Clock size={20} color={accentColor} />
                        <div>
                          <div className="text-xs" style={{ color: "#B3B3B3" }}>Runtime</div>
                          <div className="text-sm" style={{ color: "#FFFFFF", fontWeight: 600 }}>
                            {sortedTimeline[expandedIndex].movieDetails!.runtime}
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <DollarSign size={20} color={accentColor} />
                        <div>
                          <div className="text-xs" style={{ color: "#B3B3B3" }}>Box Office</div>
                          <div className="text-sm" style={{ color: "#FFFFFF", fontWeight: 600 }}>
                            {sortedTimeline[expandedIndex].movieDetails!.boxOffice}
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Star size={20} color={accentColor} fill={accentColor} />
                        <div>
                          <div className="text-xs" style={{ color: "#B3B3B3" }}>IMDb</div>
                          <div className="text-sm" style={{ color: "#FFFFFF", fontWeight: 600 }}>
                            {sortedTimeline[expandedIndex].movieDetails!.imdbRating}
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Calendar size={20} color={accentColor} />
                        <div>
                          <div className="text-xs" style={{ color: "#B3B3B3" }}>Budget</div>
                          <div className="text-sm" style={{ color: "#FFFFFF", fontWeight: 600 }}>
                            {sortedTimeline[expandedIndex].movieDetails!.budget}
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <div className="w-5 h-5 flex items-center justify-center">
                          <div className="w-4 h-4 rounded-full" style={{ backgroundColor: "#FF6347" }} />
                        </div>
                        <div>
                          <div className="text-xs" style={{ color: "#B3B3B3" }}>RT Score</div>
                          <div className="text-sm" style={{ color: "#FFFFFF", fontWeight: 600 }}>
                            {sortedTimeline[expandedIndex].movieDetails!.rottenTomatoes}
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <p 
                      className="leading-relaxed"
                      style={{ color: "#B3B3B3" }}
                    >
                      {sortedTimeline[expandedIndex].movieDetails!.plotSummary}
                    </p>
                    
                    <motion.button
                      className="px-8 py-4 rounded-lg flex items-center justify-center gap-3 transition-all duration-300 w-full"
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
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}