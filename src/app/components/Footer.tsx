import { motion } from "motion/react";
import { Facebook, Twitter, Instagram, Youtube } from "lucide-react";

interface FooterProps {
  accentColor: string;
}

export default function Footer({ accentColor }: FooterProps) {
  const socialLinks = [
    { icon: Facebook, label: "Facebook" },
    { icon: Twitter, label: "Twitter" },
    { icon: Instagram, label: "Instagram" },
    { icon: Youtube, label: "YouTube" },
  ];

  const quickLinks = [
    "About MCU",
    "Characters",
    "Movies",
    "Comics",
    "Privacy Policy",
  ];

  return (
    <footer className="py-16 px-8 border-t" style={{ backgroundColor: "#0A0A0F", borderColor: "#151520" }}>
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div>
            <h3 
              className="text-2xl mb-4"
              style={{ fontWeight: 700, color: "#FFFFFF" }}
            >
              Marvel Multiverse
            </h3>
            <p style={{ color: "#B3B3B3" }}>
              Explore the infinite possibilities across the Marvel Multiverse.
            </p>
          </div>
          
          {/* Quick Links */}
          <div>
            <h4 
              className="text-lg mb-4"
              style={{ fontWeight: 600, color: "#FFFFFF" }}
            >
              Quick Links
            </h4>
            <ul className="space-y-2">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <motion.a
                    href="#"
                    className="transition-colors duration-300"
                    style={{ color: "#B3B3B3" }}
                    whileHover={{ color: accentColor }}
                  >
                    {link}
                  </motion.a>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Social */}
          <div>
            <h4 
              className="text-lg mb-4"
              style={{ fontWeight: 600, color: "#FFFFFF" }}
            >
              Follow Us
            </h4>
            <div className="flex gap-4">
              {socialLinks.map((social, index) => {
                const Icon = social.icon;
                return (
                  <motion.a
                    key={index}
                    href="#"
                    className="w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300"
                    style={{ backgroundColor: "#151520" }}
                    whileHover={{ 
                      backgroundColor: accentColor,
                      scale: 1.1,
                    }}
                    whileTap={{ scale: 0.9 }}
                    aria-label={social.label}
                  >
                    <Icon size={20} color="#FFFFFF" />
                  </motion.a>
                );
              })}
            </div>
          </div>
        </div>
        
        {/* Bottom Bar */}
        <div 
          className="pt-8 border-t text-center"
          style={{ borderColor: "#151520", color: "#B3B3B3" }}
        >
          <p>
            © 2026 Marvel Studios. This is a fan-made tribute project. All rights reserved to Marvel.
          </p>
        </div>
      </div>
    </footer>
  );
}
