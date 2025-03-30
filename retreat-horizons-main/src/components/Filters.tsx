
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Filter, Home, Star, Heart, Compass, Map, Calendar, Check, X } from "lucide-react";
import { cn } from "@/lib/utils";

const FilterSection = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <div className="mb-6">
    <h3 className="text-lg font-semibold mb-3">{title}</h3>
    <div>{children}</div>
  </div>
);

const FilterToggle = ({
  icon,
  label,
  checked,
  onChange,
  animated = false,
}: {
  icon: React.ReactNode;
  label: string;
  checked: boolean;
  onChange: () => void;
  animated?: boolean;
}) => (
  <div className="flex items-center justify-between mb-3">
    <div className="flex items-center gap-2">
      <div
        className={cn(
          "w-8 h-8 rounded-full flex items-center justify-center",
          checked ? "bg-earthy-brown text-white" : "bg-muted"
        )}
      >
        <div className={animated && checked ? "flicker-icon" : ""}>{icon}</div>
      </div>
      <span>{label}</span>
    </div>
    <Switch checked={checked} onCheckedChange={onChange} />
  </div>
);

const FilterTag = ({
  label,
  selected,
  onClick,
}: {
  label: string;
  selected: boolean;
  onClick: () => void;
}) => (
  <Button
    variant={selected ? "default" : "outline"}
    className={cn(
      "rounded-full mr-2 mb-2",
      selected && "bg-earthy-brown hover:bg-earthy-dark"
    )}
    onClick={onClick}
  >
    {label}
  </Button>
);

const amenities = [
  { icon: <Home size={16} />, label: "Entire home", animated: false },
  { icon: <Star size={16} />, label: "Amazing views", animated: false },
  { icon: <Heart size={16} />, label: "Romantic", animated: false },
  { icon: <Compass size={16} />, label: "Outdoor space", animated: true },
  { icon: <Map size={16} />, label: "Near attractions", animated: false },
  { icon: <Calendar size={16} />, label: "Instant book", animated: false },
];

const locations = ["Beach", "Mountain", "Countryside", "City", "Desert", "Lake"];

const Filters = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [price, setPrice] = useState([100, 500]);
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);

  const toggleAmenity = (amenity: string) => {
    setSelectedAmenities((prev) =>
      prev.includes(amenity)
        ? prev.filter((a) => a !== amenity)
        : [...prev, amenity]
    );
  };

  const toggleLocation = (location: string) => {
    setSelectedLocations((prev) =>
      prev.includes(location)
        ? prev.filter((l) => l !== location)
        : [...prev, location]
    );
  };

  const togglePanel = () => setIsOpen(!isOpen);

  const resetFilters = () => {
    setPrice([100, 500]);
    setSelectedAmenities([]);
    setSelectedLocations([]);
  };

  return (
    <div className="relative z-10">
      {/* Filter button */}
      <div className="flex justify-center mt-6 mb-4">
        <Button
          variant="outline"
          className="rounded-full flex items-center gap-2"
          onClick={togglePanel}
        >
          <Filter size={16} />
          {isOpen ? "Hide Filters" : "Show Filters"}
        </Button>
      </div>

      {/* Filter panel */}
      <div
        className={cn(
          "fixed top-0 left-0 h-full w-80 bg-white shadow-xl transform transition-transform duration-300 ease-in-out z-50",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="p-6 h-full overflow-y-auto">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold">Filters</h2>
            <Button variant="ghost" size="icon" onClick={togglePanel}>
              <X size={20} />
            </Button>
          </div>

          <FilterSection title="Price Range">
            <Slider
              value={price}
              min={0}
              max={1000}
              step={10}
              onValueChange={setPrice}
              className="my-6"
            />
            <div className="flex justify-between items-center text-sm">
              <span>${price[0]}</span>
              <span>${price[1]}+</span>
            </div>
          </FilterSection>

          <FilterSection title="Amenities">
            {amenities.map((amenity) => (
              <FilterToggle
                key={amenity.label}
                icon={amenity.icon}
                label={amenity.label}
                checked={selectedAmenities.includes(amenity.label)}
                onChange={() => toggleAmenity(amenity.label)}
                animated={amenity.animated}
              />
            ))}
          </FilterSection>

          <FilterSection title="Location Type">
            <div className="flex flex-wrap">
              {locations.map((location) => (
                <FilterTag
                  key={location}
                  label={location}
                  selected={selectedLocations.includes(location)}
                  onClick={() => toggleLocation(location)}
                />
              ))}
            </div>
          </FilterSection>

          <div className="flex gap-3 mt-8">
            <Button
              variant="outline"
              className="flex-1"
              onClick={resetFilters}
            >
              Reset
            </Button>
            <Button
              className="flex-1 bg-earthy-brown hover:bg-earthy-dark"
              onClick={togglePanel}
            >
              Apply
            </Button>
          </div>
        </div>
      </div>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
          onClick={togglePanel}
        />
      )}
    </div>
  );
};

export default Filters;
