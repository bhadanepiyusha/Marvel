import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect } from "react";

interface HeroSlide {
  id: string;
  name: string;
  imageUrl: string;
  effectColor: string;
  description: string;
}

interface HeroIntroSequenceProps {
  onComplete: () => void;
}

export default function HeroIntroSequence({ onComplete }: HeroIntroSequenceProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showSequence, setShowSequence] = useState(true);

  const heroSlides: HeroSlide[] = [
    {
      id: "thor",
      name: "Thor",
      imageUrl: "https://images.unsplash.com/photo-1615413104177-43754b31d0e3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxUaG9yJTIwYmxvbmRlJTIwaGFpciUyMGhhbW1lciUyMGxpZ2h0bmluZyUyMHN0b3JtJTIwcGhvdG9yZWFsaXN0aWMlMjBjaW5lbWF0aWN8ZW58MXx8fHwxNzcyMjY4Mjg4fDA&ixlib=rb-4.1.0&q=80&w=1080",
      effectColor: "#1F80FF",
      description: "Lightning strike",
    },
    {
      id: "iron-man",
      name: "Iron Man",
      imageUrl: "https://images.unsplash.com/photo-1623984109227-443f400446f0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxJcm9uJTIwTWFuJTIwcmVkJTIwZ29sZCUyMGFybW9yJTIwYXJjJTIwcmVhY3RvciUyMHBob3RvcmVhbGlzdGljJTIwbWV0YWx8ZW58MXx8fHwxNzcyMjY4Mjg4fDA&ixlib=rb-4.1.0&q=80&w=1080",
      effectColor: "#E10600",
      description: "Arc reactor glow",
    },
    {
      id: "spider-man",
      name: "Spider-Man",
      imageUrl: "https://images.unsplash.com/photo-1635634429269-baa64e5f52b9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxTcGlkZXItTWFuJTIwcm9vZnRvcCUyMG5pZ2h0JTIwY2l0eSUyMHBob3RvcmVhbGlzdGljJTIwY2luZW1hdGljfGVufDF8fHx8MTc3MjI2ODI4OXww&ixlib=rb-4.1.0&q=80&w=1080",
      effectColor: "#DC143C",
      description: "Rooftop silhouette",
    },
    {
      id: "doctor-strange",
      name: "Doctor Strange",
      imageUrl: "https://images.unsplash.com/photo-1762190674294-58e4a7a40a35?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb3JjZXJlciUyMHdpemFyZCUyMG9yYW5nZSUyMG1hZ2ljJTIwc3BlbGwlMjBwaG90b3JlYWxpc3RpYyUyMGNpbmVtYXRpY3xlbnwxfHx8fDE3NzIyNjgyODl8MA&ixlib=rb-4.1.0&q=80&w=1080",
      effectColor: "#FF8C00",
      description: "Mystic arts",
    },
    {
      id: "hulk",
      name: "Hulk",
      imageUrl: "https://images.unsplash.com/photo-1638801371482-5d5c4690e8af?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtdXNjdWxhciUyMGdyZWVuJTIwZ2lhbnQlMjByZWFsaXN0aWMlMjBwb3dlcmZ1bCUyMGNpbmVtYXRpY3xlbnwxfHx8fDE3NzIyNjgyOTB8MA&ixlib=rb-4.1.0&q=80&w=1080",
      effectColor: "#32CD32",
      description: "Gamma power",
    },
    {
      id: "black-panther",
      name: "Black Panther",
      imageUrl: "https://images.unsplash.com/photo-1759211467953-fd11e5247c75?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxibGFjayUyMHBhbnRoZXIlMjB3YXJyaW9yJTIwc3VpdCUyMHBob3RvcmVhbGlzdGljJTIwY2luZW1hdGljfGVufDF8fHx8MTc3MjI2ODI5MHww&ixlib=rb-4.1.0&q=80&w=1080",
      effectColor: "#9B59B6",
      description: "Vibranium energy",
    },
    {
      id: "captain-marvel",
      name: "Captain Marvel",
      imageUrl: "https://images.unsplash.com/photo-1668674138535-3493f07b440f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21hbiUyMHN1cGVyaGVybyUyMGNvc21pYyUyMHBvd2VyZnVsJTIwcGhvdG9yZWFsaXN0aWMlMjBjaW5lbWF0aWN8ZW58MXx8fHwxNzcyMjY4Mjk0fDA&ixlib=rb-4.1.0&q=80&w=1080",
      effectColor: "#FFD700",
      description: "Cosmic energy",
    },
    {
      id: "avengers-team",
      name: "Avengers",
      imageUrl: "https://images.unsplash.com/photo-1694632094457-ccf9bc2ee823?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdXBlcmhlcm8lMjB0ZWFtJTIwYmF0dGxlJTIwZXhwbG9zaW9uJTIwcGhvdG9yZWFsaXN0aWMlMjBjaW5lbWF0aWN8ZW58MXx8fHwxNzcyMjY4MjkxfDA&ixlib=rb-4.1.0&q=80&w=1080",
      effectColor: "#E10600",
      description: "Earth's Mightiest Heroes",
    },
  ];

  useEffect(() => {
    if (currentIndex < heroSlides.length) {
      const timer = setTimeout(() => {
        setCurrentIndex(currentIndex + 1);
      }, 1600); // Each hero shows for 1.6s (800ms fade in + 800ms fade out)
      
      return () => clearTimeout(timer);
    } else {
      // Sequence complete, trigger callback
      const completeTimer = setTimeout(() => {
        setShowSequence(false);
        onComplete();
      }, 800);
      
      return () => clearTimeout(completeTimer);
    }
  }, [currentIndex, heroSlides.length, onComplete]);

  const currentHero = heroSlides[currentIndex];

  if (!showSequence) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden"
      style={{ 
        backgroundColor: "#0A0A0F",
        width: "100%",
        height: "100vh",
        position: "fixed",
        top: 0,
        left: 0,
      }}
    >
      {/* Smoke/Particles Background */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.05) 0%, transparent 50%)`,
        }}
      />

      <AnimatePresence mode="wait">
        {currentHero && (
          <motion.div
            key={currentHero.id}
            className="absolute inset-0 flex items-center justify-center"
            style={{
              position: "absolute",
              width: "100%",
              height: "100%",
              top: 0,
              left: 0,
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
          >
            {/* Hero Image */}
            <motion.div
              className="absolute inset-0"
              style={{
                position: "absolute",
                width: "100%",
                height: "100%",
                top: 0,
                left: 0,
              }}
              initial={{ scale: 1.1 }}
              animate={{ scale: 1 }}
              transition={{ duration: 1.6, ease: "easeOut" }}
            >
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage: `url('${currentHero.imageUrl}')`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  objectFit: "cover",
                  width: "100%",
                  height: "100%",
                  filter: "brightness(0.7) contrast(1.2)",
                }}
              />
              
              {/* Dark gradient overlay */}
              <div
                className="absolute inset-0"
                style={{
                  background: `radial-gradient(circle at center, transparent 0%, rgba(10,10,15,0.6) 60%, #0A0A0F 100%)`,
                }}
              />
            </motion.div>

            {/* Effect Glow */}
            <motion.div
              className="absolute inset-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0.6, 0] }}
              transition={{ duration: 1.6, times: [0, 0.3, 0.6, 1] }}
              style={{
                background: `radial-gradient(circle at center, ${currentHero.effectColor}40 0%, transparent 70%)`,
              }}
            />

            {/* Lightning/Energy Flash Effect for first hero (Thor) */}
            {currentHero.id === "thor" && (
              <motion.div
                className="absolute inset-0"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 0.3, times: [0, 0.5, 1] }}
                style={{
                  background: `radial-gradient(circle at center, ${currentHero.effectColor}80 0%, transparent 50%)`,
                  mixBlendMode: "screen",
                }}
              />
            )}

            {/* Arc Reactor Glow for Iron Man */}
            {currentHero.id === "iron-man" && (
              <motion.div
                className="absolute"
                style={{
                  width: "200px",
                  height: "200px",
                  left: "50%",
                  top: "50%",
                  transform: "translate(-50%, -50%)",
                }}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: [0, 1, 0.8, 0], scale: [0, 1, 1.2, 0] }}
                transition={{ duration: 1.6 }}
              >
                <div
                  className="w-full h-full rounded-full"
                  style={{
                    background: `radial-gradient(circle, ${currentHero.effectColor} 0%, transparent 70%)`,
                    boxShadow: `0 0 100px ${currentHero.effectColor}, 0 0 200px ${currentHero.effectColor}60`,
                  }}
                />
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Centered indicator (optional subtle hint) */}
      {currentIndex < heroSlides.length && (
        <motion.div
          className="absolute bottom-12 left-1/2 transform -translate-x-1/2 flex gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          transition={{ delay: 0.5 }}
        >
          {heroSlides.map((_, index) => (
            <div
              key={index}
              className="w-2 h-2 rounded-full"
              style={{
                backgroundColor: index === currentIndex ? "#FFFFFF" : "#FFFFFF40",
                transition: "all 0.3s ease",
              }}
            />
          ))}
        </motion.div>
      )}
    </div>
  );
}