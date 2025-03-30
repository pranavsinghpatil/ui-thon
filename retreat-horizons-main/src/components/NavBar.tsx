
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, MapPin, Calendar, User, Home } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const NavBar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();

  // Add scroll event listener
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener("scroll", handleScroll);
    
    // Cleanup
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleHomeClick = () => {
    navigate('/');
    window.scrollTo(0, 0);
  };

  const handleMapViewClick = () => {
    document.getElementById('listings')?.scrollIntoView({ behavior: 'smooth' });
    // Trigger map view after scrolling
    setTimeout(() => {
      const mapViewButton = document.querySelector('[data-map-view-trigger]') as HTMLButtonElement;
      if (mapViewButton) mapViewButton.click();
    }, 800);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/60 backdrop-blur-md shadow-sm py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="text-gradient-brand text-2xl font-bold font-['Cormorant_Garamond']">
            Horizon<span className="text-earthy-rose">Stay</span>
          </div>
          <Button 
            variant="ghost" 
            size="sm" 
            className="rounded-full"
            onClick={handleHomeClick}
          >
            <Home className="h-4 w-4 mr-2" />
            Home
          </Button>
        </div>

        <div className="hidden md:flex items-center max-w-md w-full mx-5 bg-white/95 backdrop-blur-sm rounded-full shadow-md border border-border hover:shadow-lg transition-all duration-300">
          <Button variant="ghost" size="sm" className="rounded-full font-['Montserrat'] text-sm ml-2">
            <MapPin className="h-4 w-4 mr-2" />
            Where
          </Button>
          <div className="border-l h-6 border-border mx-2" />
          <Button variant="ghost" size="sm" className="rounded-full font-['Montserrat'] text-sm">
            <Calendar className="h-4 w-4 mr-2" />
            Any week
          </Button>
          <div className="border-l h-6 border-border mx-2" />
          <Button variant="ghost" size="sm" className="rounded-full font-['Montserrat'] text-sm">
            <User className="h-4 w-4 mr-2" />
            Add guests
          </Button>
          <Button size="icon" className="rounded-full ml-auto mr-1 bg-gradient-to-r from-earthy-brown to-earthy-dark">
            <Search className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            className="rounded-full hidden md:flex items-center gap-2 font-['Montserrat']"
            onClick={handleMapViewClick}
          >
            <MapPin className="h-4 w-4" />
            Map View
          </Button>
          <Button
            variant="outline"
            className="rounded-full hidden md:flex items-center font-['Montserrat']"
          >
            Sign In
          </Button>
          <Button className="rounded-full bg-gradient-to-r from-earthy-brown to-earthy-dark hover:from-earthy-dark hover:to-earthy-brown text-white font-['Montserrat']">
            <span className="hidden md:inline">Become a Host</span>
            <span className="md:hidden">Host</span>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default NavBar;
