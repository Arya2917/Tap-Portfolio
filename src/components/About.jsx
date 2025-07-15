import { Code, Palette, Zap, Heart } from "lucide-react";
import useIntersectionObserver from "../hooks/intersection";

const About = () => {
  const { elementRef: aboutRef, hasIntersected: aboutVisible } = useIntersectionObserver();
  const { elementRef: skillsRef, hasIntersected: skillsVisible } = useIntersectionObserver();
  const { elementRef: featuresRef, hasIntersected: featuresVisible } = useIntersectionObserver();

  const skills = [
    { name: "React/Next.js", level: 90 },
    { name: "JavaScript/TypeScript", level: 85 },
    { name: "Node.js/Express", level: 80 },
    { name: "Python/Django", level: 75 },
    { name: "UI/UX Design", level: 85 },
    { name: "Database Design", level: 80 },
  ];

  const features = [
    {
      icon: <Code className="w-8 h-8" />,
      title: "Clean Code",
      description:
        "Writing maintainable and scalable code that follows best practices.",
    },
    {
      icon: <Palette className="w-8 h-8" />,
      title: "Modern Design",
      description:
        "Creating beautiful and intuitive user interfaces with attention to detail.",
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Performance",
      description:
        "Optimizing applications for speed and exceptional user experience.",
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: "User-Centric",
      description:
        "Building solutions that solve real problems and delight users.",
    },
  ];

  return (
    <section id="about" className="section-padding">
      <div className="max-w-7xl mx-auto">
        <div 
          ref={aboutRef}
          className={`text-center mb-16 transition-all duration-1000 ${
            aboutVisible 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-10'
          }`}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            About <span className="gradient-text">Me</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            I'm a passionate full-stack developer with 5+ years of experience
            creating digital solutions that bridge the gap between design and
            technology.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          <div className={`transition-all duration-1000 delay-200 ${
            aboutVisible 
              ? 'opacity-100 translate-x-0' 
              : 'opacity-0 -translate-x-10'
          }`}>
<div className="glass-card p-8 rounded-2xl">
  <img
    src="/Arya.png"
    alt="ARYA THANEKAR"
    className="w-full h-80 object-contain object-center rounded-xl mb-6 bg-gray-50"
  />

              <h3 className="text-2xl font-bold mb-4">Arya Thanekar</h3>
              <p className="text-muted-foreground leading-relaxed">
                Based in Pune, I specialize in building exceptional digital
                experiences. When I'm not coding, you'll find me exploring new
                technologies, contributing to open source, or enjoying the great
                outdoors.
              </p>
            </div>
          </div>

          <div 
            ref={skillsRef}
            className={`transition-all duration-1000 delay-400 ${
              skillsVisible 
                ? 'opacity-100 translate-x-0' 
                : 'opacity-0 translate-x-10'
            }`}
          >
            <h3 className="text-2xl font-bold mb-8">Skills & Expertise</h3>
            <div className="space-y-6">
              {skills.map((skill, index) => (
                <div key={skill.name} className="space-y-2">
                  <div className="flex justify-between">
                    <span className="font-medium">{skill.name}</span>
                    <span className="text-primary">{skill.level}%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div
                      className={`bg-gradient-to-r from-primary to-purple-500 h-2 rounded-full transition-all duration-1000 ease-out ${
                        skillsVisible ? 'opacity-100' : 'opacity-0'
                      }`}
                      style={{
                        width: skillsVisible ? `${skill.level}%` : '0%',
                        transitionDelay: skillsVisible ? `${600 + index * 100}ms` : '0ms',
                      }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div 
          ref={featuresRef}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className={`glass-card p-6 text-center hover:scale-105 transition-all duration-500 ${
                featuresVisible 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-10'
              }`}
              style={{ 
                transitionDelay: featuresVisible ? `${index * 100}ms` : '0ms'
              }}
            >
              <div className="text-primary mb-4 flex justify-center">
                {feature.icon}
              </div>
              <h4 className="text-xl font-bold mb-3">{feature.title}</h4>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;