import React, { useEffect, useRef, useState } from "react";
import {
  Play,
  Shield,
  Zap,
  Users,
  CheckCircle,
  Menu,
  X,
  Search,
  MessageSquare,
  Lightbulb,
  Layers,
  Compass,
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useNavigate } from "react-router-dom";

gsap.registerPlugin(ScrollTrigger);

function App() {
  const headerRef = useRef(null);
  const heroRef = useRef(null);
  const howItWorksRef = useRef(null);
  const featuresRef = useRef(null);
  const testimonialsRef = useRef(null);
  const ctaRef = useRef(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const scrollToSection = (elementRef) => {
    setMobileMenuOpen(false);
    if (elementRef.current) {
      window.scrollTo({
        top: elementRef.current.offsetTop - 100,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    console.log("App component mounted");

    try {
      gsap.fromTo(
        ".hero-title",
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
      );
      gsap.fromTo(
        ".hero-subtitle",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1, delay: 0.3, ease: "power3.out" }
      );
      gsap.fromTo(
        ".hero-cta",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1, delay: 0.6, ease: "power3.out" }
      );
      gsap.fromTo(
        ".hero-image",
        { opacity: 0, scale: 0.9 },
        { opacity: 1, scale: 1, duration: 1.2, delay: 0.3, ease: "power3.out" }
      );

      // Scroll-triggered animations with null checks
      if (howItWorksRef.current) {
        gsap.from(".how-it-works-card", {
          scrollTrigger: {
            trigger: howItWorksRef.current,
            start: "top 80%",
          },
          y: 50,
          opacity: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: "power3.out",
        });
      }

      if (featuresRef.current) {
        gsap.from(".feature-card", {
          scrollTrigger: {
            trigger: featuresRef.current,
            start: "top 80%",
          },
          y: 50,
          opacity: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: "power3.out",
        });
      }

      if (testimonialsRef.current) {
        gsap.from(".testimonial-card", {
          scrollTrigger: {
            trigger: testimonialsRef.current,
            start: "top 80%",
          },
          y: 30,
          opacity: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: "power3.out",
        });
      }

      if (ctaRef.current) {
        gsap.from(".cta-content", {
          scrollTrigger: {
            trigger: ctaRef.current,
            start: "top 80%",
          },
          y: 30,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
        });
      }

      const handleScroll = () => {
        if (headerRef.current) {
          if (window.scrollY > 50) {
            headerRef.current.classList.add(
              "bg-gray-900/95",
              "backdrop-blur-md",
              "shadow-lg"
            );
          } else {
            headerRef.current.classList.remove(
              "bg-gray-900/95",
              "backdrop-blur-md",
              "shadow-lg"
            );
          }
        }
      };

      window.addEventListener("scroll", handleScroll);
      return () => {
        window.removeEventListener("scroll", handleScroll);
        ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      };
    } catch (error) {
      console.error("Error in GSAP animations:", error);
    }
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#0A0F1C] text-white">
      <div className="absolute top-0 left-0 w-96 h-96 bg-[#152040] rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#0A0F1C] rounded-full blur-3xl animate-pulse animation-delay-2000"></div>
      <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-[#0A0F1C] rounded-full blur-3xl animate-pulse animation-delay-4000"></div>

      <header
        ref={headerRef}
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 py-4 md:px-12"
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <img
              src="https://res.cloudinary.com/dvukdxs2m/image/upload/v1739785683/tubeio-dark_huj4uc.png"
              alt="website logo"
              className="h-8 w-auto"
              loading="lazy"
              onError={(e) => (e.target.src = "/fallback-logo.png")} // Add a fallback image
            />
          </div>

          <nav className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => scrollToSection(howItWorksRef)}
              className="text-gray-200 hover:text-white transition-colors"
            >
              How It Works
            </button>
            <button
              onClick={() => scrollToSection(featuresRef)}
              className="text-gray-200 hover:text-white transition-colors"
            >
              Features
            </button>
            <button
              onClick={() => scrollToSection(testimonialsRef)}
              className="text-gray-200 hover:text-white transition-colors"
            >
              Testimonials
            </button>
            <button
              onClick={() => navigate("/auth")}
              className="cursor-pointer bg-gradient-to-r from-[#263580] to-blue-500 text-white px-5 py-2 rounded-lg font-semibold text-lg hover:from-blue-600 hover:to-[#263580] transition-colors"
            >
              Login
            </button>
          </nav>

          <button
            className="md:hidden text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-gray-900/95 backdrop-blur-md p-6 flex flex-col space-y-4">
            <button
              onClick={() => scrollToSection(howItWorksRef)}
              className="text-gray-200 hover:text-white transition-colors text-left"
            >
              How It Works
            </button>
            <button
              onClick={() => scrollToSection(featuresRef)}
              className="text-gray-200 hover:text-white transition-colors text-left"
            >
              Features
            </button>
            <button
              onClick={() => scrollToSection(testimonialsRef)}
              className="text-gray-200 hover:text-white transition-colors text-left"
            >
              Testimonials
            </button>
            <button
              onClick={() => navigate("/auth")}
              className="cursor-pointer bg-gradient-to-r from-[#263580] to-blue-500 text-white px-5 py-2 rounded-lg font-semibold text-lg hover:from-blue-600 hover:to-[#263580] transition-colors"
            >
              Login
            </button>
          </div>
        )}
      </header>

      <section
        ref={heroRef}
        className="pt-32 pb-20 md:pt-40 md:pb-32 px-6 md:px-12"
      >
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="hero-title text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-6 tracking-tight">
              Focus on content that{" "}
              <span className="relative">
                <span className="bg-gradient-to-r from-[#1b4ed0] to-[#5473c1] bg-clip-text text-transparent">
                  matters
                </span>
                <span className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-[#1b4ed0] to-[#5473c1] opacity-50"></span>
              </span>
            </h1>
            <p className="hero-subtitle text-lg md:text-xl text-gray-300 mb-8 max-w-lg leading-relaxed">
              TubeIO eliminates distractions and helps you discover productive
              video content tailored to your interests.
            </p>
            <div className="hero-cta flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <button onClick={() => navigate("/auth")} className="relative px-4 py-3 rounded-lg w-[140px] cursor-pointer transition-all duration-300 ease-in-out bg-gradient-to-r from-[#2563eb] to-[#3b82f6] text-white font-medium shadow-lg hover:from-[#1e40af] hover:to-[#1d4ed8] hover:scale-105 active:scale-95 overflow-hidden group">
                <span className="relative z-10">Get Started</span>
                <div className="absolute inset-0 bg-gradient-to-r from-white/30 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 ease-in-out transform -translate-x-full group-hover:translate-x-0"></div>
              </button>
            </div>
          </div>
          <div className="hero-image relative">
            <div className="bg-gray-800/50 backdrop-blur-md rounded-xl overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                alt="TubeIO interface"
                className="w-full h-auto rounded-xl"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 bg-gray-800/50 backdrop-blur-md p-4 rounded-lg animate-levitate">
              <div className="flex items-center space-x-2">
                <Shield className="h-5 w-5 text-blue-400" />
                <span className="text-sm font-medium">
                  Distraction-free viewing
                </span>
              </div>
            </div>
            <div className="absolute -top-6 -left-6 bg-gray-800/50 backdrop-blur-md p-4 rounded-lg animate-levitate animation-delay-1000">
              <div className="flex items-center space-x-2">
                <Zap className="h-5 w-5 text-blue-400" />
                <span className="text-sm font-medium">Focused content</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        ref={howItWorksRef}
        className="py-20 px-6 md:px-12 bg-gradient-to-b from-transparent to-gray-900/50"
      >
        <div className="max-w-7xl mx-auto text-center mb-16">
          <h2 className="hero-title text-3xl md:text-4xl lg:text-5xl font-extrabold leading-[3rem] mb-6 tracking-tight">
            How{" "}
            <span className="relative">
              <span className="bg-gradient-to-r from-[#1b4ed0] to-[#5473c1] bg-clip-text text-transparent">
                TubeIO
              </span>
              <span className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-[#1b4ed0] to-[#5473c1] opacity-50"></span>
            </span>{" "}
            Helps You Focus
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            We've reimagined video content consumption to eliminate distractions
            and help you focus on what truly matters.
          </p>
        </div>

        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8">
          <div className="how-it-works-card bg-gray-800/50 backdrop-blur-md p-8 rounded-xl text-center">
            <div className="bg-blue-500/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
              <Shield className="h-8 w-8 text-blue-400" />{" "}
            </div>
            <h3 className="text-xl font-bold mb-4">Distraction-Free UI</h3>
            <p className="text-gray-300">
              Our clean interface removes attention-grabbing elements,
              notifications, and endless recommendations.
            </p>
          </div>

          <div className="how-it-works-card bg-gray-800/50 backdrop-blur-md p-8 rounded-xl text-center">
            <div className="bg-blue-500/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
              <Zap className="h-8 w-8 text-blue-400" />{" "}
            </div>
            <h3 className="text-xl font-bold mb-4">Personalized Feed</h3>
            <p className="text-gray-300">
              Content tailored to your specific interests and learning goals,
              not what algorithms think will keep you watching.
            </p>
          </div>

          <div className="how-it-works-card bg-gray-800/50 backdrop-blur-md p-8 rounded-xl text-center">
            <div className="bg-blue-500/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
              <Users className="h-8 w-8 text-blue-400" />{" "}
            </div>
            <h3 className="text-xl font-bold mb-4">
              Focus-Driven Recommendations
            </h3>
            <p className="text-gray-300">
              Discover content that helps you learn and grow, not content
              designed to maximize watch time.
            </p>
          </div>
        </div>
      </section>

      <section id="features" ref={featuresRef} className="py-20 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Key Features
            </h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              TubeIO is designed from the ground up to help you focus on content
              that matters.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                Icon: Compass,
                title: "Personalized Niche-Based Feed",
                desc: "Select your interests, and TubeIO curates relevant, high-quality videos tailored specifically to you.",
                items: [
                  "Interest-based content curation",
                  "Quality-focused recommendations",
                  "Personalized learning paths",
                ],
              },
              {
                Icon: Shield,
                title: "Distraction-Free Experience",
                desc: "No entertainment mode, no clutter—just focused content that helps you achieve your goals.",
                items: [
                  "Clean, minimal interface",
                  "No addictive recommendation loops",
                  "Focus-enhancing viewing mode",
                ],
              },
              {
                Icon: Layers,
                title: "Multi-Step Onboarding",
                desc: "Answer a few questions to tailor your experience and get a perfectly customized content feed from day one.",
                items: [
                  "Personalized setup process",
                  "Interest and goal mapping",
                  "Continuous preference learning",
                ],
              },
              {
                Icon: Lightbulb,
                title: "Daily Motivation Card",
                desc: "Start each day with a small boost of inspiration through proverbs or motivational quotes.",
                items: [
                  "Personalized daily inspiration",
                  "Goal-aligned motivational content",
                  "Shareable wisdom cards",
                ],
              },
              {
                Icon: Search,
                title: "Smart Search & Categorization",
                desc: "Easily find the best content within your niche with intelligent search and organization tools.",
                items: [
                  "Advanced content filtering",
                  "Topic-based organization",
                  "Quality-ranked search results",
                ],
              },
              {
                Icon: MessageSquare,
                title: "Progress Tracking",
                desc: "Track your learning journey and see how you're growing with detailed insights and progress reports.",
                items: [
                  "Learning analytics",
                  "Topic mastery tracking",
                  "Weekly focus reports",
                ],
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="feature-card group bg-gray-800/50 backdrop-blur-md p-8 rounded-xl relative overflow-hidden transition-all duration-300 hover:shadow-xl"
              >
                <div className="absolute inset-0 bg-blue-500/10 transform scale-0 group-hover:scale-100 transition-transform duration-300 origin-center rounded-xl"></div>
                <div className="relative z-10 flex items-start space-x-4">
                  <div className="bg-blue-500/10 w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 group-hover:bg-blue-500/20 transition-colors duration-300">
                    <feature.Icon className="h-6 w-6 text-blue-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                    <p className="text-gray-300 mb-4">{feature.desc}</p>
                    <ul className="space-y-2">
                      {feature.items.map((item, i) => (
                        <li key={i} className="flex items-center space-x-2">
                          <CheckCircle className="h-4 w-4 text-blue-400" />
                          <span className="text-sm text-gray-300">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        id="testimonials"
        ref={testimonialsRef}
        className="py-20 px-6 md:px-12 bg-gradient-to-b from-gray-900/50 to-transparent"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              What Our Users Say
            </h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Join thousands of users who have transformed their online learning
              experience with TubeIO.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="testimonial-card bg-gray-800/50 backdrop-blur-md p-8 rounded-xl">
              <div className="flex items-center space-x-4 mb-6">
                <img
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100&q=80"
                  alt="User avatar"
                  className="w-12 h-12 rounded-full object-cover"
                  loading="lazy"
                  onError={(e) => (e.target.src = "/fallback-avatar.png")} // Add a fallback image
                />
                <div>
                  <h4 className="font-bold">Sarah Johnson</h4>
                  <p className="text-sm text-gray-300">Software Developer</p>
                </div>
              </div>
              <p className="text-gray-300">
                "TubeIO has completely changed how I learn online. I'm no longer
                distracted by endless recommendations and can focus on content
                that actually helps me grow as a developer."
              </p>
            </div>

            <div className="testimonial-card bg-gray-800/50 backdrop-blur-md p-8 rounded-xl">
              <div className="flex items-center space-x-4 mb-6">
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100&q=80"
                  alt="User avatar"
                  className="w-12 h-12 rounded-full object-cover"
                  loading="lazy"
                  onError={(e) => (e.target.src = "/fallback-avatar.png")} // Add a fallback image
                />
                <div>
                  <h4 className="font-bold">Michael Chen</h4>
                  <p className="text-sm text-gray-300">Medical Student</p>
                </div>
              </div>
              <p className="text-gray-300">
                "As a medical student, I need to be efficient with my study
                time. TubeIO helps me find high-quality educational content
                without falling into the rabbit hole of distractions."
              </p>
            </div>

            <div className="testimonial-card bg-gray-800/50 backdrop-blur-md p-8 rounded-xl">
              <div className="flex items-center space-x-4 mb-6">
                <img
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100&q=80"
                  alt="User avatar"
                  className="w-12 h-12 rounded-full object-cover"
                  loading="lazy"
                  onError={(e) => (e.target.src = "/fallback-avatar.png")} // Add a fallback image
                />
                <div>
                  <h4 className="font-bold">Emily Rodriguez</h4>
                  <p className="text-sm text-gray-300">Content Creator</p>
                </div>
              </div>
              <p className="text-gray-300">
                "Not only has TubeIO helped me consume better content, but it's
                also changed how I create. I now focus on delivering value
                rather than optimizing for algorithms."
              </p>
            </div>
          </div>
        </div>
      </section>

      <section ref={ctaRef} className="py-20 px-6 md:px-12">
        <div className="max-w-4xl mx-auto bg-gray-800/50 backdrop-blur-md p-12 rounded-2xl text-center relative overflow-hidden">
          <div className="cta-content relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Focus on What Matters?
            </h2>
            <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
              Join TubeIO today and transform your online video experience.
              Start focusing on content that helps you learn, grow, and achieve
              your goals.
            </p>
            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <button
                onClick={() => navigate("/auth")}
                className="relative px-4 py-3 rounded-lg w-[140px] cursor-pointer transition-all duration-300 ease-in-out bg-gradient-to-r from-[#2563eb] to-[#3b82f6] text-white font-medium shadow-lg hover:from-[#1e40af] hover:to-[#1d4ed8] hover:scale-105 active:scale-95 overflow-hidden group"
              >
                <span className="relative z-10">Get Started</span>
                <div className="absolute inset-0 bg-gradient-to-r from-white/30 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 ease-in-out transform -translate-x-full group-hover:translate-x-0"></div>
              </button>
            </div>
          </div>

          <div className="absolute -top-24 -right-24 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-32 -left-32 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl"></div>
        </div>
      </section>

      <footer className="py-12 px-6 md:px-12 border-t border-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            <div>
              <div className="flex items-center space-x-2 mb-6">
                <img src="https://res.cloudinary.com/dvukdxs2m/image/upload/v1739785683/tubeio-dark_huj4uc.png" alt="Logo" className="h-6" />
              </div>
              <p className="text-gray-300">
                The distraction-free video platform focused on productive
                content.
              </p>
            </div>

            <div>
              <h4 className="font-bold mb-4">Product</h4>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    Features
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    Pricing
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    FAQ
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-4">Company</h4>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    About
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    Blog
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    Careers
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-300 text-sm mb-4 md:mb-0">
              © 2025 TubeIO. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <a
                href="#"
                className="text-gray-300 hover:text-white transition-colors"
              >
                <svg
                  className="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
              <a
                href="#"
                className="text-gray-300 hover:text-white transition-colors"
              >
                <svg
                  className="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
              <a
                href="#"
                className="text-gray-300 hover:text-white transition-colors"
              >
                <svg
                  className="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
              <a
                href="#"
                className="text-gray-300 hover:text-white transition-colors"
              >
                <svg
                  className="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
