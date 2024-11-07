import React from "react";
import CubeProto, { CubeProps } from "../CubeProto";
import gsi_235_map_0 from "../../assets/letters/gsi_235/_.png";
import gsi_235_map_1 from "../../assets/letters/gsi_235/А.png";
import gsi_235_map_2 from "../../assets/letters/gsi_235/О.png";
import gsi_235_map_3 from "../../assets/letters/gsi_235/У.png";
import gsi_235_map_4 from "../../assets/letters/gsi_235/Ы.png";
import gsi_235_map_5 from "../../assets/letters/gsi_235/Э.png";
import { hBig, mass } from "../../const/world_const";

const textureMap_235 = [
  gsi_235_map_0,
  gsi_235_map_1,
  gsi_235_map_2,
  gsi_235_map_3,
  gsi_235_map_4,
  gsi_235_map_5,
] as [string, string, string, string, string, string];

const Cube_235: React.FC<Partial<CubeProps>> = ({ position, rotation }) => {
  return (
    <CubeProto
      textureMap={textureMap_235}
      mass={mass}
      geometry={[hBig, hBig, hBig]}
      position={position}
      rotation={rotation}
      size={hBig}
    />
  );
};

export default Cube_235;
