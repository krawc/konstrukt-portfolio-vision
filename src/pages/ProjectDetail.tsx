
import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { projectsRaw } from "../App";

const ProjectDetail = () => {
  const { id } = useParams();
  const project = projectsRaw.find(p => p.id === parseInt(id || ""));
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

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

  // Handle keyboard navigation
  const handleKeyDown = (e: KeyboardEvent) => {
    if (!lightboxOpen) return;
    
    if (e.key === 'Escape') {
      closeLightbox();
    } else if (e.key === 'ArrowLeft') {
      prevImage();
    } else if (e.key === 'ArrowRight') {
      nextImage();
    }
  };

  // Add keyboard event listener when lightbox opens
  useState(() => {
    if (lightboxOpen) {
      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 via-gray-50 to-white">
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
          <div className="inline-block px-3 py-1 bg-gray-200 rounded-full">
            <span className="text-sm font-mono text-gray-700">{project.type}</span>
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

      {/* Lightbox */}
      {lightboxOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
          onClick={closeLightbox}
        >
          <div className="relative max-w-5xl max-h-full" onClick={(e) => e.stopPropagation()}>
            <img
              src={project.images[currentImageIndex]}
              alt={`${project.title} - Image ${currentImageIndex + 1}`}
              className="max-w-full max-h-full object-contain"
            />
            
            {/* Close button */}
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors z-10"
            >
              <X size={32} />
            </button>

            {/* Navigation buttons - only show if more than one image */}
            {project.images.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 transition-colors z-10"
                >
                  <ChevronLeft size={48} />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 transition-colors z-10"
                >
                  <ChevronRight size={48} />
                </button>
              </>
            )}

            {/* Image counter - only show if more than one image */}
            {project.images.length > 1 && (
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white font-mono text-sm">
                {currentImageIndex + 1} / {project.images.length}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectDetail;
