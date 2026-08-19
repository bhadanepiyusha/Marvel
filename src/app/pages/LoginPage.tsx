import { motion } from "motion/react";
import { useState } from "react";
import { useNavigate } from "react-router";
import { LogIn, Mail, Lock, ArrowLeft } from "lucide-react";

export default function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ email: "", password: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    const newErrors = { email: "", password: "" };
    
    if (!email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Email is invalid";
    }
    
    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    
    setErrors(newErrors);
    
    if (!newErrors.email && !newErrors.password) {
      // Success - would normally call API here
      alert("Login successful! (This is a demo)");
      navigate("/");
    }
  };

  return (
    <div 
      className="min-h-screen w-full flex items-center justify-center px-4 py-12"
      style={{ backgroundColor: "#0A0A0F" }}
    >
      {/* Background Effects */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: "radial-gradient(circle at 20% 50%, #E1060060 0%, transparent 50%), radial-gradient(circle at 80% 50%, #1F80FF40 0%, transparent 50%)",
        }}
      />

      {/* Back Button */}
      <motion.button
        className="absolute top-8 left-8 flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300"
        style={{
          backgroundColor: "#151520",
          color: "#FFFFFF",
          border: "1px solid #FFFFFF20",
        }}
        whileHover={{ backgroundColor: "#1F1F2E", scale: 1.05 }}
        onClick={() => navigate("/")}
      >
        <ArrowLeft size={20} />
        <span>Back to Home</span>
      </motion.button>

      {/* Login Card */}
      <motion.div
        className="relative w-full max-w-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Glassmorphism Card */}
        <div
          className="relative rounded-2xl p-8 md:p-10"
          style={{
            backgroundColor: "#151520",
            backdropFilter: "blur(20px)",
            border: "1px solid #FFFFFF20",
            boxShadow: "0 8px 32px rgba(0, 0, 0, 0.4)",
          }}
        >
          {/* Header */}
          <div className="text-center mb-8">
            <motion.div
              className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4"
              style={{
                backgroundColor: "#E1060020",
                border: "2px solid #E10600",
              }}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
            >
              <LogIn size={28} color="#E10600" />
            </motion.div>
            
            <h1 
              className="text-3xl md:text-4xl mb-2"
              style={{ fontWeight: 700, color: "#FFFFFF" }}
            >
              Welcome Back
            </h1>
            <p style={{ color: "#B3B3B3" }}>
              Sign in to continue your Marvel journey
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div>
              <label 
                htmlFor="email"
                className="block mb-2 text-sm"
                style={{ color: "#E0E0E0", fontWeight: 500 }}
              >
                Email Address
              </label>
              <div className="relative">
                <Mail 
                  size={20} 
                  style={{ 
                    position: "absolute",
                    left: "16px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    color: "#808080",
                  }}
                />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your.email@example.com"
                  className="w-full pl-12 pr-4 py-3 rounded-lg transition-all duration-300 outline-none"
                  style={{
                    backgroundColor: "#0F0F14",
                    border: `2px solid ${errors.email ? "#FF4444" : "#FFFFFF20"}`,
                    color: "#FFFFFF",
                  }}
                  onFocus={(e) => e.target.style.borderColor = "#E10600"}
                  onBlur={(e) => e.target.style.borderColor = errors.email ? "#FF4444" : "#FFFFFF20"}
                />
              </div>
              {errors.email && (
                <p className="mt-1 text-sm" style={{ color: "#FF4444" }}>
                  {errors.email}
                </p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <label 
                htmlFor="password"
                className="block mb-2 text-sm"
                style={{ color: "#E0E0E0", fontWeight: 500 }}
              >
                Password
              </label>
              <div className="relative">
                <Lock 
                  size={20} 
                  style={{ 
                    position: "absolute",
                    left: "16px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    color: "#808080",
                  }}
                />
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full pl-12 pr-4 py-3 rounded-lg transition-all duration-300 outline-none"
                  style={{
                    backgroundColor: "#0F0F14",
                    border: `2px solid ${errors.password ? "#FF4444" : "#FFFFFF20"}`,
                    color: "#FFFFFF",
                  }}
                  onFocus={(e) => e.target.style.borderColor = "#E10600"}
                  onBlur={(e) => e.target.style.borderColor = errors.password ? "#FF4444" : "#FFFFFF20"}
                />
              </div>
              {errors.password && (
                <p className="mt-1 text-sm" style={{ color: "#FF4444" }}>
                  {errors.password}
                </p>
              )}
            </div>

            {/* Forgot Password */}
            <div className="flex justify-end">
              <button
                type="button"
                className="text-sm transition-colors duration-300"
                style={{ color: "#1F80FF" }}
                onClick={() => alert("Password reset functionality - Coming soon!")}
                onMouseEnter={(e) => e.currentTarget.style.color = "#4A9FFF"}
                onMouseLeave={(e) => e.currentTarget.style.color = "#1F80FF"}
              >
                Forgot Password?
              </button>
            </div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              className="w-full py-4 rounded-lg text-lg transition-all duration-300"
              style={{
                backgroundColor: "#E10600",
                color: "#FFFFFF",
                fontWeight: 600,
                boxShadow: "0 0 30px #E1060060",
              }}
              whileHover={{ 
                scale: 1.02,
                boxShadow: "0 0 40px #E1060080",
              }}
              whileTap={{ scale: 0.98 }}
            >
              Sign In
            </motion.button>
          </form>

          {/* Sign Up Link */}
          <div className="mt-8 text-center">
            <p style={{ color: "#B3B3B3" }}>
              Don't have an account?{" "}
              <button
                onClick={() => navigate("/signup")}
                className="transition-colors duration-300"
                style={{ color: "#E10600", fontWeight: 600 }}
                onMouseEnter={(e) => e.currentTarget.style.color = "#FF2020"}
                onMouseLeave={(e) => e.currentTarget.style.color = "#E10600"}
              >
                Sign Up
              </button>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
