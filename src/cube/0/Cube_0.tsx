import React from "react";
import CubeProto, { CubeProps } from "../CubeProto";
import gsi_0_map_0 from "../../assets/letters/gsi_0/ЙА.png";
import gsi_0_map_1 from "../../assets/letters/gsi_0/ЙО.png";
import gsi_0_map_2 from "../../assets/letters/gsi_0/ЙЮ.png";
import gsi_0_map_3 from "../../assets/letters/gsi_0/ЙЯ.png";
// import gsi_0_map_4 from "../../assets/letters/gsi_7/ЛЫ.png";
// import gsi_0_map_5 from "../../assets/letters/gsi_7/ЛЭ.png";
import { hBig, mass } from "../../const/world_const";

const textureMap_0 = [
  gsi_0_map_0,
  gsi_0_map_1,
  gsi_0_map_2,
  gsi_0_map_3,
  gsi_0_map_3, //todo
  gsi_0_map_3, //todo
] as [string, string, string, string, string, string];

const Cube_0: React.FC<Partial<CubeProps>> = ({ position, rotation }) => {
  return (
    <CubeProto
      textureMap={textureMap_0}
      mass={mass}
      geometry={[hBig, hBig, hBig]}
      position={position}
      rotation={rotation}
      size={hBig}
    />
  );
};

export default Cube_0;
