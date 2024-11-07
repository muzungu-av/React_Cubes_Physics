import React, { useState } from "react";
// import { Select } from "@react-three/postprocessing";
import { useBox } from "@react-three/cannon";
import { useTexture } from "@react-three/drei";

export interface CubeProps {
  textureMap?: [string, string, string, string, string, string];
  mass: number;
  geometry: [number, number, number];
  position: [number, number, number] | undefined;
  rotation: [number, number, number] | undefined;
  size: number;
}

const CubeProto: React.FC<CubeProps> = ({
  textureMap,
  mass,
  geometry,
  position,
  rotation,
  size,
}) => {
  const envMap = useTexture({
    map_0: textureMap![0],
    map_1: textureMap![1],
    map_2: textureMap![2],
    map_3: textureMap![3],
    map_4: textureMap![4],
    map_5: textureMap![5],
  });

  const [ref] = useBox(() => ({
    args: [size, size, size],
    type: "Dynamic", // Static, Dynamic
    mass,
    position,
    rotation,
  }));

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_hovered, hover] = useState<boolean | null>(false);

  return (
    <mesh
      ref={ref as React.MutableRefObject<THREE.Mesh>}
      onPointerOver={() => hover(true)}
      onPointerOut={() => hover(false)}
    >
      <boxGeometry attach="geometry" args={geometry} />
      <meshStandardMaterial
        metalness={2.0}
        attach={`material-0`}
        map={envMap.map_0}
      />
      <meshStandardMaterial
        metalness={2.0}
        attach={`material-1`}
        map={envMap.map_1}
      />
      <meshStandardMaterial
        metalness={2.0}
        attach={`material-2`}
        map={envMap.map_2}
      />
      <meshStandardMaterial
        metalness={2.0}
        attach={`material-3`}
        map={envMap.map_3}
      />
      <meshStandardMaterial
        metalness={2.0}
        attach={`material-4`}
        map={envMap.map_4}
      />
      <meshStandardMaterial
        metalness={2.0}
        attach={`material-5`}
        map={envMap.map_5}
      />
    </mesh>
  );
};

export default CubeProto;
