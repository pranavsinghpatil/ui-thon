import { useState } from "react";
import { motion } from "framer-motion";
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
    <div className="min-h-screen flex flex-col bg-[#9ACBD0]/15 bg-gradient-to-b from-[#9ACBD0]/30 via-[#79D7BE]/50 to-earthy-light/50">
      <NavBar />
      
      <main className="flex-grow">
        <HeroBanner />
        
        <motion.section 
          id="listings" 
          className="container mx-auto px-4 py-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-4xl font-bold mb-8 text-center font-['Playfair_Display'] text-earthy-dark bg-gradient-to-r from-earthy-brown to-earthy-dark bg-clip-text text-transparent"
          >
            Find Your Perfect Getaway
          </motion.h2>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Filters />
          </motion.div>
          
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-10"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            {listings.map((listing, index) => (
              <motion.div
                key={listing.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <ListingCard listing={listing} />
              </motion.div>
            ))}
          </motion.div>
          
          <motion.div 
            className="flex justify-center mt-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            viewport={{ once: true }}
          >
            <Button
              data-map-view-trigger
              className="bg-gradient-to-r from-earthy-brown to-earthy-dark hover:from-earthy-dark hover:to-earthy-brown text-white rounded-full px-6 flex items-center gap-2 shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105"
              onClick={() => setShowMap(true)}
            >
              <Map className="h-4 w-4" />
              View on Map
            </Button>
          </motion.div>
        </motion.section>
        
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
