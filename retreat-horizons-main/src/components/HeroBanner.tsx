import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

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
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = bannerImages;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((currentSlide + 1) % slides.length);
    }, 8000);
    return () => clearInterval(interval);
  }, [currentSlide, slides.length]);

  return (
    <section className="relative h-[80vh] overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0"
        >
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${slides[currentSlide].url})` }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/30" />
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="relative h-full flex items-center">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="max-w-2xl text-white"
          >
            <motion.h1 
              className="text-5xl md:text-6xl font-bold mb-6 font-['Playfair_Display']"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              {slides[currentSlide].title}
            </motion.h1>
            <motion.p 
              className="text-xl mb-8 text-gray-200"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {slides[currentSlide].description}
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <Button
                className="bg-white text-gray-900 hover:bg-gray-100 rounded-full px-8 py-6 text-lg font-semibold flex items-center gap-2 transform transition-all duration-300 hover:scale-105 hover:shadow-lg"
                onClick={() => document.getElementById('listings')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Explore Stays
                <ArrowRight className="h-5 w-5" />
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <motion.button
            key={index}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide ? 'bg-white scale-125' : 'bg-white/50 hover:bg-white/70'
            }`}
            onClick={() => setCurrentSlide(index)}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroBanner;