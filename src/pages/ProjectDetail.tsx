
import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { useParams, Link } from "react-router-dom";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { projectsRaw } from "../App";

const ProjectDetail = () => {
  const { id } = useParams();
  const project = projectsRaw.find(p => p.id === parseInt(id || ""));
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

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

  const openLightbox = (index: number) => {
    setCurrentImageIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  const nextImage = () => {
    if (project.images.length > 1) {
      setCurrentImageIndex((prev) => (prev + 1) % project.images.length);
    }
  };

  const prevImage = () => {
    if (project.images.length > 1) {
      setCurrentImageIndex((prev) => (prev - 1 + project.images.length) % project.images.length);
    }
  };

  useEffect(() => {
    if (!lightboxOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox();
      else if (e.key === 'ArrowLeft') prevImage();
      else if (e.key === 'ArrowRight') nextImage();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [lightboxOpen]);

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

      {/* Lightbox — portaled to body so CSS transforms on the page don't break position:fixed */}
      {lightboxOpen && createPortal(
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-6"
          onClick={closeLightbox}
        >
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors"
          >
            <X size={32} />
          </button>

          {project.images.length > 1 && (
            <button
              onClick={(e) => { e.stopPropagation(); prevImage(); }}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 transition-colors"
            >
              <ChevronLeft size={48} />
            </button>
          )}

          <img
            src={project.images[currentImageIndex]}
            alt={`${project.title} - ${currentImageIndex + 1}`}
            className="max-w-full max-h-full object-contain"
            onClick={(e) => e.stopPropagation()}
          />

          {project.images.length > 1 && (
            <button
              onClick={(e) => { e.stopPropagation(); nextImage(); }}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 transition-colors"
            >
              <ChevronRight size={48} />
            </button>
          )}

          {project.images.length > 1 && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white font-mono text-sm">
              {currentImageIndex + 1} / {project.images.length}
            </div>
          )}
        </div>,
        document.body
      )}
    </div>
  );
};

export default ProjectDetail;
