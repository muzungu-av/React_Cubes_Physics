import React from "react";
import CubeProto, { CubeProps } from "../CubeProto";
import gsi_241_map_0 from "../../assets/letters/gsi_241/__.png";
import gsi_241_map_1 from "../../assets/letters/gsi_241/Ю.png";
import gsi_241_map_2 from "../../assets/letters/gsi_241/Ё.png";
import gsi_241_map_3 from "../../assets/letters/gsi_241/Я.png";
import gsi_241_map_4 from "../../assets/letters/gsi_241/Е.png";
import gsi_241_map_5 from "../../assets/letters/gsi_241/И.png";
import { hSmall, mass } from "../../const/world_const";

const textureMap_241 = [
  gsi_241_map_0,
  gsi_241_map_1,
  gsi_241_map_2,
  gsi_241_map_3,
  gsi_241_map_4,
  gsi_241_map_5,
] as [string, string, string, string, string, string];

const Cube_240: React.FC<Partial<CubeProps>> = ({ position, rotation }) => {
  return (
    <CubeProto
      textureMap={textureMap_241}
      mass={mass}
      geometry={[hSmall, hSmall, hSmall]}
      size={hSmall}
      position={position}
      rotation={rotation}
    />
  );
};

export default Cube_240;
