import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import HeroSection from "../components/HeroSection";
import CharacterNavigation from "../components/CharacterNavigation";
import TimelineSection from "../components/TimelineSection";
import MultiverseSwitcher from "../components/MultiverseSwitcher";
import MovieShowcase from "../components/MovieShowcase";
import Footer from "../components/Footer";
import { Universe, universeThemes } from "../data/marvelData";

export default function Home() {
  const [currentUniverse, setCurrentUniverse] = useState<Universe>("earth-616");
  
  const currentTheme = universeThemes.find(theme => theme.id === currentUniverse) || universeThemes[0];

  return (
    <AnimatePresence mode="wait">
      <motion.div 
        key={currentUniverse}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        style={{ backgroundColor: "#0A0A0F" }}
      >
        <HeroSection 
          accentColor={currentTheme.accentColor}
          gradientFrom={currentTheme.gradientFrom}
        />
        
        <CharacterNavigation 
          accentColor={currentTheme.accentColor}
        />
        
        <TimelineSection 
          accentColor={currentTheme.accentColor}
        />
        
        <MultiverseSwitcher 
          currentUniverse={currentUniverse}
          onUniverseChange={setCurrentUniverse}
        />
        
        <MovieShowcase 
          accentColor={currentTheme.accentColor}
        />
        
        <Footer 
          accentColor={currentTheme.accentColor}
        />
      </motion.div>
    </AnimatePresence>
  );
}
