import { motion } from "motion/react";
import { Link, useLocation } from "react-router";
import { Menu, X } from "lucide-react";
import { useState } from "react";

interface NavigationProps {
  accentColor: string;
}

export default function Navigation({ accentColor }: NavigationProps) {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { label: "Home", path: "/" },
    { label: "Timeline", path: "/timeline" },
    { label: "Heroes", path: "/heroes" },
    { label: "Movies", path: "/movies" },
  ];

  const isActive = (path: string) => {
    if (path === "/") {
      return location.pathname === "/";
    }
    return location.pathname.startsWith(path);
  };

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50 px-8 py-4"
      style={{
        backgroundColor: "rgba(10, 10, 15, 0.95)",
        backdropFilter: "blur(10px)",
        borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
      }}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Brand */}
        <Link to="/">
          <motion.div
            className="px-6 py-2 rounded cursor-pointer"
            style={{
              backgroundColor: "#C8102E",
              color: "#FFFFFF",
              fontWeight: 900,
              fontSize: "1.75rem",
              letterSpacing: "-0.02em",
              fontFamily: "'Arial Black', 'Arial Bold', sans-serif",
              textTransform: "uppercase",
              lineHeight: 1,
            }}
            whileHover={{
              backgroundColor: "#A00D25",
            }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.2 }}
          >
            MARVEL
          </motion.div>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <Link key={item.path} to={item.path}>
              <motion.div
                className="relative py-2 cursor-pointer"
                style={{
                  color: isActive(item.path) ? accentColor : "#FFFFFF",
                  fontWeight: 600,
                  fontSize: "1rem",
                }}
                whileHover={{
                  color: accentColor,
                }}
                transition={{ duration: 0.3 }}
              >
                {item.label}
                {isActive(item.path) && (
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-0.5"
                    style={{ backgroundColor: accentColor }}
                    layoutId="activeTab"
                    transition={{ duration: 0.3 }}
                  />
                )}
              </motion.div>
            </Link>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? (
            <X size={28} color="#FFFFFF" />
          ) : (
            <Menu size={28} color="#FFFFFF" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <motion.div
          className="md:hidden mt-4 pt-4 border-t"
          style={{ borderColor: "rgba(255, 255, 255, 0.1)" }}
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
        >
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setMobileMenuOpen(false)}
            >
              <div
                className="py-3 px-4 rounded-md mb-2"
                style={{
                  backgroundColor: isActive(item.path)
                    ? `${accentColor}20`
                    : "transparent",
                  color: isActive(item.path) ? accentColor : "#FFFFFF",
                  fontWeight: 600,
                }}
              >
                {item.label}
              </div>
            </Link>
          ))}
        </motion.div>
      )}
    </motion.nav>
  );
}