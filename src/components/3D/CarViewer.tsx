import { motion } from "framer-motion";

interface CarViewerProps {
  selectedPart: { category: string; part: string } | null;
}

export const CarViewer = ({ selectedPart }: CarViewerProps) => {
  return (
    <div className="relative w-full h-full">
      <div className="w-full h-full">
        <iframe 
          title="Toyota Camry Hybrid SE 2021" 
          frameBorder="0" 
          allowFullScreen 
          allow="autoplay; fullscreen; xr-spatial-tracking" 
          className="w-full h-full"
          src="https://sketchfab.com/models/147a0afe465144b5a474dc2f8c0a42cc/embed"
        />
      </div>

      {selectedPart && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-4 right-4 glass-panel px-6 py-4 rounded-lg"
        >
          <p className="text-sm text-muted-foreground mb-1">Selected Part</p>
          <p className="text-lg font-semibold text-primary">{selectedPart.part}</p>
          <p className="text-sm text-muted-foreground capitalize">{selectedPart.category}</p>
        </motion.div>
      )}
    </div>
  );
};
