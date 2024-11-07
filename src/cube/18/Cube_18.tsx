import React from "react";
import CubeProto, { CubeProps } from "../CubeProto";
import gsi_18_map_0 from "../../assets/letters/gsi_18/Л.png";
import gsi_18_map_1 from "../../assets/letters/gsi_18/ЛА.png";
import gsi_18_map_2 from "../../assets/letters/gsi_18/ЛО.png";
import gsi_18_map_3 from "../../assets/letters/gsi_18/ЛУ.png";
import gsi_18_map_4 from "../../assets/letters/gsi_18/ЛЫ.png";
import gsi_18_map_5 from "../../assets/letters/gsi_18/ЛЭ.png";
import { hBig, mass } from "../../const/world_const";

const textureMap_18 = [
  gsi_18_map_0,
  gsi_18_map_1,
  gsi_18_map_2,
  gsi_18_map_3,
  gsi_18_map_4,
  gsi_18_map_5,
] as [string, string, string, string, string, string];

const Cube_18: React.FC<Partial<CubeProps>> = ({ position, rotation }) => {
  return (
    <CubeProto
      textureMap={textureMap_18}
      mass={mass}
      geometry={[hBig, hBig, hBig]}
      position={position}
      rotation={rotation}
      size={hBig}
    />
  );
};

export default Cube_18;
