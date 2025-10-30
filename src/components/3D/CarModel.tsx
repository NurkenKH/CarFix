import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import { Mesh, Group } from "three";

interface CarModelProps {
  selectedPart: { category: string; part: string } | null;
}

export const CarModel = ({ selectedPart }: CarModelProps) => {
  const groupRef = useRef<Group>(null);
  const { scene } = useGLTF("/2022_porsche_911_gt3_992.glb");

  useFrame(() => {
    // Subtle idle animation
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.001;
    }
  });

  // Apply highlighting effect to selected parts
  if (selectedPart) {
    scene.traverse((child) => {
      if ((child as Mesh).isMesh) {
        const mesh = child as Mesh;
        if (Array.isArray(mesh.material)) {
          mesh.material.forEach((mat) => {
            if (mat.name && mat.name.toLowerCase().includes(selectedPart.category.toLowerCase())) {
              (mat as any).emissive?.setHex(0x00d4ff);
              (mat as any).emissiveIntensity = 0.5;
            } else {
              (mat as any).emissive?.setHex(0x000000);
              (mat as any).emissiveIntensity = 0;
            }
          });
        } else if (mesh.material) {
          if (mesh.name.toLowerCase().includes(selectedPart.category.toLowerCase())) {
            (mesh.material as any).emissive?.setHex(0x00d4ff);
            (mesh.material as any).emissiveIntensity = 0.5;
          } else {
            (mesh.material as any).emissive?.setHex(0x000000);
            (mesh.material as any).emissiveIntensity = 0;
          }
        }
      }
    });
  } else {
    // Reset all emissive when nothing is selected
    scene.traverse((child) => {
      if ((child as Mesh).isMesh) {
        const mesh = child as Mesh;
        if (Array.isArray(mesh.material)) {
          mesh.material.forEach((mat) => {
            (mat as any).emissive?.setHex(0x000000);
            (mat as any).emissiveIntensity = 0;
          });
        } else if (mesh.material) {
          (mesh.material as any).emissive?.setHex(0x000000);
          (mesh.material as any).emissiveIntensity = 0;
        }
      }
    });
  }

  return (
    <group ref={groupRef} position={[0, -0.5, 0]}>
      <primitive object={scene} castShadow receiveShadow />
    </group>
  );
};

// Preload the model
useGLTF.preload("/2022_porsche_911_gt3_992.glb");
