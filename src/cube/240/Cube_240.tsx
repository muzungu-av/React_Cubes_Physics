import React from "react";
import CubeProto, { CubeProps } from "../CubeProto";
import gsi_240_map_0 from "../../assets/letters/gsi_240/__.png";
import gsi_240_map_1 from "../../assets/letters/gsi_240/Ю.png";
import gsi_240_map_2 from "../../assets/letters/gsi_240/Ё.png";
import gsi_240_map_3 from "../../assets/letters/gsi_240/Я.png";
import gsi_240_map_4 from "../../assets/letters/gsi_240/Е.png";
import gsi_240_map_5 from "../../assets/letters/gsi_240/И.png";
import { hSmall, mass } from "../../const/world_const";

const textureMap_240 = [
  gsi_240_map_0,
  gsi_240_map_1,
  gsi_240_map_2,
  gsi_240_map_3,
  gsi_240_map_4,
  gsi_240_map_5,
] as [string, string, string, string, string, string];

const Cube_240: React.FC<Partial<CubeProps>> = ({ position, rotation }) => {
  return (
    <CubeProto
      textureMap={textureMap_240}
      mass={mass}
      geometry={[hSmall, hSmall, hSmall]}
      size={hSmall}
      position={position}
      rotation={rotation}
    />
  );
};

export default Cube_240;
