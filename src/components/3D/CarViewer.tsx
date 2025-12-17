import { Suspense, useState, useRef, useEffect } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { OrbitControls, Environment, ContactShadows } from "@react-three/drei";
import { motion, AnimatePresence } from "framer-motion";
import { CorollaModel, ClickablePart, partPositions } from "./CorollaModel";
import { X, Package, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import * as THREE from "three";

interface CarViewerProps {
  selectedPart?: { category: string; part: string } | null;
  selectedPartName?: string | null;
}

const LoadingFallback = () => (
  <mesh>
    <boxGeometry args={[1, 1, 1]} />
    <meshStandardMaterial color="#444" wireframe />
  </mesh>
);

// Map sidebar selections to clickable part names
const sidebarToPartMap: Record<string, string> = {
  "mirror": "Side Mirror",
  "body": "Left Body Panelka",
  "paint": "Left Body Panel Door",
  "glass": "Front Windshield",
  "aero": "Front Windshield",
};

interface CameraControllerProps {
  targetPosition: [number, number, number] | null;
  targetLookAt: [number, number, number] | null;
  controlsRef: React.RefObject<any>;
}

const CameraController = ({ targetPosition, targetLookAt, controlsRef }: CameraControllerProps) => {
  const { camera } = useThree();
  
  useEffect(() => {
    if (targetPosition && targetLookAt && controlsRef.current) {
      // Animate camera to target position
      const startPos = camera.position.clone();
      const endPos = new THREE.Vector3(...targetPosition);
      const startTarget = controlsRef.current.target.clone();
      const endTarget = new THREE.Vector3(...targetLookAt);
      
      let progress = 0;
      const duration = 1000; // 1 second
      const startTime = Date.now();
      
      const animate = () => {
        const elapsed = Date.now() - startTime;
        progress = Math.min(elapsed / duration, 1);
        
        // Easing function
        const eased = 1 - Math.pow(1 - progress, 3);
        
        camera.position.lerpVectors(startPos, endPos, eased);
        controlsRef.current.target.lerpVectors(startTarget, endTarget, eased);
        controlsRef.current.update();
        
        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };
      
      animate();
    }
  }, [targetPosition, targetLookAt, camera, controlsRef]);
  
  return null;
};

export const CarViewer = ({ selectedPart, selectedPartName }: CarViewerProps) => {
  const [clickedPart, setClickedPart] = useState<ClickablePart | null>(null);
  const [cameraTarget, setCameraTarget] = useState<{ position: [number, number, number]; lookAt: [number, number, number] } | null>(null);
  const [highlightedPart, setHighlightedPart] = useState<string | null>(null);
  const controlsRef = useRef<any>(null);
  const { toast } = useToast();

  // Handle direct part name selection from sidebar (3D Clickable Parts)
  useEffect(() => {
    if (selectedPartName && partPositions[selectedPartName]) {
      const pos = partPositions[selectedPartName];
      setCameraTarget({ position: pos.position, lookAt: pos.target });
      setHighlightedPart(selectedPartName);
    }
  }, [selectedPartName]);

  // Handle sidebar selection - move camera to part
  useEffect(() => {
    if (selectedPart) {
      const partName = sidebarToPartMap[selectedPart.category.toLowerCase()];
      if (partName && partPositions[partName]) {
        const pos = partPositions[partName];
        setCameraTarget({ position: pos.position, lookAt: pos.target });
        setHighlightedPart(partName);
      }
    } else {
      setHighlightedPart(null);
    }
  }, [selectedPart]);

  const handlePartClick = (part: ClickablePart) => {
    setClickedPart(part);
  };

  const handleClosePopup = () => {
    setClickedPart(null);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("kk-KZ", {
      style: "currency",
      currency: "KZT",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const handleAddToCart = () => {
    if (clickedPart) {
      toast({
        title: "Added to cart",
        description: `${clickedPart.name} has been added to your cart.`,
      });
      setClickedPart(null);
    }
  };

  return (
    <div className="relative w-full h-full">
      <Canvas
        camera={{ position: [8, 4, 8], fov: 50 }}
        shadows
        className="w-full h-full"
      >
        <color attach="background" args={["#0a0a0f"]} />
        
        {/* Lighting */}
        <ambientLight intensity={0.5} />
        <directionalLight
          position={[10, 10, 5]}
          intensity={1.2}
          castShadow
          shadow-mapSize={[2048, 2048]}
        />
        <directionalLight position={[-10, 5, -5]} intensity={0.6} />
        <spotLight
          position={[0, 15, 0]}
          angle={0.3}
          penumbra={1}
          intensity={0.6}
          castShadow
        />
        <pointLight position={[-5, 5, -5]} intensity={0.3} color="#a855f7" />

        {/* Environment */}
        <Environment preset="city" />
        
        {/* Ground shadow */}
        <ContactShadows
          position={[0, -1.5, 0]}
          opacity={0.5}
          scale={30}
          blur={2}
          far={4}
        />

        {/* Camera Controller */}
        <CameraController
          targetPosition={cameraTarget?.position || null}
          targetLookAt={cameraTarget?.lookAt || null}
          controlsRef={controlsRef}
        />

        {/* 3D Model */}
        <Suspense fallback={<LoadingFallback />}>
          <CorollaModel onPartClick={handlePartClick} highlightedPart={highlightedPart} />
        </Suspense>

        {/* Controls */}
        <OrbitControls
          ref={controlsRef}
          enablePan={true}
          enableZoom={true}
          enableRotate={true}
          minDistance={5}
          maxDistance={50}
          target={[0, 0, 0]}
        />
      </Canvas>

      {/* Selected part from sidebar indicator */}
      {selectedPart && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-4 left-4 glass-panel px-6 py-4 rounded-lg"
        >
          <p className="text-sm text-muted-foreground mb-1">Selected Part</p>
          <p className="text-lg font-semibold text-primary">{selectedPart.part}</p>
          <p className="text-sm text-muted-foreground capitalize">{selectedPart.category}</p>
        </motion.div>
      )}

      {/* Clicked part popup */}
      <AnimatePresence>
        {clickedPart && (
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            className="absolute top-4 right-4 w-80 glass-panel rounded-xl border border-border overflow-hidden"
          >
            {/* Header */}
            <div className="p-4 border-b border-border bg-secondary/30">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  <Package className="w-5 h-5 text-primary" />
                  <h3 className="font-bold text-lg">{clickedPart.name}</h3>
                </div>
                <button
                  onClick={handleClosePopup}
                  className="p-1 rounded-lg hover:bg-secondary transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                Type: <span className="text-primary">{clickedPart.type}</span>
              </p>
            </div>

            {/* Content */}
            <div className="p-4 space-y-4">
              <p className="text-sm text-muted-foreground leading-relaxed">
                {clickedPart.description}
              </p>

              {/* Price */}
              <div className="p-3 rounded-lg bg-secondary/50 border border-border">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Market Price</span>
                  <span className="text-xl font-bold text-primary">
                    {formatPrice(clickedPart.priceKZT)}
                  </span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <Button onClick={handleAddToCart} className="flex-1 gap-2" size="sm">
                  <ShoppingCart className="w-4 h-4" />
                  Add to Cart
                </Button>
                <Button onClick={handleClosePopup} variant="outline" size="sm">
                  Close
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Instructions hint */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 glass-panel px-4 py-2 rounded-full">
        <p className="text-xs text-muted-foreground">
          Click on <span className="text-purple-400">purple</span>, <span className="text-green-400">green</span>, <span className="text-pink-400">pink</span>, or <span className="text-blue-400">blue</span> parts • Use sidebar to navigate
        </p>
      </div>
    </div>
  );
};
