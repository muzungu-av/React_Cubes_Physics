import React from "react";
import CubeProto, { CubeProps } from "../CubeProto";
import gsi_7_map_0 from "../../assets/letters/gsi_7/Л.png";
import gsi_7_map_1 from "../../assets/letters/gsi_7/ЛА.png";
import gsi_7_map_2 from "../../assets/letters/gsi_7/ЛО.png";
import gsi_7_map_3 from "../../assets/letters/gsi_7/ЛУ.png";
import gsi_7_map_4 from "../../assets/letters/gsi_7/ЛЫ.png";
import gsi_7_map_5 from "../../assets/letters/gsi_7/ЛЭ.png";
import { hBig, mass } from "../../const/world_const";

const textureMap_7 = [
  gsi_7_map_0,
  gsi_7_map_1,
  gsi_7_map_2,
  gsi_7_map_3,
  gsi_7_map_4,
  gsi_7_map_5,
] as [string, string, string, string, string, string];

const Cube_7: React.FC<Partial<CubeProps>> = ({ position, rotation }) => {
  return (
    <CubeProto
      textureMap={textureMap_7}
      mass={mass}
      geometry={[hBig, hBig, hBig]}
      position={position}
      rotation={rotation}
      size={hBig}
    />
  );
};

export default Cube_7;
