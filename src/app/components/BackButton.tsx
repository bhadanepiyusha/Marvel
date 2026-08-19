import { motion } from "motion/react";
import { useNavigate } from "react-router";
import { ArrowLeft } from "lucide-react";

interface BackButtonProps {
  accentColor: string;
  to?: string;
}

export default function BackButton({ accentColor, to }: BackButtonProps) {
  const navigate = useNavigate();

  const handleClick = () => {
    if (to) {
      navigate(to);
    } else {
      navigate(-1);
    }
  };

  return (
    <motion.button
      className="flex items-center gap-2 px-4 py-3 rounded-lg transition-all duration-300"
      style={{
        backgroundColor: "rgba(21, 21, 32, 0.6)",
        color: "#E0E0E0",
        fontWeight: 500,
        fontSize: "0.95rem",
        border: "1px solid rgba(255, 255, 255, 0.1)",
        backdropFilter: "blur(10px)",
      }}
      onClick={handleClick}
      whileHover={{
        scale: 1.05,
        backgroundColor: "rgba(21, 21, 32, 0.9)",
        boxShadow: `0 0 20px ${accentColor}40`,
        borderColor: `${accentColor}60`,
        color: "#FFFFFF",
      }}
      whileTap={{
        scale: 0.95,
        backgroundColor: "rgba(10, 10, 15, 0.9)",
      }}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
    >
      <ArrowLeft size={18} />
      <span>Back</span>
    </motion.button>
  );
}
