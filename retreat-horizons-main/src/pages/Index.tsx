
import { useState } from "react";
import NavBar from "@/components/NavBar";
import HeroBanner from "@/components/HeroBanner";
import Filters from "@/components/Filters";
import ListingCard from "@/components/ListingCard";
import MapView from "@/components/MapView";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Map } from "lucide-react";
import { listings } from "@/data/listings";

const Index = () => {
  const [showMap, setShowMap] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-[#9ACBD0]/15 bg-gradient-to-b from-[#9ACBD0]/30 via-white/50 to-earthy-light/50">
      <NavBar />
      
      <main className="flex-grow">
        <HeroBanner />
        
        <section id="listings" className="container mx-auto px-4 py-16">
          <h2 className="text-4xl font-bold mb-8 text-center font-['Playfair_Display'] text-earthy-dark bg-gradient-to-r from-earthy-brown to-earthy-dark bg-clip-text text-transparent">
            Find Your Perfect Getaway
          </h2>
          
          <Filters />
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-10">
            {listings.map((listing) => (
              <ListingCard key={listing.id} listing={listing} />
            ))}
          </div>
          
          <div className="flex justify-center mt-12">
            <Button
              data-map-view-trigger
              className="bg-gradient-to-r from-earthy-brown to-earthy-dark hover:from-earthy-dark hover:to-earthy-brown text-white rounded-full px-6 flex items-center gap-2 shadow-lg transition-all duration-300 hover:shadow-xl"
              onClick={() => setShowMap(true)}
            >
              <Map className="h-4 w-4" />
              View on Map
            </Button>
          </div>
        </section>
        
        <MapView
          listings={listings}
          isOpen={showMap}
          onClose={() => setShowMap(false)}
        />
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
