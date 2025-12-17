import { useRef, useState, useEffect } from "react";
import { useGLTF } from "@react-three/drei";
import { Group, Mesh } from "three";
import { ThreeEvent } from "@react-three/fiber";

export interface ClickablePart {
  name: string;
  type: string;
  description: string;
  priceKZT: number;
}

export interface PartPosition {
  position: [number, number, number];
  target: [number, number, number];
}

interface CorollaModelProps {
  onPartClick: (part: ClickablePart) => void;
  highlightedPart?: string | null;
}

// Part information for the clickable components
const partInfo: Record<string, ClickablePart> = {
  "Side Mirror": {
    name: "Side Mirror",
    type: "Mirror",
    description: "High-quality replacement side mirror with integrated turn signal. OEM compatible with Toyota Corolla models 2019-2023.",
    priceKZT: 45000,
  },
  "Left Body Panelka": {
    name: "Left Body Panel (Rear Door)",
    type: "Body Paint",
    description: "Factory-grade left rear door panel. Includes primer coat and ready for color matching. Perfect fit for Toyota Corolla sedan models.",
    priceKZT: 185000,
  },
  "Left Body Panel Door": {
    name: "Left Body Panel Door",
    type: "Body Paint",
    description: "Premium quality left body panel door section. Pre-primed and ready for paint matching. Direct OEM replacement part.",
    priceKZT: 165000,
  },
  "Front Windshield": {
    name: "Front Windshield",
    type: "Glass",
    description: "Laminated safety glass windshield with UV protection and acoustic dampening. Includes rain sensor compatibility zone.",
    priceKZT: 125000,
  },
};

// Camera positions for each part
export const partPositions: Record<string, PartPosition> = {
  "Side Mirror": {
    position: [8, 3, 5],
    target: [9.8, 0, -18.7],
  },
  "Left Body Panelka": {
    position: [-8, 3, 0],
    target: [0.2, 0.8, -2],
  },
  "Left Body Panel Door": {
    position: [-8, 2, -3],
    target: [0.2, 0.2, -1.9],
  },
  "Front Windshield": {
    position: [12, 5, 8],
    target: [9.8, 0, -18.6],
  },
};

export const CorollaModel = ({ onPartClick, highlightedPart }: CorollaModelProps) => {
  const groupRef = useRef<Group>(null);
  const { scene, nodes } = useGLTF("/corolla.glb");
  const [clickedParts, setClickedParts] = useState<Set<string>>(new Set());
  const [hoveredPart, setHoveredPart] = useState<string | null>(null);

  const handlePartClick = (event: ThreeEvent<MouseEvent>, partName: string) => {
    event.stopPropagation();
    
    setClickedParts((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(partName)) {
        newSet.delete(partName);
      } else {
        newSet.add(partName);
      }
      return newSet;
    });

    const part = partInfo[partName];
    if (part) {
      onPartClick(part);
    }
  };

  useEffect(() => {
    if (scene) {
      scene.traverse((child) => {
        if ((child as Mesh).isMesh) {
          child.castShadow = true;
          child.receiveShadow = true;
        }
      });
    }
  }, [scene]);

  const getColor = (partName: string) => {
    if (clickedParts.has(partName) || highlightedPart === partName) return "#facc15"; // yellow
    if (hoveredPart === partName) return "#22d3ee"; // cyan hover
    
    // Default colors - more vibrant
    if (partName === "Side Mirror") return "#a855f7"; // bright purple
    if (partName === "Left Body Panelka") return "#22c55e"; // lime
    if (partName === "Left Body Panel Door") return "#ec4899"; // magenta/pink
    if (partName === "Front Windshield") return "#38bdf8"; // light blue
    return "#ffffff";
  };

  return (
    <group ref={groupRef} position={[0, -1.5, 0]} scale={0.8}>
      {/* Main car model */}
      <primitive object={scene} />
      
      {/* Clickable Side Mirror overlay */}
      {nodes.Entity26 && (
        <mesh
          geometry={(nodes.Entity26 as Mesh).geometry}
          position={[24.492, 0, -46.735]}
          rotation={[0, Math.PI / 2, 0]}
          scale={0.081}
          onClick={(e) => handlePartClick(e, "Side Mirror")}
          onPointerOver={() => setHoveredPart("Side Mirror")}
          onPointerOut={() => setHoveredPart(null)}
        >
          <meshStandardMaterial
            color={getColor("Side Mirror")}
            metalness={0.5}
            roughness={0.3}
            emissive={getColor("Side Mirror")}
            emissiveIntensity={0.3}
          />
        </mesh>
      )}

      {/* Clickable Left Body Panel (rear door) overlay */}
      {nodes["G-__555645_2"] && (
        <group position={[0.491, 2.113, -5.06]} rotation={[-Math.PI, Math.PI / 2, 0]} scale={-1}>
          <mesh
            geometry={(nodes["G-__555645_2"] as Mesh).geometry}
            onClick={(e) => handlePartClick(e, "Left Body Panelka")}
            onPointerOver={() => setHoveredPart("Left Body Panelka")}
            onPointerOut={() => setHoveredPart(null)}
          >
            <meshStandardMaterial
              color={getColor("Left Body Panelka")}
              metalness={0.3}
              roughness={0.5}
              emissive={getColor("Left Body Panelka")}
              emissiveIntensity={0.2}
            />
          </mesh>
        </group>
      )}

      {/* Clickable Left Body Panel Door overlay - THE MISSING ONE */}
      {nodes["G-__555672"] && (
        <mesh
          geometry={(nodes["G-__555672"] as Mesh).geometry}
          position={[0.51, 0.581, -4.891]}
          rotation={[-Math.PI, 0, 0]}
          scale={-1}
          onClick={(e) => handlePartClick(e, "Left Body Panel Door")}
          onPointerOver={() => setHoveredPart("Left Body Panel Door")}
          onPointerOut={() => setHoveredPart(null)}
        >
          <meshStandardMaterial
            color={getColor("Left Body Panel Door")}
            metalness={0.3}
            roughness={0.5}
            emissive={getColor("Left Body Panel Door")}
            emissiveIntensity={0.2}
          />
        </mesh>
      )}

      {/* Clickable Front Windshield overlay */}
      {nodes["front-gla0#1_1"] && (
        <group
          position={[24.625, 0.008, -46.545]}
          rotation={[0, Math.PI / 2, 0]}
          scale={[0.081, 0.081, 0.082]}
        >
          <mesh
            geometry={(nodes["front-gla0#1_1"] as Mesh).geometry}
            onClick={(e) => handlePartClick(e, "Front Windshield")}
            onPointerOver={() => setHoveredPart("Front Windshield")}
            onPointerOut={() => setHoveredPart(null)}
          >
            <meshStandardMaterial
              color={getColor("Front Windshield")}
              transparent
              opacity={0.7}
              metalness={0.1}
              roughness={0.1}
              emissive={getColor("Front Windshield")}
              emissiveIntensity={0.15}
            />
          </mesh>
        </group>
      )}
    </group>
  );
};

useGLTF.preload("/corolla.glb");
