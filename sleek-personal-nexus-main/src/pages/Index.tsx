
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, ChevronRight, Github, Mail, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";

const Index = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      }
    }
  };

  // Categories with project counts
  const categories = [
    { name: "Web Development", count: 3 },
    { name: "AI/ML", count: 2 },
    { name: "Data Science", count: 2 },
    { name: "Blockchain", count: 2 },
    { name: "NLP", count: 2 },
    { name: "Mobile Development", count: 1 }
  ];

  // Featured projects
  const featuredProjects = [
    {
      id: 1,
      title: "E-commerce Platform",
      description: "A full-featured online store built with React and Node.js with advanced product filtering and payment integration.",
      tags: ["React", "Node.js", "MongoDB", "Stripe"],
      image: "project-1.jpg",
      github: "https://github.com/username/project-1",
      live: "https://project-1-demo.com",
      category: "Web Development"
    },
    {
      id: 6,
      title: "AI Content Generator",
      description: "A tool that leverages GPT models to create marketing content and articles based on brief inputs.",
      tags: ["Python", "TensorFlow", "React", "FastAPI"],
      image: "project-6.jpg",
      github: "https://github.com/username/project-6",
      live: "https://project-6-demo.com",
      category: "AI/ML"
    }
  ];

  return (
    <div className="page-container">
      <motion.section 
        className="py-12 md:py-20 flex flex-col items-start"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants}>
          <span className="text-sm md:text-base text-muted-foreground mb-4 inline-block">
            Hello, my name is
          </span>
          <h1 className="text-4xl md:text-6xl font-bold leading-tight tracking-tighter mb-4">
            <span className="text-primary">Developer Name</span>
          </h1>
          <h2 className="text-3xl md:text-5xl font-bold text-muted-foreground leading-tight mb-6">
            I build things for the web & beyond.
          </h2>
        </motion.div>
        
        <motion.p 
          className="mt-4 text-lg text-muted-foreground max-w-2xl mb-8"
          variants={itemVariants}
        >
          I'm a versatile developer with expertise spanning web development, 
          artificial intelligence, blockchain, and data science. My passion lies in 
          creating innovative solutions that bridge cutting-edge technology with 
          intuitive user experiences.
        </motion.p>
        
        <motion.div 
          className="flex flex-wrap gap-4 mb-16"
          variants={itemVariants}
        >
          <Button asChild size="lg">
            <Link to="/projects" className="group">
              View my work
              <ChevronRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </Button>
          <Button variant="outline" size="lg" asChild>
            <a href="https://github.com/username" target="_blank" rel="noopener noreferrer">
              <Github className="mr-2 h-4 w-4" />
              GitHub
            </a>
          </Button>
          <Button variant="outline" size="lg" asChild>
            <Link to="/contact">
              <Mail className="mr-2 h-4 w-4" />
              Contact me
            </Link>
          </Button>
        </motion.div>
        
        {/* Expertise Areas */}
        <motion.div 
          className="w-full mb-16"
          variants={itemVariants}
        >
          <h2 className="text-2xl font-bold mb-6">Areas of Expertise</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {categories.map((category) => (
              <Link 
                key={category.name}
                to={`/projects`}
                state={{ category: category.name }}
                className="border rounded-lg p-4 hover:border-primary transition-all duration-300 group"
              >
                <h3 className="font-medium group-hover:text-primary transition-colors">
                  {category.name}
                </h3>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-sm text-muted-foreground">
                    {category.count} projects
                  </span>
                  <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </Link>
            ))}
          </div>
        </motion.div>
        
        {/* Featured Projects */}
        <motion.div 
          className="w-full"
          variants={itemVariants}
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Featured Projects</h2>
            <Link 
              to="/projects" 
              className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center group"
            >
              <span>View all projects</span>
              <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {featuredProjects.map((project) => (
              <div
                key={project.id}
                className="border rounded-lg overflow-hidden hover:border-primary transition-all duration-300 group h-full flex flex-col"
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
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-medium group-hover:text-primary transition-colors">
                      {project.title}
                    </h3>
                    <span className="text-xs text-muted-foreground px-2 py-1 bg-secondary/50 rounded-full">
                      {project.category}
                    </span>
                  </div>
                  <p className="text-muted-foreground mb-4 flex-1">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag) => (
                      <span key={tag} className="text-xs bg-secondary text-secondary-foreground px-2 py-1 rounded">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex space-x-4">
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
                      <span>Live Demo</span>
                      <ArrowRight className="h-4 w-4 ml-1 transition-transform group-hover:translate-x-1" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </motion.section>
    </div>
  );
};

export default Index;
