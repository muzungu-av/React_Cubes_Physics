import Cube_18 from "./18/Cube_18";
import Cube_236 from "./236/Cube_236";
import Cube_241 from "./241/Cube_241";

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
  /*
    над верхней полкой [0, 1.7, 0.15]
  */
  { gsi: 241, position: [-0.3, 1.7, 0.15], rotation: [0.3, -0.9, 0] }, //["вправо-влево", "высота", "ближе" ]
  { gsi: 236, position: [-0.15, 1.7, 0.5], rotation: [1.3, 1.1, 0] },
  { gsi: 18, position: [0.25, 1.9, 0.5], rotation: [-0.0, 0.6, 0.2] },
  { gsi: 241, position: [0.66, 1.8, 0.15], rotation: [0.3, 1.1, 0] },
  { gsi: 236, position: [-0.45, 1.9, 0.5], rotation: [1.3, 1.1, 0] },
  { gsi: 18, position: [-0.05, 1.6, 0.5], rotation: [-0.0, 0.6, 0.2] },
];

const cubesMap: { [key: number]: React.ComponentType<Partial<CubeProps>> } = {
  18: Cube_18,
  236: Cube_236,
  241: Cube_241,
};

export const CubeGenerator: React.FC = () => {
  return (
    <>
      {arr.map((cube, index) => {
        const CubeComponent = cubesMap[cube.gsi];
        if (CubeComponent) {
          return (
            <CubeComponent
              key={`${cube.gsi}-${index}`}
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
