import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Model } from "./Table_final";
import { PointerLockControls } from "@react-three/drei";
import { Physics } from "@react-three/cannon";
import { Debug } from "@react-three/cannon";
import { G, light_intensity } from "./const/world_const";
import { CubeGenerator } from "./cube/cubeGenerator";
import CameraController from "./controls/CameraController";

const App = () => {
  return (
    <Canvas>
      <ambientLight intensity={light_intensity} />
      {/*справа, вверху, спереди*/}
      <directionalLight
        color="white"
        intensity={light_intensity}
        position={[0, 3, 2]}
      />
      <directionalLight
        color="white"
        intensity={light_intensity}
        position={[-1, 1.3, 4]}
      />
      <directionalLight
        color="white"
        intensity={light_intensity}
        position={[1, 1, 5]}
      />
      {/* ["вправо-влево", "высота", "ближе" ] */}
      <Physics gravity={[0, G, -0.001]}>
        <Debug color="red" scale={1.1}>
          <CubeGenerator />
          <Model />
        </Debug>
      </Physics>
      <PointerLockControls />
      <CameraController />
    </Canvas>
  );
};

export default App;
