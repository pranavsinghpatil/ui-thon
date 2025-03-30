
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Blog = () => {
  const posts = [
    {
      id: 1,
      title: "Building a Modern React Application with TypeScript",
      excerpt: "Learn how to set up and structure a React application using TypeScript, complete with best practices for type safety.",
      date: "June 15, 2023",
      readTime: "8 min read",
      tags: ["React", "TypeScript"]
    },
    {
      id: 2,
      title: "The Power of CSS Grid for Complex Layouts",
      excerpt: "Dive deep into CSS Grid and discover how it can simplify even the most complex layout requirements in modern web design.",
      date: "May 22, 2023",
      readTime: "6 min read",
      tags: ["CSS", "Web Design"]
    },
    {
      id: 3,
      title: "API Authentication Strategies for Web Applications",
      excerpt: "Explore different authentication methods for securing your API endpoints and protecting user data in web applications.",
      date: "April 10, 2023",
      readTime: "10 min read",
      tags: ["Security", "APIs"]
    },
    {
      id: 4,
      title: "Optimizing React Performance with Memoization",
      excerpt: "Learn techniques to improve the performance of your React applications using memoization and other optimization strategies.",
      date: "March 5, 2023",
      readTime: "7 min read",
      tags: ["React", "Performance"]
    }
  ];

  return (
    <div className="page-container">
      <h1 className="text-3xl md:text-4xl font-bold">Blog</h1>
      <p className="text-muted-foreground mt-4">
        Thoughts, tutorials, and insights on web development and technology.
      </p>
      
      <div className="mt-12 space-y-10">
        {posts.map((post) => (
          <article key={post.id} className="border-b pb-8 last:border-0">
            <h2 className="text-xl md:text-2xl font-medium">
              <Link 
                to={`/blog/${post.id}`} 
                className="hover:text-primary transition-colors"
              >
                {post.title}
              </Link>
            </h2>
            
            <div className="mt-2 flex items-center text-sm text-muted-foreground">
              <span>{post.date}</span>
              <span className="inline-block mx-2">•</span>
              <span>{post.readTime}</span>
            </div>
            
            <p className="mt-3">{post.excerpt}</p>
            
            <div className="mt-4 flex items-center justify-between">
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span key={tag} className="text-xs bg-secondary text-secondary-foreground px-2 py-1 rounded">
                    {tag}
                  </span>
                ))}
              </div>
              
              <Button variant="link" asChild className="text-sm p-0 h-auto">
                <Link to={`/blog/${post.id}`}>
                  Read more
                </Link>
              </Button>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

export default Blog;
