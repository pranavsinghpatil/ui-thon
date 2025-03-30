
import { useState } from "react";
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
    <div className="listing-card group h-full card-gradient">
      <div className="relative">
        <img
          src={listing.imageUrl}
          alt={listing.title}
          className="listing-image h-64 w-full object-cover"
        />
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-2 right-2 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white"
          onClick={toggleLike}
        >
          <Heart
            className={`h-5 w-5 ${
              isLiked ? "fill-red-500 text-red-500" : "text-gray-700"
            }`}
          />
        </Button>
        <div className="availability bg-gradient-to-r from-earthy-light to-white backdrop-blur-sm">
          {listing.availability}
        </div>
      </div>
      <div className="p-4">
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-semibold font-['Cormorant_Garamond'] mb-1">{listing.title}</h3>
          <div className="flex items-center gap-1 text-sm">
            <Star className="h-4 w-4 fill-earthy-gold text-earthy-gold" />
            <span>{listing.rating}</span>
          </div>
        </div>
        <p className="text-sm text-muted-foreground mb-2 font-['Montserrat']">{listing.location}</p>
        <div className="flex flex-wrap gap-1 mb-3">
          {listing.tags.map((tag, index) => (
            <span
              key={index}
              className="text-xs px-2 py-1 bg-gradient-to-r from-earthy-light to-white rounded-full font-['Montserrat']"
            >
              {tag}
            </span>
          ))}
        </div>
        <p className="text-sm line-clamp-2 mb-4 font-['Montserrat']">{listing.description}</p>
        <div className="flex items-center justify-between">
          <p className="font-semibold">
            <span className="text-lg font-['Playfair_Display']">${listing.price}</span>{" "}
            <span className="text-sm text-muted-foreground font-['Montserrat']">/ night</span>
          </p>
          <Button 
            className="button-gradient text-white rounded-full transition-all duration-300 hover:scale-105 font-['Montserrat']"
            onClick={handleBook}
          >
            Book Now
          </Button>
        </div>
      </div>

      {showConfirmation && <BookingConfirmation listingTitle={listing.title} />}
    </div>
  );
};

export default ListingCard;
