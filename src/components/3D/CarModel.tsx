import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Mesh } from "three";

interface CarModelProps {
  selectedPart: { category: string; part: string } | null;
}

export const CarModel = ({ selectedPart }: CarModelProps) => {
  const bodyRef = useRef<Mesh>(null);
  const wheelFLRef = useRef<Mesh>(null);
  const wheelFRRef = useRef<Mesh>(null);
  const wheelRLRef = useRef<Mesh>(null);
  const wheelRRRef = useRef<Mesh>(null);

  useFrame(() => {
    // Subtle idle animation
    if (bodyRef.current) {
      bodyRef.current.rotation.y += 0.001;
    }
  });

  const getPartColor = (partType: string) => {
    if (selectedPart?.category.toLowerCase().includes(partType)) {
      return "#00d4ff";
    }
    return "#4a5568";
  };

  const getPartEmissive = (partType: string) => {
    if (selectedPart?.category.toLowerCase().includes(partType)) {
      return "#00d4ff";
    }
    return "#000000";
  };

  return (
    <group position={[0, -0.5, 0]}>
      {/* Car Body */}
      <mesh ref={bodyRef} castShadow receiveShadow>
        <boxGeometry args={[3, 1, 1.5]} />
        <meshStandardMaterial
          color={getPartColor("body")}
          metalness={0.8}
          roughness={0.2}
          emissive={getPartEmissive("body")}
          emissiveIntensity={selectedPart?.category.toLowerCase().includes("body") ? 0.3 : 0}
        />
      </mesh>

      {/* Car Hood/Top */}
      <mesh position={[0.5, 0.7, 0]} castShadow>
        <boxGeometry args={[2, 0.4, 1.3]} />
        <meshStandardMaterial
          color={getPartColor("body")}
          metalness={0.8}
          roughness={0.2}
          emissive={getPartEmissive("body")}
          emissiveIntensity={selectedPart?.category.toLowerCase().includes("body") ? 0.3 : 0}
        />
      </mesh>

      {/* Wheels */}
      <group>
        {/* Front Left Wheel */}
        <mesh ref={wheelFLRef} position={[1, -0.3, 0.9]} rotation={[0, 0, Math.PI / 2]} castShadow>
          <cylinderGeometry args={[0.4, 0.4, 0.3, 32]} />
          <meshStandardMaterial
            color={getPartColor("wheel")}
            metalness={0.9}
            roughness={0.1}
            emissive={getPartEmissive("wheel")}
            emissiveIntensity={selectedPart?.category.toLowerCase().includes("wheel") ? 0.5 : 0}
          />
        </mesh>

        {/* Front Right Wheel */}
        <mesh ref={wheelFRRef} position={[1, -0.3, -0.9]} rotation={[0, 0, Math.PI / 2]} castShadow>
          <cylinderGeometry args={[0.4, 0.4, 0.3, 32]} />
          <meshStandardMaterial
            color={getPartColor("wheel")}
            metalness={0.9}
            roughness={0.1}
            emissive={getPartEmissive("wheel")}
            emissiveIntensity={selectedPart?.category.toLowerCase().includes("wheel") ? 0.5 : 0}
          />
        </mesh>

        {/* Rear Left Wheel */}
        <mesh ref={wheelRLRef} position={[-1, -0.3, 0.9]} rotation={[0, 0, Math.PI / 2]} castShadow>
          <cylinderGeometry args={[0.4, 0.4, 0.3, 32]} />
          <meshStandardMaterial
            color={getPartColor("wheel")}
            metalness={0.9}
            roughness={0.1}
            emissive={getPartEmissive("wheel")}
            emissiveIntensity={selectedPart?.category.toLowerCase().includes("wheel") ? 0.5 : 0}
          />
        </mesh>

        {/* Rear Right Wheel */}
        <mesh ref={wheelRRRef} position={[-1, -0.3, -0.9]} rotation={[0, 0, Math.PI / 2]} castShadow>
          <cylinderGeometry args={[0.4, 0.4, 0.3, 32]} />
          <meshStandardMaterial
            color={getPartColor("wheel")}
            metalness={0.9}
            roughness={0.1}
            emissive={getPartEmissive("wheel")}
            emissiveIntensity={selectedPart?.category.toLowerCase().includes("wheel") ? 0.5 : 0}
          />
        </mesh>
      </group>

      {/* Spoiler (Aero) */}
      <mesh position={[-1.5, 0.9, 0]} castShadow>
        <boxGeometry args={[0.2, 0.6, 1.6]} />
        <meshStandardMaterial
          color={getPartColor("aero")}
          metalness={0.7}
          roughness={0.3}
          emissive={getPartEmissive("aero")}
          emissiveIntensity={selectedPart?.category.toLowerCase().includes("aero") ? 0.4 : 0}
        />
      </mesh>

      {/* Windshield */}
      <mesh position={[0.8, 0.9, 0]} rotation={[-0.2, 0, 0]}>
        <boxGeometry args={[0.8, 0.6, 1.2]} />
        <meshStandardMaterial
          color="#1a1f3a"
          metalness={0.9}
          roughness={0.1}
          transparent
          opacity={0.3}
        />
      </mesh>
    </group>
  );
};
