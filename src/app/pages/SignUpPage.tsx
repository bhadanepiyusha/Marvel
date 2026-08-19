import { motion } from "motion/react";
import { useState } from "react";
import { useNavigate } from "react-router";
import { UserPlus, Mail, Lock, User, Calendar, Upload, ArrowLeft } from "lucide-react";

export default function SignUpPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    dob: "",
    email: "",
    password: "",
  });
  const [profilePhoto, setProfilePhoto] = useState<string | null>(null);
  const [errors, setErrors] = useState({
    fullName: "",
    dob: "",
    email: "",
    password: "",
  });

  const getPasswordStrength = (password: string) => {
    if (password.length === 0) return { strength: 0, label: "" };
    if (password.length < 6) return { strength: 1, label: "Weak", color: "#FF4444" };
    if (password.length < 10) return { strength: 2, label: "Fair", color: "#FFA500" };
    if (password.length >= 10 && /[A-Z]/.test(password) && /[0-9]/.test(password)) {
      return { strength: 3, label: "Strong", color: "#00FF7F" };
    }
    return { strength: 2, label: "Fair", color: "#FFA500" };
  };

  const passwordStrength = getPasswordStrength(formData.password);

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePhoto(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    const newErrors = {
      fullName: "",
      dob: "",
      email: "",
      password: "",
    };
    
    if (!formData.fullName) {
      newErrors.fullName = "Full name is required";
    }
    
    if (!formData.dob) {
      newErrors.dob = "Date of birth is required";
    }
    
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }
    
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    
    setErrors(newErrors);
    
    if (!newErrors.fullName && !newErrors.dob && !newErrors.email && !newErrors.password) {
      // Success
      alert("Account created successfully! (This is a demo)");
      navigate("/login");
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

      {/* Sign Up Card */}
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
              <UserPlus size={28} color="#E10600" />
            </motion.div>
            
            <h1 
              className="text-3xl md:text-4xl mb-2"
              style={{ fontWeight: 700, color: "#FFFFFF" }}
            >
              Join Marvel Universe
            </h1>
            <p style={{ color: "#B3B3B3" }}>
              Create your account to start exploring
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Profile Photo Upload */}
            <div className="flex flex-col items-center mb-6">
              <div 
                className="relative w-24 h-24 rounded-full mb-3 overflow-hidden"
                style={{
                  backgroundColor: "#0F0F14",
                  border: "2px dashed #FFFFFF40",
                }}
              >
                {profilePhoto ? (
                  <img src={profilePhoto} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <User size={40} color="#808080" />
                  </div>
                )}
              </div>
              <label
                className="flex items-center gap-2 px-4 py-2 rounded-lg cursor-pointer transition-all duration-300"
                style={{
                  backgroundColor: "#0F0F14",
                  border: "1px solid #FFFFFF40",
                  color: "#E0E0E0",
                }}
                onMouseEnter={(e) => e.currentTarget.style.borderColor = "#E10600"}
                onMouseLeave={(e) => e.currentTarget.style.borderColor = "#FFFFFF40"}
              >
                <Upload size={18} />
                <span className="text-sm">Upload Photo</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoUpload}
                  className="hidden"
                />
              </label>
            </div>

            {/* Full Name */}
            <div>
              <label 
                htmlFor="fullName"
                className="block mb-2 text-sm"
                style={{ color: "#E0E0E0", fontWeight: 500 }}
              >
                Full Name
              </label>
              <div className="relative">
                <User 
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
                  id="fullName"
                  type="text"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  placeholder="Enter your full name"
                  className="w-full pl-12 pr-4 py-3 rounded-lg transition-all duration-300 outline-none"
                  style={{
                    backgroundColor: "#0F0F14",
                    border: `2px solid ${errors.fullName ? "#FF4444" : "#FFFFFF20"}`,
                    color: "#FFFFFF",
                  }}
                  onFocus={(e) => e.target.style.borderColor = "#E10600"}
                  onBlur={(e) => e.target.style.borderColor = errors.fullName ? "#FF4444" : "#FFFFFF20"}
                />
              </div>
              {errors.fullName && (
                <p className="mt-1 text-sm" style={{ color: "#FF4444" }}>
                  {errors.fullName}
                </p>
              )}
            </div>

            {/* Date of Birth */}
            <div>
              <label 
                htmlFor="dob"
                className="block mb-2 text-sm"
                style={{ color: "#E0E0E0", fontWeight: 500 }}
              >
                Date of Birth
              </label>
              <div className="relative">
                <Calendar 
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
                  id="dob"
                  type="date"
                  value={formData.dob}
                  onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                  className="w-full pl-12 pr-4 py-3 rounded-lg transition-all duration-300 outline-none"
                  style={{
                    backgroundColor: "#0F0F14",
                    border: `2px solid ${errors.dob ? "#FF4444" : "#FFFFFF20"}`,
                    color: "#FFFFFF",
                    colorScheme: "dark",
                  }}
                  onFocus={(e) => e.target.style.borderColor = "#E10600"}
                  onBlur={(e) => e.target.style.borderColor = errors.dob ? "#FF4444" : "#FFFFFF20"}
                />
              </div>
              {errors.dob && (
                <p className="mt-1 text-sm" style={{ color: "#FF4444" }}>
                  {errors.dob}
                </p>
              )}
            </div>

            {/* Email */}
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
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
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

            {/* Password */}
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
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  placeholder="Create a strong password"
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
              
              {/* Password Strength Indicator */}
              {formData.password && (
                <div className="mt-2">
                  <div className="flex gap-1 mb-1">
                    {[1, 2, 3].map((level) => (
                      <div
                        key={level}
                        className="h-1 flex-1 rounded-full transition-all duration-300"
                        style={{
                          backgroundColor: level <= passwordStrength.strength 
                            ? passwordStrength.color 
                            : "#FFFFFF20",
                        }}
                      />
                    ))}
                  </div>
                  <p className="text-xs" style={{ color: passwordStrength.color }}>
                    {passwordStrength.label}
                  </p>
                </div>
              )}
              
              {errors.password && (
                <p className="mt-1 text-sm" style={{ color: "#FF4444" }}>
                  {errors.password}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              className="w-full py-4 rounded-lg text-lg transition-all duration-300 mt-6"
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
              Create Account
            </motion.button>
          </form>

          {/* Login Link */}
          <div className="mt-8 text-center">
            <p style={{ color: "#B3B3B3" }}>
              Already have an account?{" "}
              <button
                onClick={() => navigate("/login")}
                className="transition-colors duration-300"
                style={{ color: "#E10600", fontWeight: 600 }}
                onMouseEnter={(e) => e.currentTarget.style.color = "#FF2020"}
                onMouseLeave={(e) => e.currentTarget.style.color = "#E10600"}
              >
                Sign In
              </button>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
