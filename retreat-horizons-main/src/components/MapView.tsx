
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { MapPin, X } from "lucide-react";
import { type ListingProps } from "./ListingCard";

const MapView = ({
  listings,
  isOpen,
  onClose,
}: {
  listings: ListingProps[];
  isOpen: boolean;
  onClose: () => void;
}) => {
  const [selectedPin, setSelectedPin] = useState<string | null>(null);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-40 bg-white">
      <div className="absolute top-4 right-4 z-10">
        <Button
          variant="outline"
          size="icon"
          className="rounded-full bg-white shadow-md"
          onClick={onClose}
        >
          <X className="h-5 w-5" />
        </Button>
      </div>

      <div className="h-full p-4 flex flex-col">
        <div className="relative flex-1 bg-[#9ACBD0]/20 rounded-xl overflow-hidden shadow-xl">
          {/* Map background with proper styling */}
          <div className="absolute inset-0">
            <img
              src="https://images.unsplash.com/photo-1501854140801-50d01698950b"
              alt="Map background"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[#9ACBD0]/10 to-[#9ACBD0]/30 backdrop-blur-[2px]" />
          </div>
          
          {/* Map pins */}
          {listings.map((listing) => {
            // Randomly position pins across the map
            const top = 20 + Math.random() * 60; // Between 20% and 80% from the top
            const left = 20 + Math.random() * 60; // Between 20% and 80% from the left
            
            return (
              <div
                key={listing.id}
                className="map-pin absolute cursor-pointer z-10"
                style={{ top: `${top}%`, left: `${left}%` }}
                onClick={() => setSelectedPin(listing.id === selectedPin ? null : listing.id)}
              >
                <div className="bg-earthy-brown rounded-full flex items-center justify-center w-6 h-6 shadow-lg">
                  <MapPin
                    className="h-4 w-4 text-white"
                    fill={selectedPin === listing.id ? "white" : "transparent"}
                  />
                </div>
                
                {selectedPin === listing.id && (
                  <div className="map-preview absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 bg-white p-2 rounded-md shadow-lg transform origin-bottom scale-100 transition-transform duration-200 z-20">
                    <img
                      src={listing.imageUrl}
                      alt={listing.title}
                      className="w-full h-24 object-cover rounded-md mb-2"
                    />
                    <div className="text-sm font-semibold">{listing.title}</div>
                    <div className="text-sm text-earthy-dark">${listing.price}/night</div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default MapView;
