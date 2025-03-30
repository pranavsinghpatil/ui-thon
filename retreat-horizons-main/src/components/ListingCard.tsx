import { useState } from "react";
import { motion } from "framer-motion";
import { Heart, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BookingConfirmation } from "./BookingConfirmation";

export interface ListingProps {
  id: string;
  title: string;
  location: string;
  description: string;
  price: number;
  rating: number;
  imageUrl: string;
  availability: string;
  tags: string[];
}

const ListingCard = ({ listing }: { listing: ListingProps }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const toggleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsLiked(!isLiked);
  };

  const handleBook = () => {
    setShowConfirmation(true);
    // Close confirmation after 3 seconds
    setTimeout(() => {
      setShowConfirmation(false);
    }, 3000);
  };

  return (
    <motion.div 
      className="listing-card group h-full card-gradient bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
      whileHover={{ 
        y: -5,
        transition: { duration: 0.2 }
      }}
    >
      <div className="relative overflow-hidden">
        <motion.img
          src={listing.imageUrl}
          alt={listing.title}
          className="listing-image h-64 w-full object-cover transform"
          whileHover={{ 
            scale: 1.05,
            transition: { duration: 0.4 }
          }}
        />
        <motion.div
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          className="absolute inset-0 bg-black/20 transition-opacity"
        />
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-2 right-2 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white transform transition-all duration-300 hover:scale-110"
          onClick={toggleLike}
        >
          <Heart
            className={`h-5 w-5 transform transition-all duration-300 ${
              isLiked ? "fill-red-500 text-red-500 scale-110" : "text-gray-600"
            }`}
          />
        </Button>
        <div className="absolute top-2 left-2 bg-white/80 backdrop-blur-sm px-2 py-1 rounded-full flex items-center gap-1">
          <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
          <span className="text-sm font-medium">{listing.rating}</span>
        </div>
      </div>
      
      <motion.div 
        className="p-4"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <h3 className="text-lg font-semibold mb-2 text-gray-900 group-hover:text-earthy-dark transition-colors">
          {listing.title}
        </h3>
        <p className="text-sm text-gray-600 mb-2">{listing.location}</p>
        <div className="flex flex-wrap gap-2 mb-3">
          {listing.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs px-2 py-1 rounded-full bg-earthy-light/20 text-earthy-dark"
            >
              {tag}
            </span>
          ))}
        </div>
        <p className="text-sm text-gray-700 mb-4">{listing.description}</p>
        <div className="flex items-center justify-between">
          <div>
            <span className="text-2xl font-bold text-earthy-dark">${listing.price}</span>
            <span className="text-sm text-gray-600">/night</span>
          </div>
          <Button
            onClick={handleBook}
            className="bg-gradient-to-r from-earthy-brown to-earthy-dark hover:from-earthy-dark hover:to-earthy-brown text-white rounded-full px-6 py-2 transform transition-all duration-300 hover:scale-105 hover:shadow-lg"
          >
            Book Now
          </Button>
        </div>
      </motion.div>
      
      {showConfirmation && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
        >
          <BookingConfirmation listingTitle={listing.title} />
        </motion.div>
      )}
    </motion.div>
  );
};

export default ListingCard;
