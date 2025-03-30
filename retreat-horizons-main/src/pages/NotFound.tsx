
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-earthy-light">
      <div className="text-center max-w-md p-8 bg-white rounded-xl shadow-lg">
        <h1 className="text-6xl font-bold mb-4 text-earthy-brown font-['Playfair_Display']">404</h1>
        <p className="text-xl text-earthy-dark mb-6">Oops! This destination doesn't exist</p>
        <p className="mb-8 text-muted-foreground">The page you're looking for has wandered off the map. Let's get you back on track.</p>
        <Button 
          className="bg-earthy-brown hover:bg-earthy-dark text-white rounded-full px-6 flex items-center gap-2"
          onClick={() => window.location.href = "/"}
        >
          <Home className="h-4 w-4" />
          Return Home
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
