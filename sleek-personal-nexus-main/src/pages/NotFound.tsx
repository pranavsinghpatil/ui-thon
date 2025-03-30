
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const NotFound = () => {
  return (
    <div className="page-container min-h-[70vh] flex flex-col items-center justify-center text-center">
      <h1 className="text-4xl md:text-6xl font-bold">404</h1>
      <p className="mt-4 text-xl md:text-2xl">Page not found</p>
      <p className="mt-2 text-muted-foreground max-w-md">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <Button className="mt-8" asChild>
        <Link to="/">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to home
        </Link>
      </Button>
    </div>
  );
};

export default NotFound;
