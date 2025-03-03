/*
    над верхней полкой [0, 1.7, 0.15]

    над столом распологать в квадрате
    [-0.77 / 0.77,   1.0 / 2.0,   0.4 / 0.8]
    с вращением [3,14 / -3,14,   3,14 / -3,14,   3,14 / -3,14]

    position: ["вправо-влево", "высота", "ближе" ]
    rotation: ["ось горизонтально", "ось вертик. в стол", "ось в экран"]  где 3.14 - поворот на 180
  */

// { gsi: 241, position: [-0.15, 2.0, 0.5], rotation: [1.3, 1.1, 0] },
// { gsi: 18, position: [0.25, 2.0, 0.6], rotation: [-0.0, 0.6, 0.2] },

//маленькие
// { gsi: 18, position: [-0.3, 1.0, 0.15], rotation: [0.3, -0.9, 0] },
// { gsi: 241, position: [0.3, 1.0, 0.15], rotation: [0.3, 1.1, 0] },

import Cube_7 from "./7/Cube_7";
import Cube_236 from "./236/Cube_236";
import Cube_241 from "./241/Cube_241";
import Cube_0 from "./0/Cube_0";

export interface CubeInfo {
  gsi: number;
  position: number[];
  rotation: number[];
}

interface CubeProps {
  position: [number, number, number];
  rotation: [number, number, number];
}

// const arr: CubeInfo[] = [
//   { gsi: 236, position: [-0.77, 2.0, 0.4], rotation: [-3, 0, 0] },
//   { gsi: 236, position: [0.77, 3.0, 0.8], rotation: [3, 0.0, 0.0] },
// ];

interface CubeGeneratorProps {
  cubes: CubeInfo[];
}

const cubesMap: { [key: number]: React.ComponentType<Partial<CubeProps>> } = {
  0: Cube_0,
  7: Cube_7,
  236: Cube_236,
  241: Cube_241,
};

export const CubeGenerator: React.FC<CubeGeneratorProps> = ({ cubes }) => {
  return (
    <>
      {cubes.map((cube, index) => {
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
