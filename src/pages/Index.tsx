import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Mail, ExternalLink, Github, Linkedin, Phone } from "lucide-react";
import { projectsRaw } from "../App";
import InteractiveMarquee from "../components/InteractiveMarquee";

const FEATURED_IDS  = [1, 10, 12, 6];
const EARLIER_IDS   = [7, 13, 9];

const Index = () => {
  const [selectedTag, setSelectedTag]   = useState<string | null>(null);
  const [displayedTag, setDisplayedTag] = useState<string | null>(null);
  const [fading, setFading]             = useState(false);

  const featured = FEATURED_IDS.map(id => projectsRaw.find(p => p.id === id)!).filter(Boolean);
  const moreWork = projectsRaw.filter(p => !FEATURED_IDS.includes(p.id) && !EARLIER_IDS.includes(p.id));
  const earlier  = EARLIER_IDS.map(id => projectsRaw.find(p => p.id === id)!).filter(Boolean);

  const TAG_ORDER = ["UXD", "multimodal", "culture", "play", "web"];
  const allTags   = TAG_ORDER.filter(tag => moreWork.some(p => p.type.includes(tag)));

  const visibleMore = displayedTag
    ? moreWork.filter(p => p.type.includes(displayedTag))
    : moreWork;

  const handleTagClick = (tag: string | null) => {
    if (tag === selectedTag) return;
    setSelectedTag(tag);
    setFading(true);
  };

  useEffect(() => {
    if (!fading) return;
    const t = setTimeout(() => { setDisplayedTag(selectedTag); setFading(false); }, 200);
    return () => clearTimeout(t);
  }, [fading, selectedTag]);

  const marqueeContent = ["multimodal", "collaborative", "material", "more-than-human", "conversational", "interdepedent"];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 via-gray-50 to-white" style={{ animation: 'page-in 500ms ease both' }}>

      {/* Header */}
      <header className="px-8 py-6 max-w-6xl mx-auto flex justify-end">
        <div className="flex items-center gap-4">
          <a href="https://github.com/krawc" target="_blank" rel="noopener noreferrer"
            className="p-2 text-gray-700 hover:text-black transition-colors" aria-label="GitHub">
            <Github size={20} />
          </a>
          <a href="https://linkedin.com/in/konradkrawc" target="_blank" rel="noopener noreferrer"
            className="p-2 text-gray-700 hover:text-black transition-colors" aria-label="LinkedIn">
            <Linkedin size={20} />
          </a>
          <a href="tel:+48453283345" className="p-2 text-gray-700 hover:text-black transition-colors" aria-label="Phone">
            <Phone size={20} />
          </a>
        </div>
      </header>

      {/* Hero */}
      <section className="px-8 py-12 max-w-6xl mx-auto">
        <div className="mb-16">
          <h1 className="text-6xl md:text-8xl font-mono font-bold text-black leading-tight">
            the future is{" "}
            <InteractiveMarquee content={marqueeContent} />
          </h1>
        </div>
        <div className="mb-12">
          <p className="text-xl font-sans text-gray-800 leading-relaxed max-w-3xl mb-8">
            I'm Konrad Krawczyk. I'm a UI engineer who designs, develops and studies multimodal interfaces. With 6+ years of experience in technical roles as well as training in user research, I combine skills in data, development and design to create novel ways of interacting with digital products.
          </p>
          <div className="flex gap-4">
            <a href="mailto:konrad.krawczyk@proton.me"
              className="inline-flex items-center gap-2 px-6 py-3 bg-black text-white font-mono text-sm hover:bg-gray-800 transition-colors rounded-lg">
              <Mail size={16} /> get in touch
            </a>
            <a href="https://nbujwalvdcjefepwnyky.supabase.co/storage/v1/object/public/assets/docs/KK_resume_a.pdf"
              target="_blank"
              className="inline-flex items-center gap-2 px-6 py-3 border border-black text-black font-mono text-sm hover:bg-black hover:text-white transition-colors rounded-lg">
              <ExternalLink size={16} /> CV
            </a>
          </div>
        </div>
      </section>

      {/* ── Featured Work ── */}
      <section className="px-8 py-16 max-w-6xl mx-auto">
        <h2 className="text-4xl font-mono font-bold text-black mb-12">Featured Work</h2>
        <div className="grid md:grid-cols-2 gap-12">
          {featured.map(project => (
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
                  view project →
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── More Work ── */}
      <section className="px-8 py-16 max-w-6xl mx-auto">
        <div className="flex justify-between mb-8 flex-col gap-4 md:flex-row">
          <h2 className="text-2xl font-mono font-bold text-black">More Work</h2>
          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={() => handleTagClick(null)}
              className={`px-3 py-1 text-sm font-mono rounded-full transition-colors ${
                !selectedTag ? 'bg-black text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              all
            </button>
            {allTags.map(tag => (
              <button
                key={tag}
                onClick={() => handleTagClick(tag)}
                className={`px-3 py-1 text-sm font-mono rounded-full transition-colors ${
                  selectedTag === tag ? 'bg-black text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        <div
          className="grid md:grid-cols-3 gap-6"
          style={{ opacity: fading ? 0 : 1, transition: 'opacity 200ms ease' }}
        >
          {visibleMore.map((project, i) => (
            <Link
              key={project.id}
              to={`/project/${project.id}`}
              className="group block bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300"
              style={{
                animation: fading ? 'none' : 'card-in 380ms ease both',
                animationDelay: fading ? '0ms' : `${i * 55}ms`,
              }}
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
                  <h3 className="text-base font-mono font-bold text-black">{project.title}</h3>
                  <span className="text-xs font-mono text-gray-400">{project.year}</span>
                </div>
                <div className="flex flex-wrap gap-1 mb-2">
                  {project.type.map(tag => (
                    <span key={tag} className="px-2 py-0.5 bg-gray-100 rounded-full text-xs font-mono text-gray-500">
                      {tag}
                    </span>
                  ))}
                </div>
                <p className="text-gray-500 font-sans text-sm leading-relaxed line-clamp-3">
                  {project.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── Earlier ── */}
      {earlier.length > 0 && (
        <section className="px-8 pb-16 max-w-6xl mx-auto">
          <p className="text-xs font-mono text-gray-400 uppercase tracking-widest mb-4">Earlier</p>
          <div className="flex gap-6 flex-wrap">
            {earlier.map(p => (
              <Link
                key={p.id}
                to={`/project/${p.id}`}
                className="font-mono text-sm text-gray-500 hover:text-black transition-colors"
              >
                {p.title} <span className="text-gray-400">{p.year}</span>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="px-8 py-12 max-w-6xl mx-auto border-t border-gray-200">
        <p className="text-gray-500 font-mono text-sm">
          © {new Date().getFullYear()} Konrad Krawczyk
        </p>
      </footer>

    </div>
  );
};

export default Index;
