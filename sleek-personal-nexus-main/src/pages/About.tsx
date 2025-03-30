
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const About = () => {
  return (
    <div className="page-container">
      <h1 className="text-3xl md:text-4xl font-bold">About Me</h1>
      
      <div className="mt-8 space-y-6">
        <p className="text-lg">
          I'm a passionate developer with a focus on creating beautiful, functional web applications. With over 5 years of experience in the industry, I've worked on a variety of projects from small business websites to complex enterprise applications.
        </p>
        
        <p>
          My journey in programming began in college where I studied Computer Science. Since then, I've continued to learn and grow, staying up-to-date with the latest technologies and best practices in the field.
        </p>
        
        <h2 className="text-2xl font-semibold mt-10 pt-2">Skills</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
          {[
            "JavaScript/TypeScript", 
            "React", 
            "Node.js", 
            "CSS/Tailwind", 
            "Next.js", 
            "GraphQL",
            "AWS/Firebase",
            "MongoDB/SQL",
            "UI/UX Design"
          ].map((skill) => (
            <div key={skill} className="flex items-center">
              <div className="w-2 h-2 bg-primary rounded-full mr-2"></div>
              <span>{skill}</span>
            </div>
          ))}
        </div>
        
        <h2 className="text-2xl font-semibold mt-10 pt-2">Experience</h2>
        <div className="space-y-8 mt-4">
          {[
            {
              title: "Senior Frontend Developer",
              company: "Tech Company",
              period: "2021 - Present",
              description: "Leading the frontend team in developing modern web applications."
            },
            {
              title: "Web Developer",
              company: "Agency Name",
              period: "2018 - 2021",
              description: "Built websites and applications for various clients across different industries."
            }
          ].map((job, index) => (
            <div key={index} className="border-l-2 border-muted pl-4 hover:border-primary transition-colors duration-300">
              <h3 className="font-medium">{job.title}</h3>
              <div className="flex justify-between text-sm mt-1">
                <span>{job.company}</span>
                <span className="text-muted-foreground">{job.period}</span>
              </div>
              <p className="mt-2 text-muted-foreground">{job.description}</p>
            </div>
          ))}
        </div>
        
        <div className="mt-12 pt-4">
          <Button asChild>
            <Link to="/projects">
              View my projects
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default About;
