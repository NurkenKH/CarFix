import { Canvas } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera, Environment, ContactShadows } from "@react-three/drei";
import { Suspense } from "react";
import { CarModel } from "./CarModel";
import { motion } from "framer-motion";

interface CarViewerProps {
  selectedPart: { category: string; part: string } | null;
}

export const CarViewer = ({ selectedPart }: CarViewerProps) => {
  return (
    <div className="relative w-full h-full">
      <Canvas shadows>
        <PerspectiveCamera makeDefault position={[5, 2, 5]} fov={50} />
        
        <ambientLight intensity={0.3} />
        <directionalLight
          position={[10, 10, 5]}
          intensity={1}
          castShadow
          shadow-mapSize={[1024, 1024]}
        />
        <pointLight position={[-10, 5, -5]} intensity={0.5} color="#00d4ff" />
        <pointLight position={[10, 5, 5]} intensity={0.3} color="#ff9500" />
        
        <Suspense fallback={null}>
          <CarModel selectedPart={selectedPart} />
          <Environment preset="night" />
          <ContactShadows
            position={[0, -0.8, 0]}
            opacity={0.4}
            scale={10}
            blur={2}
            far={4}
          />
        </Suspense>
        
        <OrbitControls
          enablePan={true}
          enableZoom={true}
          enableRotate={true}
          minDistance={3}
          maxDistance={15}
          minPolarAngle={0}
          maxPolarAngle={Math.PI / 2}
        />
      </Canvas>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="absolute bottom-4 left-4 glass-panel px-4 py-3 rounded-lg text-sm text-muted-foreground"
      >
        <p className="mb-1">🖱️ <span className="text-foreground">Left Click + Drag:</span> Rotate</p>
        <p className="mb-1">🖱️ <span className="text-foreground">Right Click + Drag:</span> Pan</p>
        <p>🖱️ <span className="text-foreground">Scroll:</span> Zoom</p>
      </motion.div>

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
