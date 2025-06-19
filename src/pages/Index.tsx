import { useState } from "react";
import { Link } from "react-router-dom";
import { projectsRaw } from "../App";

const Index = () => {
  const [isHovered, setIsHovered] = useState(false);
  
  const caseStudies = projectsRaw.slice(0, 2);
  const otherProjects = projectsRaw.slice(2);

  const marqueeContent = ["collaborative", "sustainable", "accessible", "intuitive", "human-centered"];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      {/* Hero Section */}
      <section className="px-8 py-20 max-w-6xl mx-auto">
        <div className="mb-16">
          <h1 className="text-6xl md:text-8xl font-mono font-bold text-black leading-tight">
            the future is{" "}
            <span 
              className="relative inline-block"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <span className={`transition-opacity duration-300 ${isHovered ? 'opacity-0' : 'opacity-100'}`}>
                _____
              </span>
              {isHovered && (
                <span className="absolute inset-0 overflow-hidden whitespace-nowrap">
                  <span className="inline-block animate-[marquee_8s_linear_infinite]">
                    {marqueeContent.join(" • ")} • {marqueeContent.join(" • ")} • 
                  </span>
                </span>
              )}
            </span>
          </h1>
        </div>

        {/* Introduction */}
        <div className="mb-20">
          <p className="text-xl font-sans text-gray-800 leading-relaxed max-w-3xl">
            Hi! I'm Konrad. I'm a UX engineer who designs multimodal interfaces. With 6+ years of experience in technical roles as well as a post-Delft affinity for user-centeredness, I combine skills in data, development and design to create novel ways of interacting with digital products.
          </p>
        </div>
      </section>

      {/* Case Studies */}
      <section className="px-8 py-16 max-w-6xl mx-auto">
        <h2 className="text-4xl font-mono font-bold text-black mb-12">Case Studies</h2>
        <div className="grid md:grid-cols-2 gap-12">
          {caseStudies.map((project) => (
            <Link 
              key={project.id} 
              to={`/project/${project.id}`}
              className="group block bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="aspect-video overflow-hidden bg-gray-100">
                <img
                  src={project.images[0]}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-2xl font-mono font-bold text-black">{project.title}</h3>
                  <span className="text-sm font-mono text-gray-500">{project.year}</span>
                </div>
                <p className="text-gray-700 font-sans leading-relaxed line-clamp-4">
                  {project.description}
                </p>
                <div className="mt-4 inline-flex items-center text-black font-mono text-sm group-hover:translate-x-1 transition-transform duration-200">
                  view case study →
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Other Projects */}
      <section className="px-8 py-16 max-w-6xl mx-auto">
        <h2 className="text-4xl font-mono font-bold text-black mb-12">Other Projects</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {otherProjects.map((project) => (
            <Link 
              key={project.id} 
              to={`/project/${project.id}`}
              className="group block bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300"
            >
              <div className="aspect-square overflow-hidden bg-gray-100">
                <img
                  src={project.images[0]}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-mono font-bold text-black">{project.title}</h3>
                  <span className="text-xs font-mono text-gray-500">{project.year}</span>
                </div>
                <p className="text-gray-600 font-sans text-sm leading-relaxed line-clamp-3">
                  {project.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="px-8 py-12 max-w-6xl mx-auto border-t border-gray-200 mt-20">
        <p className="text-gray-500 font-mono text-sm">© 2024 Konrad</p>
      </footer>
    </div>
  );
};

export default Index;
