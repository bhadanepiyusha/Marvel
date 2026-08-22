import { motion } from "motion/react";
import { useParams, useNavigate, useOutletContext } from "react-router";
import { Play, Star, DollarSign, Calendar, Clock, Film, Users, ExternalLink } from "lucide-react";
import { movies, characters } from "../data/marvelData";
import BackButton from "../components/BackButton";

interface OutletContext {
  accentColor: string;
}

export default function MovieDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { accentColor } = useOutletContext<OutletContext>();
  
  const movie = movies.find(m => m.id === id);
  
  if (!movie) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: "#0A0A0F" }}>
        <div className="text-center">
          <h1 className="text-4xl mb-4" style={{ fontWeight: 700, color: "#FFFFFF" }}>
            Movie Not Found
          </h1>
          <button
            onClick={() => navigate("/movies")}
            className="px-6 py-3 rounded-md"
            style={{ backgroundColor: accentColor, color: "#FFFFFF", fontWeight: 600 }}
          >
            Back to Movies
          </button>
        </div>
      </div>
    );
  }
  
  const relatedMovies = movies.filter(m => 
    m.id !== movie.id && (
      m.phase === movie.phase ||
      m.saga === movie.saga ||
      movie.relatedMovies.includes(m.id)
    )
  ).slice(0, 6);
  
  const connectedHeroes = characters.filter(c => 
    movie.connectedHeroes.includes(c.name)
  );

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#0A0A0F" }}>
      {/* Hero Banner with Backdrop */}
<section className="relative h-[80vh] overflow-hidden pt-20">  
        {/* Backdrop Image */}
        <div className="absolute inset-0">
          <img 
            src={movie.backdropUrl}
            alt={movie.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0F] via-[#0A0A0F]/80 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0F] via-transparent to-[#0A0A0F]" />
        </div>
        
        {/* Back Button */}
        <div className="absolute top-24 left-8 z-20">
          <BackButton accentColor={accentColor} to="/movies" />
        </div>
        
        {/* Movie Info Overlay */}
<div className="absolute bottom-8 left-0 right-0 p-8 md:p-16 z-10">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 items-end">
            {/* Poster */}
           {/* Poster */}
<motion.div 
  className="relative rounded-xl overflow-hidden mt-4 top-36"
  style={{ aspectRatio: "2/3" }}
  initial={{ opacity: 0, y: 30 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8 }}
>
  <img 
    src={movie.posterUrl}
    alt={movie.title}
    className="w-full h-full object-contain"
  />
</motion.div>
            
            {/* Info */}
            <div className="md:col-span-2">
              {/* Badges */}
              <motion.div 
                className="flex flex-wrap gap-3 mb-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <span 
                  className="px-4 py-2 rounded-full text-sm"
                  style={{ 
                    backgroundColor: `${accentColor}30`,
                    color: accentColor,
                    fontWeight: 600,
                    border: `2px solid ${accentColor}60`,
                  }}
                >
                  Phase {movie.phase}
                </span>
                <span 
                  className="px-4 py-2 rounded-full text-sm"
                  style={{ 
                    backgroundColor: movie.saga === "Infinity Saga" ? "rgba(225, 6, 0, 0.3)" : "rgba(255, 215, 0, 0.3)",
                    color: movie.saga === "Infinity Saga" ? "#E10600" : "#FFD700",
                    fontWeight: 600,
                    border: `2px solid ${movie.saga === "Infinity Saga" ? "#E10600" : "#FFD700"}60`,
                  }}
                >
                  {movie.saga}
                </span>
                <span 
                  className="px-4 py-2 rounded-full text-sm"
                  style={{ 
                    backgroundColor: "rgba(255, 255, 255, 0.1)",
                    color: "#FFFFFF",
                    fontWeight: 600,
                  }}
                >
                  {movie.rating}
                </span>
              </motion.div>
              
              <motion.h1 
                className="text-5xl md:text-7xl mb-4"
                style={{ 
                  fontWeight: 700,
                  color: "#FFFFFF",
                  textShadow: "0 4px 20px rgba(0,0,0,0.8)",
                }}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                {movie.title}
              </motion.h1>
              
              <motion.div 
                className="flex flex-wrap items-center gap-4 mb-6 text-lg"
                style={{ color: "#B3B3B3" }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <span style={{ color: accentColor, fontWeight: 600 }}>{movie.year}</span>
                <span>•</span>
                <span>{movie.runtime}</span>
                <span>•</span>
                <span>In-Universe: {movie.inUniverseYear}</span>
              </motion.div>
              
              <motion.div 
                className="flex flex-wrap gap-2 mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
              >
                {movie.genre.map((g, i) => (
                  <span 
                    key={i}
                    className="px-3 py-1 rounded-md text-sm"
                    style={{ 
                      backgroundColor: "rgba(255, 255, 255, 0.1)",
                      color: "#FFFFFF",
                    }}
                  >
                    {g}
                  </span>
                ))}
              </motion.div>
              
              <motion.button
                className="px-12 py-4 rounded-lg flex items-center gap-3 transition-all duration-300"
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
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                onClick={() => {
  if (movie.trailerUrl) {
    window.open(movie.trailerUrl, "_blank");
  }
}}
              >
                <Play size={24} fill="#FFFFFF" />
                Watch Trailer
                {movie.id === "captain-marvel" && (
                  <ExternalLink size={18} />
                )}
              </motion.button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Movie Details */}
      <section className="py-16 px-8" style={{ backgroundColor: "#0F0F14" }}>
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Info */}
            <div className="lg:col-span-2 space-y-8">
              {/* Synopsis */}
              <div>
                <h2 className="text-3xl mb-4" style={{ fontWeight: 700, color: "#FFFFFF" }}>
                  Synopsis
                </h2>
                <p className="text-lg leading-relaxed" style={{ color: "#B3B3B3" }}>
                  {movie.plotSummary}
                </p>
              </div>
              
              {/* Director & Cast */}
              <div>
                <h3 className="text-2xl mb-4" style={{ fontWeight: 700, color: "#FFFFFF" }}>
                  Director
                </h3>
                <div className="flex items-center gap-3 mb-6">
                  <Film size={24} color={accentColor} />
                  <span className="text-lg" style={{ color: "#FFFFFF", fontWeight: 600 }}>
                    {movie.director}
                  </span>
                </div>
                
                <h3 className="text-2xl mb-4" style={{ fontWeight: 700, color: "#FFFFFF" }}>
                  Main Cast
                </h3>
                <div className="flex flex-wrap gap-3">
                  {movie.mainCast.map((actor, i) => (
                    <span 
                      key={i}
                      className="px-4 py-2 rounded-lg"
                      style={{ 
                        backgroundColor: "#151520",
                        color: "#FFFFFF",
                        fontWeight: 500,
                      }}
                    >
                      {actor}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Stats Sidebar */}
            <div className="space-y-6">
              <div className="p-6 rounded-xl" style={{ backgroundColor: "#151520" }}>
                <h3 className="text-2xl mb-6" style={{ fontWeight: 700, color: "#FFFFFF" }}>
                  Movie Stats
                </h3>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between pb-4 border-b" style={{ borderColor: "rgba(255,255,255,0.1)" }}>
                    <div className="flex items-center gap-2">
                      <DollarSign size={20} color="#00FF7F" />
                      <span style={{ color: "#B3B3B3" }}>Budget</span>
                    </div>
                    <span style={{ color: "#FFFFFF", fontWeight: 600 }}>
                      {movie.budget}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between pb-4 border-b" style={{ borderColor: "rgba(255,255,255,0.1)" }}>
                    <div className="flex items-center gap-2">
                      <DollarSign size={20} color={accentColor} />
                      <span style={{ color: "#B3B3B3" }}>Box Office</span>
                    </div>
                    <span style={{ color: "#FFFFFF", fontWeight: 600 }}>
                      {movie.boxOffice}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between pb-4 border-b" style={{ borderColor: "rgba(255,255,255,0.1)" }}>
                    <div className="flex items-center gap-2">
                      <Star size={20} fill={accentColor} color={accentColor} />
                      <span style={{ color: "#B3B3B3" }}>IMDb Rating</span>
                    </div>
                    <span style={{ color: "#FFFFFF", fontWeight: 600 }}>
                      {movie.imdbRating}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between pb-4 border-b" style={{ borderColor: "rgba(255,255,255,0.1)" }}>
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 rounded-full" style={{ backgroundColor: "#FF6347" }} />
                      <span style={{ color: "#B3B3B3" }}>RT Score</span>
                    </div>
                    <span style={{ color: "#FFFFFF", fontWeight: 600 }}>
                      {movie.rottenTomatoes}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between pb-4 border-b" style={{ borderColor: "rgba(255,255,255,0.1)" }}>
                    <div className="flex items-center gap-2">
                      <Clock size={20} color={accentColor} />
                      <span style={{ color: "#B3B3B3" }}>Runtime</span>
                    </div>
                    <span style={{ color: "#FFFFFF", fontWeight: 600 }}>
                      {movie.runtime}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Calendar size={20} color={accentColor} />
                      <span style={{ color: "#B3B3B3" }}>Release Year</span>
                    </div>
                    <span style={{ color: "#FFFFFF", fontWeight: 600 }}>
                      {movie.year}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Connected Heroes */}
      {connectedHeroes.length > 0 && (
        <section className="py-16 px-8" style={{ backgroundColor: "#0A0A0F" }}>
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl mb-8 flex items-center gap-3" style={{ fontWeight: 700, color: "#FFFFFF" }}>
              <Users size={32} color={accentColor} />
              Connected Heroes
            </h2>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {connectedHeroes.map((hero, index) => (
                <motion.div
                  key={hero.id}
                  className="relative group cursor-pointer overflow-hidden rounded-lg"
                  style={{ aspectRatio: "3/4", backgroundColor: "#151520" }}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  whileHover={{ scale: 1.05 }}
                  onClick={() => navigate(`/character/${hero.id}`)}
                >
                  <img 
                    src={hero.imageUrl}
                    alt={hero.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-2 left-2 right-2">
                      <p className="text-sm" style={{ fontWeight: 700, color: "#FFFFFF" }}>
                        {hero.name}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}
      
      {/* Related Movies */}
      {relatedMovies.length > 0 && (
        <section className="py-16 px-8" style={{ backgroundColor: "#0F0F14" }}>
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl mb-8" style={{ fontWeight: 700, color: "#FFFFFF" }}>
              Related Movies
            </h2>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {relatedMovies.map((relMovie, index) => (
                <motion.div
                  key={relMovie.id}
                  className="relative group cursor-pointer overflow-hidden rounded-lg"
                  style={{ aspectRatio: "2/3", backgroundColor: "#151520" }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.05 }}
                  whileHover={{ 
                    scale: 1.05,
                    boxShadow: `0 0 20px ${accentColor}40`,
                  }}
                  onClick={() => navigate(`/movie/${relMovie.id}`)}
                >
                  <img 
                    src={relMovie.posterUrl}
                    alt={relMovie.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-2 left-2 right-2">
                      <p className="text-sm line-clamp-2" style={{ fontWeight: 700, color: "#FFFFFF" }}>
                        {relMovie.title}
                      </p>
                      <p className="text-xs" style={{ color: accentColor, fontWeight: 600 }}>
                        {relMovie.year}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}