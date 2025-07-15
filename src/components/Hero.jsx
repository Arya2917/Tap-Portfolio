import { useState, useEffect } from "react";
import { ChevronDown, Github, Linkedin, Mail } from "lucide-react";
import NeuralCanvasBackground from "../hooks/canvas"; // or wherever you put it
import useIntersectionObserver from "../hooks/intersection";

const Hero = () => {
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(150);
  const { elementRef, hasIntersected } = useIntersectionObserver();

  const roles = [
    "Full Stack Developer",
    "UI/UX Designer",
    "Problem Solver",
    "Tech Enthusiast",
  ];

  useEffect(() => {
    const handleType = () => {
      const current = loopNum % roles.length;
      const fullText = roles[current];

      setText(
        isDeleting
          ? fullText.substring(0, text.length - 1)
          : fullText.substring(0, text.length + 1)
      );

      setTypingSpeed(isDeleting ? 30 : 150);

      if (!isDeleting && text === fullText) {
        setTimeout(() => setIsDeleting(true), 500);
      } else if (isDeleting && text === "") {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
      }
    };

    const timer = setTimeout(handleType, typingSpeed);
    return () => clearTimeout(timer);
  });

  return (
    <section
      id="home"
      ref={elementRef}
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
    >
      {/* Canvas Background */}
      <NeuralCanvasBackground
        nodeCount={50}
        primaryColor="rgba(56, 189, 248, 0.6)"
        secondaryColor="rgba(139, 92, 246, 0.4)"
        connectionColor="rgba(56, 189, 248, 0.2)"
      />

      {/* Fallback gradient background for when canvas isn't supported */}
      <div className="absolute inset-0 -z-20">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-purple-500/10 to-pink-500/20"></div>
      </div>

      <div className="max-w-7xl mx-auto section-padding text-center relative z-10">
        <div
          className={`transition-all duration-1000 ${
            hasIntersected
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-10"
          }`}
        >
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6">
            Hi, I'm <span className="gradient-text">Arya Thanekar</span>
          </h1>

          <div className="text-xl md:text-2xl lg:text-3xl text-muted-foreground mb-8 h-10">
            I'm a <span className="text-primary font-semibold">{text}</span>
            <span className="animate-pulse">|</span>
          </div>

          <p className="text-lg md:text-xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed">
            Passionate about creating beautiful, functional, and user-centered
            digital experiences. I bring ideas to life through code and design.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
            <button className="px-8 py-4 bg-primary hover:bg-primary/90 text-primary-foreground rounded-full font-semibold transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-primary/25">
              <a href="#projects">View My Work</a>
            </button>
            <button className="px-8 py-4 border border-primary text-primary hover:bg-primary hover:text-primary-foreground rounded-full font-semibold transition-all duration-300 hover:scale-105">
              <a href="#contact">Get In Touch</a>
            </button>
          </div>

          <div className="flex justify-center space-x-6">
            <a
              href="https://github.com/arya2917"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full glass-card hover:scale-110 transition-all duration-300"
            >
              <Github className="w-6 h-6" />
            </a>
            <a
              href="https://www.linkedin.com/in/arya-thanekar-767652259/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full glass-card hover:scale-110 transition-all duration-300"
            >
              <Linkedin className="w-6 h-6" />
            </a>
            <a
              href="mailto:asthanekar2004@gmail.com"
              className="p-3 rounded-full glass-card hover:scale-110 transition-all duration-300"
            >
              <Mail className="w-6 h-6" />
            </a>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <ChevronDown className="w-8 h-8 text-muted-foreground" />
      </div>
    </section>
  );
};

export default Hero;
