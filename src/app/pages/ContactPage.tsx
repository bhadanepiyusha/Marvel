import { motion } from "motion/react";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { useState } from "react";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <main
      className="min-h-screen pt-32 pb-24 px-8"
      style={{ backgroundColor: "#0A0A0F" }}
    >
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1
            className="text-5xl md:text-7xl mb-6"
            style={{
              fontWeight: 700,
              color: "#FFFFFF",
              textShadow: "0 0 30px rgba(200,16,46,0.4)",
            }}
          >
            Contact Us
          </h1>

          <p
            className="text-lg md:text-xl max-w-2xl mx-auto"
            style={{ color: "#B3B3B3" }}
          >
            Have a question, suggestion, or feedback?
            Get in touch with the Marvel Universe Explorer team.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2
              className="text-3xl mb-8"
              style={{
                fontWeight: 700,
                color: "#FFFFFF",
              }}
            >
              Get In Touch
            </h2>

            <p
              className="text-lg leading-relaxed mb-10"
              style={{ color: "#B3B3B3" }}
            >
              Whether you have feedback about the website, want to report
              an issue, or simply want to share your thoughts about the
              Marvel Universe, we'd love to hear from you.
            </p>

            <div className="space-y-6">

              {/* Email */}
              <div
                className="flex items-center gap-5 p-5 rounded-lg"
                style={{
                  backgroundColor: "#151520",
                  border: "1px solid rgba(255,255,255,0.08)",
                }}
              >
                <div
                  className="w-12 h-12 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: "#C8102E" }}
                >
                  <Mail size={22} color="#FFFFFF" />
                </div>

                <div>
                  <h3
                    className="text-lg mb-1"
                    style={{
                      color: "#FFFFFF",
                      fontWeight: 600,
                    }}
                  >
                    Email
                  </h3>

                  <p style={{ color: "#B3B3B3" }}>
                    contact@marveluniverse.com
                  </p>
                </div>
              </div>

              {/* Phone */}
              <div
                className="flex items-center gap-5 p-5 rounded-lg"
                style={{
                  backgroundColor: "#151520",
                  border: "1px solid rgba(255,255,255,0.08)",
                }}
              >
                <div
                  className="w-12 h-12 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: "#C8102E" }}
                >
                  <Phone size={22} color="#FFFFFF" />
                </div>

                <div>
                  <h3
                    className="text-lg mb-1"
                    style={{
                      color: "#FFFFFF",
                      fontWeight: 600,
                    }}
                  >
                    Phone
                  </h3>

                  <p style={{ color: "#B3B3B3" }}>
                    +91 98765 43210
                  </p>
                </div>
              </div>

              {/* Location */}
              <div
                className="flex items-center gap-5 p-5 rounded-lg"
                style={{
                  backgroundColor: "#151520",
                  border: "1px solid rgba(255,255,255,0.08)",
                }}
              >
                <div
                  className="w-12 h-12 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: "#C8102E" }}
                >
                  <MapPin size={22} color="#FFFFFF" />
                </div>

                <div>
                  <h3
                    className="text-lg mb-1"
                    style={{
                      color: "#FFFFFF",
                      fontWeight: 600,
                    }}
                  >
                    Location
                  </h3>

                  <p style={{ color: "#B3B3B3" }}>
                    Mumbai, Maharashtra, India
                  </p>
                </div>
              </div>

            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div
              className="p-8 rounded-xl"
              style={{
                backgroundColor: "#151520",
                border: "1px solid rgba(255,255,255,0.08)",
                boxShadow: "0 0 40px rgba(200,16,46,0.08)",
              }}
            >
              <h2
                className="text-3xl mb-8"
                style={{
                  fontWeight: 700,
                  color: "#FFFFFF",
                }}
              >
                Send a Message
              </h2>

              {submitted ? (
                <div
                  className="p-6 rounded-lg text-center"
                  style={{
                    backgroundColor: "rgba(200,16,46,0.15)",
                    border: "1px solid #C8102E",
                  }}
                >
                  <h3
                    className="text-2xl mb-2"
                    style={{
                      color: "#FFFFFF",
                      fontWeight: 700,
                    }}
                  >
                    Message Sent!
                  </h3>

                  <p style={{ color: "#B3B3B3" }}>
                    Thank you for contacting us.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">

                  {/* Name */}
                  <div>
                    <label
                      className="block mb-2"
                      style={{
                        color: "#FFFFFF",
                        fontWeight: 600,
                      }}
                    >
                      Name
                    </label>

                    <input
                      type="text"
                      placeholder="Enter your name"
                      required
                      className="w-full px-4 py-3 rounded-lg outline-none"
                      style={{
                        backgroundColor: "#0A0A0F",
                        color: "#FFFFFF",
                        border: "1px solid #2A2A35",
                      }}
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label
                      className="block mb-2"
                      style={{
                        color: "#FFFFFF",
                        fontWeight: 600,
                      }}
                    >
                      Email
                    </label>

                    <input
                      type="email"
                      placeholder="Enter your email"
                      required
                      className="w-full px-4 py-3 rounded-lg outline-none"
                      style={{
                        backgroundColor: "#0A0A0F",
                        color: "#FFFFFF",
                        border: "1px solid #2A2A35",
                      }}
                    />
                  </div>

                  {/* Subject */}
                  <div>
                    <label
                      className="block mb-2"
                      style={{
                        color: "#FFFFFF",
                        fontWeight: 600,
                      }}
                    >
                      Subject
                    </label>

                    <input
                      type="text"
                      placeholder="What is this about?"
                      required
                      className="w-full px-4 py-3 rounded-lg outline-none"
                      style={{
                        backgroundColor: "#0A0A0F",
                        color: "#FFFFFF",
                        border: "1px solid #2A2A35",
                      }}
                    />
                  </div>

                  {/* Message */}
                  <div>
                    <label
                      className="block mb-2"
                      style={{
                        color: "#FFFFFF",
                        fontWeight: 600,
                      }}
                    >
                      Message
                    </label>

                    <textarea
                      placeholder="Write your message..."
                      rows={5}
                      required
                      className="w-full px-4 py-3 rounded-lg outline-none resize-none"
                      style={{
                        backgroundColor: "#0A0A0F",
                        color: "#FFFFFF",
                        border: "1px solid #2A2A35",
                      }}
                    />
                  </div>

                  {/* Submit */}
                  <motion.button
                    type="submit"
                    className="w-full px-6 py-4 rounded-lg flex items-center justify-center gap-3"
                    style={{
                      backgroundColor: "#C8102E",
                      color: "#FFFFFF",
                      fontWeight: 600,
                    }}
                    whileHover={{
                      scale: 1.02,
                      boxShadow: "0 0 30px rgba(200,16,46,0.5)",
                    }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Send size={20} />
                    Send Message
                  </motion.button>

                </form>
              )}
            </div>
          </motion.div>

        </div>
      </div>
    </main>
  );
}