import { motion } from "motion/react";
import { useState } from "react";
import { useNavigate, useOutletContext } from "react-router";
import { Search, Filter, Star, DollarSign, Calendar } from "lucide-react";
import { movies } from "../data/marvelData";
import BackButton from "../components/BackButton";

interface OutletContext {
  accentColor: string;
}

export default function MoviesPage() {
  const navigate = useNavigate();
  const { accentColor } = useOutletContext<OutletContext>();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPhase, setSelectedPhase] = useState<number | null>(null);
  const [selectedSaga, setSelectedSaga] = useState<"Infinity Saga" | "Multiverse Saga" | null>(null);
  const [sortBy, setSortBy] = useState<"year" | "boxOffice" | "rating">("year");

  // Filter movies
  const filteredMovies = movies.filter(movie => {
    const matchesSearch = movie.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         movie.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPhase = !selectedPhase || movie.phase === selectedPhase;
    const matchesSaga = !selectedSaga || movie.saga === selectedSaga;
    
    return matchesSearch && matchesPhase && matchesSaga;
  });

  // Sort movies
  const sortedMovies = [...filteredMovies].sort((a, b) => {
    switch (sortBy) {
      case "year":
        return b.year - a.year;
      case "boxOffice":
        const aBox = parseFloat(a.boxOffice.replace(/[^0-9.]/g, ""));
        const bBox = parseFloat(b.boxOffice.replace(/[^0-9.]/g, ""));
        return bBox - aBox;
      case "rating":
        const aRating = parseFloat(a.imdbRating.split("/")[0]);
        const bRating = parseFloat(b.imdbRating.split("/")[0]);
        return bRating - aRating;
      default:
        return 0;
    }
  });

  const phases = [1, 2, 3, 4, 5, 6];

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
            Movies Database
          </motion.h1>
          
          <motion.p 
            className="text-xl text-center mb-12"
            style={{ color: "#B3B3B3" }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Explore {movies.length} Films from the MCU
          </motion.p>
          
          {/* Search Bar */}
          <motion.div 
            className="relative max-w-2xl mx-auto mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <Search 
              size={24} 
              color="#B3B3B3" 
              className="absolute left-4 top-1/2 -translate-y-1/2"
            />
            <input
              type="text"
              placeholder="Search movies by title or description..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-14 py-4 rounded-xl text-lg outline-none transition-all duration-300"
              style={{
                backgroundColor: "#151520",
                color: "#FFFFFF",
                border: `2px solid transparent`,
              }}
              onFocus={(e) => e.target.style.borderColor = accentColor}
              onBlur={(e) => e.target.style.borderColor = "transparent"}
            />
          </motion.div>
          
          {/* Filters */}
          <div className="flex flex-col md:flex-row gap-6 justify-center items-center flex-wrap">
            {/* Phase Filter */}
            <div className="flex items-center gap-2">
              <Filter size={20} color={accentColor} />
              <span className="text-sm" style={{ color: "#FFFFFF", fontWeight: 600 }}>
                Phase:
              </span>
              <div className="flex gap-2">
                <button
                  className="px-4 py-2 rounded-md text-sm transition-all duration-300"
                  style={{
                    backgroundColor: selectedPhase === null ? accentColor : "#151520",
                    color: "#FFFFFF",
                    fontWeight: 600,
                  }}
                  onClick={() => setSelectedPhase(null)}
                >
                  All
                </button>
                {phases.slice(0, 3).map(phase => (
                  <button
                    key={phase}
                    className="px-4 py-2 rounded-md text-sm transition-all duration-300"
                    style={{
                      backgroundColor: selectedPhase === phase ? accentColor : "#151520",
                      color: "#FFFFFF",
                      fontWeight: 600,
                    }}
                    onClick={() => setSelectedPhase(phase)}
                  >
                    {phase}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Saga Filter */}
            <div className="flex items-center gap-2">
              <span className="text-sm" style={{ color: "#FFFFFF", fontWeight: 600 }}>
                Saga:
              </span>
              <div className="flex gap-2">
                <button
                  className="px-4 py-2 rounded-md text-sm transition-all duration-300"
                  style={{
                    backgroundColor: selectedSaga === "Infinity Saga" ? "#E10600" : "#151520",
                    color: "#FFFFFF",
                    fontWeight: 600,
                  }}
                  onClick={() => setSelectedSaga(selectedSaga === "Infinity Saga" ? null : "Infinity Saga")}
                >
                  Infinity
                </button>
                <button
                  className="px-4 py-2 rounded-md text-sm transition-all duration-300"
                  style={{
                    backgroundColor: selectedSaga === "Multiverse Saga" ? "#FFD700" : "#151520",
                    color: "#FFFFFF",
                    fontWeight: 600,
                  }}
                  onClick={() => setSelectedSaga(selectedSaga === "Multiverse Saga" ? null : "Multiverse Saga")}
                >
                  Multiverse
                </button>
              </div>
            </div>
            
            {/* Sort By */}
            <div className="flex items-center gap-2">
              <span className="text-sm" style={{ color: "#FFFFFF", fontWeight: 600 }}>
                Sort:
              </span>
              <div className="flex gap-2">
                <button
                  className="px-4 py-2 rounded-md text-sm transition-all duration-300 flex items-center gap-2"
                  style={{
                    backgroundColor: sortBy === "year" ? accentColor : "#151520",
                    color: "#FFFFFF",
                    fontWeight: 600,
                  }}
                  onClick={() => setSortBy("year")}
                >
                  <Calendar size={16} />
                  Year
                </button>
                <button
                  className="px-4 py-2 rounded-md text-sm transition-all duration-300 flex items-center gap-2"
                  style={{
                    backgroundColor: sortBy === "boxOffice" ? accentColor : "#151520",
                    color: "#FFFFFF",
                    fontWeight: 600,
                  }}
                  onClick={() => setSortBy("boxOffice")}
                >
                  <DollarSign size={16} />
                  Revenue
                </button>
                <button
                  className="px-4 py-2 rounded-md text-sm transition-all duration-300 flex items-center gap-2"
                  style={{
                    backgroundColor: sortBy === "rating" ? accentColor : "#151520",
                    color: "#FFFFFF",
                    fontWeight: 600,
                  }}
                  onClick={() => setSortBy("rating")}
                >
                  <Star size={16} />
                  Rating
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Movies Grid */}
      <section className="py-16 px-8">
        <div className="max-w-7xl mx-auto">
          {sortedMovies.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-xl" style={{ color: "#B3B3B3" }}>
                No movies found matching your criteria
              </p>
            </div>
          ) : (
            <>
              <div className="mb-8 text-center">
                <span style={{ color: "#B3B3B3" }}>
                  Showing {sortedMovies.length} of {movies.length} movies
                </span>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {sortedMovies.map((movie, index) => (
                  <motion.div
                    key={movie.id}
                    className="relative group cursor-pointer overflow-hidden rounded-xl"
                    style={{ 
                      backgroundColor: "#151520",
                      aspectRatio: "2/3",
                    }}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.02 }}
                    whileHover={{ 
                      scale: 1.05,
                      boxShadow: `0 0 30px ${accentColor}40`,
                    }}
                    onClick={() => navigate(`/movie/${movie.id}`)}
                  >
                    {/* Movie Poster */}
                    <img 
                      src={movie.posterUrl}
                      alt={movie.title}
                      className="w-full h-full object-cover"
                    />
                    
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute bottom-0 left-0 right-0 p-4">
                        <h3 
                          className="text-lg mb-2 line-clamp-2"
                          style={{ fontWeight: 700, color: "#FFFFFF" }}
                        >
                          {movie.title}
                        </h3>
                        
                        <div className="flex flex-col gap-2 text-sm">
                          <div className="flex items-center gap-2">
                            <span style={{ color: accentColor, fontWeight: 600 }}>
                              {movie.year}
                            </span>
                            <span style={{ color: "#B3B3B3" }}>•</span>
                            <span style={{ color: "#B3B3B3" }}>
                              Phase {movie.phase}
                            </span>
                          </div>
                          
                          <div className="flex items-center gap-2">
                            <Star size={14} fill={accentColor} color={accentColor} />
                            <span style={{ color: "#FFFFFF", fontWeight: 600 }}>
                              {movie.imdbRating}
                            </span>
                          </div>
                          
                          <div className="flex items-center gap-2">
                            <DollarSign size={14} color="#00FF7F" />
                            <span style={{ color: "#FFFFFF", fontWeight: 600 }}>
                              {movie.boxOffice}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Phase Badge */}
                    <div 
                      className="absolute top-3 left-3 px-2 py-1 rounded-md text-xs backdrop-blur-sm"
                      style={{ 
                        backgroundColor: "rgba(21, 21, 32, 0.9)",
                        color: accentColor,
                        fontWeight: 600,
                        border: `1px solid ${accentColor}60`,
                      }}
                    >
                      Phase {movie.phase}
                    </div>
                    
                    {/* Saga Badge */}
                    <div 
                      className="absolute top-3 right-3 px-2 py-1 rounded-md text-xs backdrop-blur-sm"
                      style={{ 
                        backgroundColor: movie.saga === "Infinity Saga" ? "rgba(225, 6, 0, 0.9)" : "rgba(106, 0, 255, 0.9)",
                        color: "#FFFFFF",
                        fontWeight: 600,
                      }}
                    >
                      {movie.saga.split(" ")[0]}
                    </div>
                  </motion.div>
                ))}
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  );
}