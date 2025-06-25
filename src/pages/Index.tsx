import { useState } from "react";
import { Link } from "react-router-dom";
import { Mail, ExternalLink, Github, Linkedin, Phone } from "lucide-react";
import { projectsRaw } from "../App";

const Index = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  
  const caseStudies = projectsRaw.slice(0, 2);
  const otherProjects = projectsRaw.slice(2);

  // Extract unique tags from other projects
  const allTags = Array.from(new Set(otherProjects.map(project => project.type)));
  
  // Filter other projects by selected tag
  const filteredOtherProjects = selectedTag 
    ? otherProjects.filter(project => project.type === selectedTag)
    : otherProjects;

  const marqueeContent = ["collaborative", "sustainable", "accessible", "intuitive", "human-centered"];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 via-gray-50 to-white">
      {/* Header with social links */}
      <header className="px-8 py-6 max-w-6xl mx-auto flex justify-end">
        <div className="flex items-center gap-4">
          <a 
            href="https://github.com/krawc" 
            target="_blank" 
            rel="noopener noreferrer"
            className="p-2 text-gray-700 hover:text-black transition-colors"
            aria-label="GitHub"
          >
            <Github size={20} />
          </a>
          <a 
            href="https://linkedin.com/in/konradkrawc" 
            target="_blank" 
            rel="noopener noreferrer"
            className="p-2 text-gray-700 hover:text-black transition-colors"
            aria-label="LinkedIn"
          >
            <Linkedin size={20} />
          </a>
          <a 
            href="tel:999999999" 
            className="p-2 text-gray-700 hover:text-black transition-colors"
            aria-label="Phone"
          >
            <Phone size={20} />
          </a>
        </div>
      </header>

      {/* Hero Section */}
      <section className="px-8 py-12 max-w-6xl mx-auto">
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
              
                <span className="absolute inset-0 overflow-hidden whitespace-nowrap">
                  <span className="inline-block animate-[marquee_60s_linear_infinite]">
                    {marqueeContent.join(" • ")} • {marqueeContent.join(" • ")} • 
                  </span>
                </span>
            </span>
          </h1>
        </div>

        {/* Introduction */}
        <div className="mb-12">
          <p className="text-xl font-sans text-gray-800 leading-relaxed max-w-3xl mb-8">
            I'm Konrad Krawczyk. I'm a UX engineer who designs, develops and studies multimodal interfaces. With 6+ years of experience in technical roles as well as a trained eye for user-centered design, I combine skills in data, development and design to create novel ways of interacting with digital products.
          </p>

          {/* Contact buttons */}
          <div className="flex gap-4">
            <a 
              href="mailto:konrad.krawczyk@proton.me"
              className="inline-flex items-center gap-2 px-6 py-3 bg-black text-white font-mono text-sm hover:bg-gray-800 transition-colors rounded-lg"
            >
              <Mail size={16} />
              get in touch
            </a>
            <a 
              href="#" 
              className="inline-flex items-center gap-2 px-6 py-3 border border-black text-black font-mono text-sm hover:bg-black hover:text-white transition-colors rounded-lg"
            >
              <ExternalLink size={16} />
              CV
            </a>
          </div>
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
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-4xl font-mono font-bold text-black">Other Projects</h2>
          
          {/* Tag filter */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setSelectedTag(null)}
              className={`px-3 py-1 text-sm font-mono rounded-full transition-colors ${
                !selectedTag 
                  ? 'bg-black text-white' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              all
            </button>
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag)}
                className={`px-3 py-1 text-sm font-mono rounded-full transition-colors ${
                  selectedTag === tag 
                    ? 'bg-black text-white' 
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {filteredOtherProjects.map((project) => (
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
                <div className="mb-2">
                  <span className="inline-block px-2 py-1 bg-gray-100 rounded-full text-xs font-mono text-gray-600">
                    {project.type}
                  </span>
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
