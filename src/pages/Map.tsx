import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft, MapPin, Navigation, Search, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix leaflet default marker icon
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

// Custom marker for car services
const carServiceIcon = new L.Icon({
  iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

// User location marker
const userIcon = new L.Icon({
  iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

interface CarService {
  id: number;
  name: string;
  lat: number;
  lon: number;
  address?: string;
  phone?: string;
}

// Component to recenter map
function RecenterMap({ lat, lon }: { lat: number; lon: number }) {
  const map = useMap();
  useEffect(() => {
    map.setView([lat, lon], 14);
  }, [lat, lon, map]);
  return null;
}

export default function Map() {
  const [userLocation, setUserLocation] = useState<{ lat: number; lon: number } | null>(null);
  const [carServices, setCarServices] = useState<CarService[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchLoading, setSearchLoading] = useState(false);
  const { toast } = useToast();

  // Get user location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ lat: latitude, lon: longitude });
          setLoading(false);
          searchNearbyServices(latitude, longitude);
        },
        (error) => {
          console.error("Geolocation error:", error);
          // Default to Almaty, Kazakhstan
          setUserLocation({ lat: 43.238949, lon: 76.945465 });
          setLoading(false);
          searchNearbyServices(43.238949, 76.945465);
          toast({
            title: "Location access denied",
            description: "Showing results for Almaty. Enable location for better results.",
            variant: "destructive",
          });
        }
      );
    } else {
      setUserLocation({ lat: 43.238949, lon: 76.945465 });
      setLoading(false);
      searchNearbyServices(43.238949, 76.945465);
    }
  }, []);

  const searchNearbyServices = async (lat: number, lon: number) => {
    setSearchLoading(true);
    try {
      // Use Overpass API to search for car repair shops
      const radius = 10000; // 5km radius
      const query = `
        [out:json][timeout:25];
        (
          node["shop"="car_repair"](around:${radius},${lat},${lon});
          node["amenity"="car_repair"](around:${radius},${lat},${lon});
          node["shop"="car"](around:${radius},${lat},${lon});
          node["craft"="car_body_repair"](around:${radius},${lat},${lon});
          way["shop"="car_repair"](around:${radius},${lat},${lon});
          way["amenity"="car_repair"](around:${radius},${lat},${lon});
          
        );
        out center;
      `;
      
      const response = await fetch(
        `https://overpass-api.de/api/interpreter?data=${encodeURIComponent(query)}`
      );
      const data = await response.json();
      
      const services: CarService[] = data.elements.map((el: any, idx: number) => ({
        id: el.id || idx,
        name: el.tags?.name || "СТО / Auto Service / Авто сервис",
        lat: el.lat || el.center?.lat,
        lon: el.lon || el.center?.lon,
        address: el.tags?.["addr:street"] 
          ? `${el.tags?.["addr:street"]} ${el.tags?.["addr:housenumber"] || ""}`
          : undefined,
        phone: el.tags?.phone,
      })).filter((s: CarService) => s.lat && s.lon);
      
      setCarServices(services);
      
      if (services.length === 0) {
        toast({
          title: "No services found nearby",
          description: "Try zooming out or searching in a different area.",
        });
      } else {
        toast({
          title: `Found ${services.length} car services`,
          description: "Click on markers for details.",
        });
      }
    } catch (error) {
      console.error("Search error:", error);
      toast({
        title: "Search failed",
        description: "Could not fetch nearby services. Please try again.",
        variant: "destructive",
      });
    } finally {
      setSearchLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center"
        >
          <Loader2 className="w-12 h-12 text-primary animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Getting your location...</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="fixed top-0 left-0 right-0 z-[1000] glass-panel border-b border-border px-4 py-3"
      >
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <Link to="/">
            <Button variant="ghost" size="sm" className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back
            </Button>
          </Link>
          
          <div className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-primary" />
            <h1 className="font-semibold">Nearby Car Services (СТО)</h1>
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={() => userLocation && searchNearbyServices(userLocation.lat, userLocation.lon)}
            disabled={searchLoading}
            className="gap-2"
          >
            {searchLoading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Search className="w-4 h-4" />
            )}
            Refresh
          </Button>
        </div>
      </motion.header>

      {/* Map */}
      <div className="pt-16 h-screen">
        {userLocation && (
          <MapContainer
            center={[userLocation.lat, userLocation.lon]}
            zoom={14}
            className="w-full h-full"
            style={{ background: "#1a1a2e" }}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            
            <RecenterMap lat={userLocation.lat} lon={userLocation.lon} />
            
            {/* User location marker */}
            <Marker position={[userLocation.lat, userLocation.lon]} icon={userIcon}>
              <Popup>
                <div className="text-center">
                  <strong>📍 Your Location</strong>
                </div>
              </Popup>
            </Marker>
            
            {/* Car service markers */}
            {carServices.map((service) => (
              <Marker
                key={service.id}
                position={[service.lat, service.lon]}
                icon={carServiceIcon}
              >
                <Popup>
                  <div className="min-w-[200px]">
                    <h3 className="font-bold text-base mb-1">🔧 {service.name}</h3>
                    {service.address && (
                      <p className="text-sm text-gray-600 mb-1">📍 {service.address}</p>
                    )}
                    {service.phone && (
                      <p className="text-sm text-gray-600 mb-2">📞 {service.phone}</p>
                    )}
                    <a
                      href={`https://www.google.com/maps/dir/?api=1&destination=${service.lat},${service.lon}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-blue-600 hover:underline"
                    >
                      Get Directions →
                    </a>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        )}
      </div>

      {/* Stats overlay */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-72 glass-panel rounded-xl p-4 z-[1000]"
      >
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
            <Navigation className="w-5 h-5 text-primary" />
          </div>
          <div>
            <p className="font-semibold">{carServices.length} Services Found</p>
            <p className="text-xs text-muted-foreground">Within 5km radius</p>
          </div>
        </div>
        <p className="text-xs text-muted-foreground">
          Click on red markers to see details and get directions.
        </p>
      </motion.div>
    </div>
  );
}
