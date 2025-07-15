import { Calendar, MapPin } from "lucide-react";
import useIntersectionObserver from "../hooks/intersection";

const Experience = () => {
  const { elementRef: headerRef, hasIntersected: headerVisible } = useIntersectionObserver();
  const { elementRef: experienceRef, hasIntersected: experienceVisible } = useIntersectionObserver();
  const { elementRef: educationRef, hasIntersected: educationVisible } = useIntersectionObserver();

  const experiences = [
    {
      title: "Full-Stack Developer",
      company: "Wikiance",
      location: "Remote",
      duration: "Aug 2024 - March 2025",
      description:
        "Developed and maintained a high-performance web application using React, Node.js, and MongoDB. Implemented features that improved user engagement and reduced load times significantly.",
      highlights: [
        "Increased application performance by 40%",
        "Led team of 5 Interns",
        "Implemented CI/CD pipelines",
      ],
    },
    {
      title: "Full-Stack Developer",
      company: "ScriptLanes",
      location: "Pune",
      duration: "Jan 2023 - July 2023",
      description:
        "Worked on a SaaS platform that automates script generation for various industries. Focused on building scalable APIs and integrating third-party services.",
      highlights: [
        "Enhanced API response time by 50%",
        "Reduced deployment time by 60%",
        "Implemented responsive designs",
      ],
    },
  ];

  const education = [
    {
      degree: "Bachelor of Engineering in Information Technology",
      school: "Pune Institute of Computer Technology",
      duration: "2022 - 2026",
      description:
        "Focused on software engineering, algorithms, and data structures. Current CGPA is 9.01.",
    },
  ];

  return (
    <section id="experience" className="section-padding">
      <div className="max-w-7xl mx-auto">
        <div 
          ref={headerRef}
          className={`text-center mb-16 transition-all duration-1000 ${
            headerVisible 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-10'
          }`}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            My <span className="gradient-text">Journey</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            A timeline of my professional experience and educational background
            that shaped my career in technology.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Experience */}
          <div ref={experienceRef}>
            <h3 className={`text-2xl font-bold mb-8 flex items-center transition-all duration-1000 ${
              experienceVisible 
                ? 'opacity-100 translate-x-0' 
                : 'opacity-0 -translate-x-10'
            }`}>
              <span className="w-2 h-8 bg-gradient-to-b from-primary to-purple-500 rounded-full mr-4"></span>
              Experience
            </h3>

            <div className="relative">
              <div className={`absolute left-4 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary to-purple-500 transition-all duration-1000 ${
                experienceVisible ? 'opacity-100 scale-y-100' : 'opacity-0 scale-y-0'
              }`} style={{ transformOrigin: 'top' }}></div>

              {experiences.map((exp, index) => (
                <div
                  key={index}
                  className={`relative pl-12 pb-12 transition-all duration-1000 ${
                    experienceVisible 
                      ? 'opacity-100 translate-x-0' 
                      : 'opacity-0 translate-x-10'
                  }`}
                  style={{ 
                    transitionDelay: experienceVisible ? `${200 + index * 200}ms` : '0ms'
                  }}
                >
                  <div className={`absolute left-2 w-4 h-4 bg-primary rounded-full border-4 border-background transition-all duration-500 ${
                    experienceVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-0'
                  }`}
                  style={{ 
                    transitionDelay: experienceVisible ? `${400 + index * 200}ms` : '0ms'
                  }}></div>

                  <div className="glass-card p-6 hover:scale-105 transition-all duration-300">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3">
                      <h4 className="text-xl font-bold">{exp.title}</h4>
                      <div className="flex items-center text-primary text-sm">
                        <Calendar className="w-4 h-4 mr-1" />
                        {exp.duration}
                      </div>
                    </div>

                    <div className="flex items-center text-muted-foreground mb-4">
                      <span className="font-semibold">{exp.company}</span>
                      <span className="mx-2">•</span>
                      <MapPin className="w-4 h-4 mr-1" />
                      {exp.location}
                    </div>

                    <p className="text-muted-foreground mb-4 leading-relaxed">
                      {exp.description}
                    </p>

                    <ul className="space-y-2">
                      {exp.highlights.map((highlight, idx) => (
                        <li key={idx} className="flex items-start">
                          <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                          <span className="text-sm text-muted-foreground">
                            {highlight}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Education */}
          <div ref={educationRef}>
            <h3 className={`text-2xl font-bold mb-8 flex items-center transition-all duration-1000 ${
              educationVisible 
                ? 'opacity-100 translate-x-0' 
                : 'opacity-0 translate-x-10'
            }`}>
              <span className="w-2 h-8 bg-gradient-to-b from-purple-500 to-pink-500 rounded-full mr-4"></span>
              Education
            </h3>

            <div className="relative">
              <div className={`absolute left-4 top-0 bottom-0 w-0.5 bg-gradient-to-b from-purple-500 to-pink-500 transition-all duration-1000 ${
                educationVisible ? 'opacity-100 scale-y-100' : 'opacity-0 scale-y-0'
              }`} style={{ transformOrigin: 'top' }}></div>

              {education.map((edu, index) => (
                <div
                  key={index}
                  className={`relative pl-12 pb-12 transition-all duration-1000 ${
                    educationVisible 
                      ? 'opacity-100 translate-x-0' 
                      : 'opacity-0 -translate-x-10'
                  }`}
                  style={{ 
                    transitionDelay: educationVisible ? `${200 + index * 200}ms` : '0ms'
                  }}
                >
                  <div className={`absolute left-2 w-4 h-4 bg-purple-500 rounded-full border-4 border-background transition-all duration-500 ${
                    educationVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-0'
                  }`}
                  style={{ 
                    transitionDelay: educationVisible ? `${400 + index * 200}ms` : '0ms'
                  }}></div>

                  <div className="glass-card p-6 hover:scale-105 transition-all duration-300">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3">
                      <h4 className="text-xl font-bold">{edu.degree}</h4>
                      <div className="flex items-center text-purple-500 text-sm">
                        <Calendar className="w-4 h-4 mr-1" />
                        {edu.duration}
                      </div>
                    </div>

                    <div className="text-muted-foreground font-semibold mb-4">
                      {edu.school}
                    </div>

                    <p className="text-muted-foreground leading-relaxed">
                      {edu.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;