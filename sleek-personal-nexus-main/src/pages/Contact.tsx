
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { Mail, Github, Linkedin, Twitter } from "lucide-react";

const Contact = () => {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      toast({
        title: "Message sent!",
        description: "Thanks for reaching out. I'll get back to you soon.",
      });
      setFormState({ name: "", email: "", message: "" });
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <div className="page-container">
      <h1 className="text-3xl md:text-4xl font-bold">Contact</h1>
      <p className="text-muted-foreground mt-4">
        Have a question or want to work together? Feel free to reach out.
      </p>

      <div className="mt-12 grid md:grid-cols-2 gap-12">
        <div>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-2">
                Name
              </label>
              <Input
                id="name"
                name="name"
                value={formState.name}
                onChange={handleChange}
                required
              />
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2">
                Email
              </label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formState.email}
                onChange={handleChange}
                required
              />
            </div>
            
            <div>
              <label htmlFor="message" className="block text-sm font-medium mb-2">
                Message
              </label>
              <Textarea
                id="message"
                name="message"
                rows={5}
                value={formState.message}
                onChange={handleChange}
                required
                className="resize-none"
              />
            </div>
            
            <Button type="submit" disabled={isSubmitting} className="w-full">
              {isSubmitting ? "Sending..." : "Send Message"}
            </Button>
          </form>
        </div>
        
        <div className="space-y-8">
          <div>
            <h2 className="text-xl font-medium mb-3">Connect</h2>
            <div className="space-y-4">
              <a 
                href="mailto:hello@example.com"
                className="flex items-center hover:text-primary transition-colors"
              >
                <Mail className="mr-3 h-5 w-5" />
                hello@example.com
              </a>
              <a 
                href="https://github.com/yourusername" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center hover:text-primary transition-colors"
              >
                <Github className="mr-3 h-5 w-5" />
                github.com/yourusername
              </a>
              <a 
                href="https://linkedin.com/in/yourusername" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center hover:text-primary transition-colors"
              >
                <Linkedin className="mr-3 h-5 w-5" />
                linkedin.com/in/yourusername
              </a>
              <a 
                href="https://twitter.com/yourusername" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center hover:text-primary transition-colors"
              >
                <Twitter className="mr-3 h-5 w-5" />
                @yourusername
              </a>
            </div>
          </div>
          
          <div>
            <h2 className="text-xl font-medium mb-3">Location</h2>
            <p className="text-muted-foreground">
              Currently based in San Francisco, California. Available for remote work worldwide.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
