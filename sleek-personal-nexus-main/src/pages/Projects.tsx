import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Github, ExternalLink, Code, ArrowUpRight, Filter } from "lucide-react";
import { motion } from "framer-motion";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuLink
} from "@/components/ui/navigation-menu";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  RadioGroup,
  RadioGroupItem
} from "@/components/ui/radio-group";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

const Projects = () => {
  // Project categories
  const categories = [
    "All",
    "Web Development",
    "AI/ML",
    "Data Science",
    "Blockchain",
    "NLP",
    "Mobile Development"
  ];
  
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const projects = [
    {
      id: 1,
      title: "E-commerce Platform",
      description: "A full-featured online store built with React and Node.js with advanced product filtering and payment integration.",
      tags: ["React", "Node.js", "MongoDB", "Stripe"],
      image: "/images/projects/ecomm.png",
      github: "https://github.pranavsinghpatil/ui-thon",
      live: "https://google.com",
      category: "Web Development"
    },
    {
      id: 2,
      title: "Personal Finance Tracker",
      description: "An application to track expenses and visualize spending patterns with budget forecasting.",
      tags: ["React", "Firebase", "ChartJS", "Tailwind CSS"],
      image: "/images/projects/fintrack.png",
      github: "https://github.pranavsinghpatil/ui-thon",
      live: "https://google.com",
      category: "Web Development"
    },
    {
      id: 3,
      title: "Task Management App",
      description: "A collaborative task management tool with real-time updates and team progress analytics.",
      tags: ["Next.js", "GraphQL", "PostgreSQL", "Socket.io"],
      image: "/images/projects/task.png",
      github: "https://github.pranavsinghpatil/ui-thon",
      live: "https://google.com",
      category: "Web Development"
    },
    {
      id: 4,
      title: "Sentiment Analysis Tool",
      description: "NLP-powered application that analyzes sentiment in customer reviews and social media posts.",
      tags: ["Python", "TensorFlow", "NLTK", "Flask"],
      image: "/images/projects/sent.png",
      github: "https://github.pranavsinghpatil/ui-thon",
      live: "https://google.com",
      category: "NLP"
    },
    {
      id: 5,
      title: "Social Media Analytics Dashboard",
      description: "An analytics dashboard for social media performance tracking with predictive engagement models.",
      tags: ["Vue.js", "Express", "Firebase", "Tailwind CSS"],
      image: "/images/projects/social.png",
      github: "https://github.pranavsinghpatil/ui-thon",
      live: "https://google.com",
      category: "Data Science"
    },
    {
      id: 6,
      title: "AI Content Generator",
      description: "A tool that leverages GPT models to create marketing content and articles based on brief inputs.",
      tags: ["Python", "TensorFlow", "React", "FastAPI"],
      image: "/images/projects/aigen.png",
      github: "https://github.pranavsinghpatil/ui-thon",
      live: "https://google.com",
      category: "AI/ML"
    },
    {
      id: 7,
      title: "Decentralized Voting System",
      description: "A blockchain-based voting application ensuring transparency and security in electronic voting.",
      tags: ["Solidity", "Ethereum", "Web3.js", "React"],
      image: "/images/projects/dece.png",
      github: "https://github.com/pranavsinghpatil/ui-thon",
      live: "https://google.com",
      category: "Blockchain"
    },
    {
      id: 8,
      title: "Image Recognition API",
      description: "A machine learning API that identifies objects and scenes in uploaded images with high accuracy.",
      tags: ["Python", "PyTorch", "Docker", "FastAPI"],
      image: "/images/projects/imageapi.png",
      github: "https://github.com/pranavsinghpatil/ui-thon",
      live: "https://google.com",
      category: "AI/ML"
    },
    {
      id: 9,
      title: "Smart Home IoT Controller",
      description: "A system for managing connected home devices with voice recognition and automated routines.",
      tags: ["React Native", "Node.js", "MongoDB", "MQTT"],
      image: "/images/projects/iot.png",
      github: "https://github.pranavsinghpatil/ui-thon",
      live: "https://google.com",
      category: "Mobile Development"
    },
    {
      id: 10,
      title: "Language Translation Tool",
      description: "An NLP application that provides real-time translation between multiple languages with context awareness.",
      tags: ["Python", "Transformers", "Flask", "React"],
      image: "/images/projects/lang.png",
      github: "https://github.pranavsinghpatil/ui-thon",
      live: "https://google.com",
      category: "NLP"
    },
    {
      id: 11,
      title: "Cryptocurrency Trading Bot",
      description: "An automated trading system that uses technical analysis and market sentiment to execute trades.",
      tags: ["Python", "TensorFlow", "APIs", "PostgreSQL"],
      image: "/images/projects/blch.png",
      github: "https://github.pranavsinghpatil/ui-thon",
      live: "https://google.com",
      category: "Blockchain"
    },
    {
      id: 12,
      title: "Predictive Maintenance System",
      description: "A machine learning solution that predicts equipment failures before they occur based on sensor data.",
      tags: ["Python", "Scikit-learn", "React", "Node.js"],
      image: "/images/projects/predims.png",
      github: "https://github.com/pranavsinghpatil/ui-thon",
      live: "https://google.com",
      category: "Data Science"
    }
  ];

  // Filter projects based on selected category
  const filteredProjects = selectedCategory === "All" 
    ? projects 
    : projects.filter(project => project.category === selectedCategory);

  const projectVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5
      }
    })
  };

  return (
    <div className="page-container">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <h1 className="text-3xl md:text-4xl font-bold">Projects</h1>
        <p className="text-muted-foreground mt-4 max-w-2xl">
          A collection of projects I've worked on across various domains. Each project represents different skills and technologies
          that I've applied to solve real-world problems.
        </p>
      </motion.div>
      
      {/* Category filters and view toggle - Desktop */}
      <div className="hidden md:flex mb-8 items-center justify-between flex-col md:flex-row gap-4">
        {/* View toggle buttons - moved to top */}
        <div className="flex items-center ml-auto mb-4 md:mb-0">
          <ToggleGroup type="single" value={viewMode} onValueChange={(value) => value && setViewMode(value as "grid" | "list")}>
            <ToggleGroupItem value="grid" aria-label="Grid view">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-grid">
                <rect width="7" height="7" x="3" y="3" />
                <rect width="7" height="7" x="14" y="3" />
                <rect width="7" height="7" x="14" y="14" />
                <rect width="7" height="7" x="3" y="14" />
              </svg>
            </ToggleGroupItem>
            <ToggleGroupItem value="list" aria-label="List view">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-list">
                <line x1="8" x2="21" y1="6" y2="6" />
                <line x1="8" x2="21" y1="12" y2="12" />
                <line x1="8" x2="21" y1="18" y2="18" />
                <line x1="3" x2="3" y1="6" y2="6" />
                <line x1="3" x2="3" y1="12" y2="12" />
                <line x1="3" x2="3" y1="18" y2="18" />
              </svg>
            </ToggleGroupItem>
          </ToggleGroup>
        </div>
        
        {/* Category filters - below the view toggle */}
        <ScrollArea className="w-full">
          <div className="flex space-x-2 py-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className="whitespace-nowrap"
              >
                {category}
              </Button>
            ))}
          </div>
        </ScrollArea>
      </div>
      
      {/* Category filters - Mobile */}
      <div className="md:hidden mb-6">
        <Collapsible
          open={isFilterOpen}
          onOpenChange={setIsFilterOpen}
          className="w-full"
        >
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium">
              Filter: <span className="text-muted-foreground">{selectedCategory}</span>
            </p>
            <div className="flex gap-2">
              <ToggleGroup type="single" value={viewMode} onValueChange={(value) => value && setViewMode(value as "grid" | "list")}>
                <ToggleGroupItem value="grid" size="sm" variant="outline" aria-label="Grid view">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-grid">
                    <rect width="7" height="7" x="3" y="3" />
                    <rect width="7" height="7" x="14" y="3" />
                    <rect width="7" height="7" x="14" y="14" />
                    <rect width="7" height="7" x="3" y="14" />
                  </svg>
                </ToggleGroupItem>
                <ToggleGroupItem value="list" size="sm" variant="outline" aria-label="List view">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-list">
                    <line x1="8" x2="21" y1="6" y2="6" />
                    <line x1="8" x2="21" y1="12" y2="12" />
                    <line x1="8" x2="21" y1="18" y2="18" />
                    <line x1="3" x2="3" y1="6" y2="6" />
                    <line x1="3" x2="3" y1="12" y2="12" />
                    <line x1="3" x2="3" y1="18" y2="18" />
                  </svg>
                </ToggleGroupItem>
              </ToggleGroup>
              <CollapsibleTrigger asChild>
                <Button variant="outline" size="icon" className="h-8 w-8">
                  <Filter className="h-4 w-4" />
                </Button>
              </CollapsibleTrigger>
            </div>
          </div>
          <CollapsibleContent className="mt-4">
            <RadioGroup
              defaultValue={selectedCategory}
              onValueChange={setSelectedCategory}
              className="grid grid-cols-2 gap-2"
            >
              {categories.map((category) => (
                <div key={category} className="flex items-center space-x-2">
                  <RadioGroupItem value={category} id={`category-${category}`} />
                  <label htmlFor={`category-${category}`} className="text-sm">
                    {category}
                  </label>
                </div>
              ))}
            </RadioGroup>
          </CollapsibleContent>
        </Collapsible>
      </div>
      
      {/* Projects grid/list view */}
      {viewMode === "grid" ? (
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project, i) => (
            <motion.div 
              key={project.id}
              custom={i}
              initial="hidden"
              animate="visible"
              variants={projectVariants}
              className="group border rounded-lg overflow-hidden hover:border-primary transition-all duration-300 flex flex-col h-full"
            >
              <div className="aspect-video bg-secondary relative overflow-hidden">
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="space-x-4">
                    <a 
                      href={project.github} 
                      className="inline-flex items-center justify-center h-10 w-10 rounded-full bg-background/80 hover:bg-background transition-colors"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`View GitHub repository for ${project.title}`}
                    >
                      <Github className="h-5 w-5" />
                    </a>
                    <a 
                      href={project.live} 
                      className="inline-flex items-center justify-center h-10 w-10 rounded-full bg-background/80 hover:bg-background transition-colors"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`View live demo for ${project.title}`}
                    >
                      <ExternalLink className="h-5 w-5" />
                    </a>
                  </div>
                </div>
              </div>
              <div className="p-5 flex flex-col flex-1">
                <h2 className="text-xl font-medium group-hover:text-primary transition-colors">
                  {project.title}
                </h2>
                <p className="mt-2 text-muted-foreground text-sm flex-1">
                  {project.description}
                </p>
                
                <div className="mt-4 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span 
                      key={tag} 
                      className="text-xs bg-secondary text-secondary-foreground px-2 py-1 rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                
                <div className="mt-6 flex justify-between items-center">
                  <span className="text-xs text-muted-foreground">
                    {project.category}
                  </span>
                  <div className="flex gap-4">
                    <a
                      href={project.github}
                      className="inline-flex items-center text-sm hover:text-primary transition-colors"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Github className="h-4 w-4 mr-1" />
                      Code
                    </a>
                    <a
                      href={project.live}
                      className="inline-flex items-center text-sm hover:text-primary transition-colors group"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <span>Demo</span>
                      <ArrowUpRight className="h-3 w-3 ml-1 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="mt-8 space-y-6">
          {filteredProjects.map((project, i) => (
            <motion.div 
              key={project.id}
              custom={i}
              initial="hidden"
              animate="visible"
              variants={projectVariants}
              className="group border rounded-lg overflow-hidden hover:border-primary transition-all duration-300 flex flex-col md:flex-row"
            >
              <div className="w-full md:w-1/3 aspect-video md:aspect-auto bg-secondary relative">
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="space-x-4">
                    <a 
                      href={project.github} 
                      className="inline-flex items-center justify-center h-10 w-10 rounded-full bg-background/80 hover:bg-background transition-colors"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`View GitHub repository for ${project.title}`}
                    >
                      <Github className="h-5 w-5" />
                    </a>
                    <a 
                      href={project.live} 
                      className="inline-flex items-center justify-center h-10 w-10 rounded-full bg-background/80 hover:bg-background transition-colors"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`View live demo for ${project.title}`}
                    >
                      <ExternalLink className="h-5 w-5" />
                    </a>
                  </div>
                </div>
              </div>
              <div className="p-6 md:w-2/3">
                <div className="flex items-center justify-between mb-2">
                  <h2 className="text-xl font-medium group-hover:text-primary transition-colors">
                    {project.title}
                  </h2>
                  <span className="text-xs text-muted-foreground px-2 py-1 bg-secondary/50 rounded-full">
                    {project.category}
                  </span>
                </div>
                <p className="text-muted-foreground text-sm mb-4">
                  {project.description}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag) => (
                    <span 
                      key={tag} 
                      className="text-xs bg-secondary text-secondary-foreground px-2 py-1 rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                
                <div className="flex gap-4">
                  <a
                    href={project.github}
                    className="inline-flex items-center text-sm hover:text-primary transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Github className="h-4 w-4 mr-1" />
                    View Code
                  </a>
                  <a
                    href={project.live}
                    className="inline-flex items-center text-sm hover:text-primary transition-colors group"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span>Live Demo</span>
                    <ArrowUpRight className="h-3 w-3 ml-1 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
      
      {/* No results message */}
      {filteredProjects.length === 0 && (
        <div className="text-center py-20">
          <h3 className="text-xl font-medium mb-2">No projects found</h3>
          <p className="text-muted-foreground">
            No projects match the selected category. Try selecting a different filter.
          </p>
          <Button 
            variant="outline" 
            onClick={() => setSelectedCategory("All")}
            className="mt-4"
          >
            View all projects
          </Button>
        </div>
      )}
    </div>
  );
};

export default Projects;
