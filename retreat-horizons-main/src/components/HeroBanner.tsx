import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowDown } from "lucide-react";
const bannerImages = [
  {
    url: "https://images.unsplash.com/photo-1501854140801-50d01698950b",
    title: "Mountain Retreat",
    description: "Escape to the peaks for tranquil moments and breathtaking landscapes."
  },
  {
    url: "https://images.unsplash.com/photo-1449844908441-8829872d2607",
    title: "Rustic Woodland Villa",
    description: "Immerse yourself in the charm of nature with a cozy forest stay."
  },
  {
    url: "https://images.unsplash.com/photo-1518005020951-eccb494ad742",
    title: "Serene Desert Escape",
    description: "Unwind amidst the timeless beauty and stillness of the desert."
  },
  {
    url: "https://images.unsplash.com/photo-1484910292437-025e5d13ce87",
    title: "Adventurous Hiking",
    description: "Venture into the great outdoors and connect deeply with nature."
  },
  {
    url: "https://images.unsplash.com/photo-1505843513577-22bb7d21e455",
    title: "Majestic Mansion",
    description: "Experience grand living with luxurious amenities and expansive spaces."
  },
  {
    url: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6",
    title: "Modern Haven",
    description: "Delight in contemporary comforts with state-of-the-art facilities."
  },
  {
    url: "https://images.unsplash.com/photo-1605276373954-0c4a0dac5b12",
    title: "Countryside Bliss",
    description: "Embrace the serenity and charm of rural landscapes for total relaxation."
  },
  {
    url: "https://images.unsplash.com/photo-1608429835892-30be51ea4d6c",
    title: "Sportsman's Paradise",
    description: "Engage in world-class sports and enjoy top-notch facilities."
  }
];
const HeroBanner = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [nextIndex, setNextIndex] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const current = bannerImages[currentIndex];
  const next = bannerImages[nextIndex];
  useEffect(() => {
    const transitionTimer = setTimeout(() => {
      setIsTransitioning(true);
    }, 7000); // Start transition after 7 seconds

    const interval = setTimeout(() => {
      setCurrentIndex(nextIndex);
      setNextIndex((nextIndex + 1) % bannerImages.length);
      setIsTransitioning(false);
    }, 8000); // Complete transition after 8 seconds (1 second for transition itself)

    return () => {
      clearTimeout(interval);
      clearTimeout(transitionTimer);
    };
  }, [currentIndex, nextIndex]);
  const scrollToListings = () => {
    const listingsSection = document.getElementById("listings");
    if (listingsSection) {
      listingsSection.scrollIntoView({
        behavior: "smooth"
      });
    }
  };
  return <div className="relative h-[100vh] overflow-hidden w-full">
      {/* Current image */}
      <div className={`absolute inset-0 bg-cover bg-center animate-slow-zoom transition-opacity duration-1000 ${isTransitioning ? "opacity-0" : "opacity-100"}`} style={{
      backgroundImage: `url(${current.url})`
    }}>
        <div className="absolute inset-0 bg-black/30" />
      </div>

      {/* Next image (for transition) */}
      <div className={`absolute inset-0 bg-cover bg-center animate-slow-zoom transition-opacity duration-1000 ${isTransitioning ? "opacity-100" : "opacity-0"}`} style={{
      backgroundImage: `url(${next.url})`
    }}>
        <div className="absolute inset-0 bg-black/30" />
      </div>

      {/* Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-4">
        <h1 className="text-4xl md:text-6xl font-bold mb-4 text-center max-w-4xl animate-fade-in">
          {current.title}
        </h1>
        <p className="text-xl md:text-2xl mb-8 text-center max-w-2xl animate-fade-in">
          {current.description}
        </p>
        <Button className="bg-earthy-brown hover:bg-earthy-dark text-white rounded-full px-8 py-6 text-lg font-semibold transition-transform hover:scale-105" onClick={scrollToListings}>
          Explore Stays
        </Button>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white flex flex-col items-center animate-pulse-gentle">
        
        <ArrowDown size={24} />
      </div>
    </div>;
};
export default HeroBanner;