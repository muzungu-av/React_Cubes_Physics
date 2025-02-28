import React from "react";
import CubeProto, { CubeProps } from "../CubeProto";
import gsi_236_map_0 from "../../assets/letters/gsi_236/_.png";
import gsi_236_map_1 from "../../assets/letters/gsi_236/А.png";
import gsi_236_map_2 from "../../assets/letters/gsi_236/О.png";
import gsi_236_map_3 from "../../assets/letters/gsi_236/У.png";
import gsi_236_map_4 from "../../assets/letters/gsi_236/Ы.png";
import gsi_236_map_5 from "../../assets/letters/gsi_236/Э.png";
import { hBig, mass } from "../../const/world_const";

const textureMap_236 = [
  gsi_236_map_0,
  gsi_236_map_1,
  gsi_236_map_2,
  gsi_236_map_3,
  gsi_236_map_4,
  gsi_236_map_5,
] as [string, string, string, string, string, string];

const Cube_235: React.FC<Partial<CubeProps>> = ({ position, rotation }) => {
  return (
    <CubeProto
      textureMap={textureMap_236}
      mass={mass}
      geometry={[hBig, hBig, hBig]}
      position={position}
      rotation={rotation}
      size={hBig}
    />
  );
};

export default Cube_235;
