
import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { useParams, Link } from "react-router-dom";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { projectsRaw } from "../App";

const ProjectDetail = () => {
  const { id } = useParams();
  const project = projectsRaw.find(p => p.id === parseInt(id || ""));

  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayedSrc, setDisplayedSrc] = useState("");
  const [isLoadingImg, setIsLoadingImg] = useState(false);
  const [imgFadeKey, setImgFadeKey] = useState(0);
  const expectedIndexRef = useRef(-1);

  useEffect(() => { window.scrollTo(0, 0); }, []);

  if (!project) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-100 via-gray-50 to-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-mono font-bold text-black mb-4">Project not found</h1>
          <Link to="/" className="text-black font-mono hover:underline">← back to portfolio</Link>
        </div>
      </div>
    );
  }

  const preloadNeighbors = (index: number) => {
    [-1, 1].forEach(offset => {
      const i = (index + offset + project.images.length) % project.images.length;
      new Image().src = project.images[i];
    });
  };

  const loadAndShow = (index: number) => {
    expectedIndexRef.current = index;
    setCurrentIndex(index);
    setIsLoadingImg(true);

    const img = new Image();
    img.src = project.images[index];
    const done = () => {
      if (expectedIndexRef.current !== index) return;
      setDisplayedSrc(project.images[index]);
      setIsLoadingImg(false);
      setImgFadeKey(k => k + 1);
      preloadNeighbors(index);
    };
    img.onload = done;
    img.onerror = done;
  };

  const openLightbox = (index: number) => {
    setLightboxOpen(true);
    loadAndShow(index);
  };

  const closeLightbox = () => setLightboxOpen(false);

  const nextImage = () => loadAndShow((currentIndex + 1) % project.images.length);
  const prevImage = () => loadAndShow((currentIndex - 1 + project.images.length) % project.images.length);

  useEffect(() => {
    if (!lightboxOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox();
      else if (e.key === 'ArrowLeft') prevImage();
      else if (e.key === 'ArrowRight') nextImage();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [lightboxOpen, currentIndex]);

  useEffect(() => {
    document.body.style.overflow = lightboxOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [lightboxOpen]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 via-gray-50 to-white" style={{ animation: 'page-in 500ms ease both' }}>
      {/* Navigation */}
      <nav className="px-8 py-6 max-w-6xl mx-auto">
        <Link to="/" className="inline-flex items-center text-black font-mono hover:underline">
          ← back to portfolio
        </Link>
      </nav>

      {/* Project Content */}
      <main className="px-8 pb-20 max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-5xl font-mono font-bold text-black">{project.title}</h1>
            <span className="text-lg font-mono text-gray-500">{project.year}</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {project.type.map(tag => (
              <span key={tag} className="inline-block px-3 py-1 bg-gray-200 rounded-full text-sm font-mono text-gray-700">
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Image Gallery */}
        <div className="mb-12">
          <div className="grid gap-4">
            {project.images.map((image, index) => (
              <div 
                key={index}
                className="cursor-pointer group overflow-hidden rounded-lg bg-gray-100"
                onClick={() => openLightbox(index)}
              >
                <img
                  src={image}
                  alt={`${project.title} - Image ${index + 1}`}
                  className="w-full h-auto group-hover:scale-105 transition-transform duration-500"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Description */}
        <div className="prose prose-lg max-w-none">
          {/* Check if project has HTML description, otherwise use plain text */}
          {(project as any).description_html ? (
            <div 
              className="text-lg font-sans text-gray-800 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: (project as any).description_html }}
            />
          ) : (
            <p className="text-lg font-sans text-gray-800 leading-relaxed">
              {project.description}
            </p>
          )}
        </div>
      </main>

      <footer className="px-8 py-12 max-w-6xl mx-auto border-t border-gray-200 mt-20">
        <p className="text-gray-500 font-mono text-sm">
          © {new Date().getFullYear()} Konrad Krawczyk
        </p>
      </footer>

      {lightboxOpen && createPortal(
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-6"
          onClick={closeLightbox}
        >
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors"
          >
            <X size={28} />
          </button>

          {project.images.length > 1 && (
            <button
              onClick={(e) => { e.stopPropagation(); prevImage(); }}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 transition-colors z-10"
            >
              <ChevronLeft size={48} />
            </button>
          )}

          {/* Image + spinner share the same space */}
          <div className="relative flex items-center justify-center" onClick={(e) => e.stopPropagation()}>
            {displayedSrc && (
              <img
                key={imgFadeKey}
                src={displayedSrc}
                alt={`${project.title} - ${currentIndex + 1}`}
                className="object-contain"
                style={{
                  maxWidth: '85vw',
                  maxHeight: '85vh',
                  animation: 'fade-in 300ms ease both',
                }}
              />
            )}
            {isLoadingImg && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin" />
              </div>
            )}
          </div>

          {project.images.length > 1 && (
            <button
              onClick={(e) => { e.stopPropagation(); nextImage(); }}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 transition-colors z-10"
            >
              <ChevronRight size={48} />
            </button>
          )}

          {project.images.length > 1 && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white font-mono text-sm">
              {currentIndex + 1} / {project.images.length}
            </div>
          )}
        </div>,
        document.body
      )}
    </div>
  );
};

export default ProjectDetail;
