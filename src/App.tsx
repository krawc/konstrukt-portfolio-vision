
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import ProjectDetail from "./pages/ProjectDetail";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

export const projectsRaw = [
  {
    "id": 12,
    "title": "eureka",
    "description": "Spring 2024. Vision in Product Project at TU Delft. This project explores innovative approaches to international train travel by addressing current preconceptions and leveraging modern lifestyle shifts. Central to the project is a travel planning tool designed to enhance the quality of door-to-door travel. This tool provides users with a quality-oriented view of their journey, highlighting not just logistics but also cognitive aspects of their travel time. By visualizing occupied, idle, and free time, and incorporating information on amenities and multimodal connections, the tool encourages process-oriented choices, nudging users toward sustainable ground transit options.",
    "type": "play",
    "year": "2024",
    "images": [
      "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=800&h=600&fit=crop"
    ]
  },
  {
    "id": 11,
    "title": "neural networks",
    "description": "Fall 2023. A deep dive into machine learning architectures and their applications in user interface design. This project examines how artificial neural networks can be leveraged to create more intuitive and responsive digital experiences.",
    "type": "research",
    "year": "2023",
    "images": [
      "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800&h=600&fit=crop"
    ]
  },
  {
    "id": 10,
    "title": "interface studies",
    "description": "Summer 2023. Exploration of multimodal interaction patterns and their impact on user behavior. This study investigates how different input methods can enhance accessibility and user engagement.",
    "type": "study",
    "year": "2023",
    "images": [
      "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&h=600&fit=crop"
    ]
  },
  {
    "id": 9,
    "title": "digital architecture",
    "description": "Spring 2023. An investigation into the structural patterns of digital spaces and how they influence user navigation and comprehension.",
    "type": "research",
    "year": "2023",
    "images": [
      "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&h=600&fit=crop"
    ]
  }
];

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/project/:id" element={<ProjectDetail />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
