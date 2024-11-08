import Cube_18 from "./18/Cube_18";
import Cube_235 from "./235/Cube_235";
import Cube_240 from "./240/Cube_240";

interface CubeInfo {
  gsi: number;
  position: number[];
  rotation: number[];
}

interface CubeProps {
  position: [number, number, number];
  rotation: [number, number, number];
}

const arr: CubeInfo[] = [
  { gsi: 18, position: [0, 3.9, 0.4], rotation: [1.0, 3.5, 1.0] },
  { gsi: 235, position: [-0.2, 3, 0.35], rotation: [0.5, -0.9, 0] },
  { gsi: 240, position: [0.2, 3.7, 0.6], rotation: [-0.3, -1.1, 0] },
  { gsi: 18, position: [0, 2.9, 0.7], rotation: [1.0, 3.5, 1.0] },
  { gsi: 235, position: [-0.2, 2, 0.75], rotation: [0.5, -0.9, 0] },
  { gsi: 240, position: [0.2, 2.7, 0.6], rotation: [-0.3, -1.1, 0] },

  { gsi: 18, position: [-0.7, 2.8, 0.6], rotation: [1.0, 3.5, 1.0] },
  { gsi: 235, position: [-0.2, 3, 0.75], rotation: [0.5, -0.9, 0] },
  { gsi: 18, position: [0.2, 2.7, 1.05], rotation: [-0.3, -1.1, 0] },
  { gsi: 240, position: [0.8, 2.5, 0.7], rotation: [1.0, 3.5, 1.0] },
  { gsi: 235, position: [-0.5, 2, 0.45], rotation: [0.5, -0.9, 0] },
  { gsi: 240, position: [0.4, 2.7, 0.3], rotation: [-0.3, -1.1, 0] },
];

const cubesMap: { [key: number]: React.ComponentType<Partial<CubeProps>> } = {
  18: Cube_18,
  235: Cube_235,
  240: Cube_240,
};

export const CubeGenerator: React.FC = () => {
  return (
    <>
      {arr.map((cube) => {
        const CubeComponent = cubesMap[cube.gsi];
        if (CubeComponent) {
          return (
            <CubeComponent
              key={cube.gsi}
              position={cube.position as [number, number, number]}
              rotation={cube.rotation as [number, number, number]}
            />
          );
        }
        return null;
      })}
    </>
  );
};
