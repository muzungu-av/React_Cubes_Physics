import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Model } from "./Table_final";
import { PointerLockControls } from "@react-three/drei";
import { Physics } from "@react-three/cannon";
// import { Debug } from "@react-three/cannon";
import { G } from "./const/world_const";
import { CubeGenerator } from "./cube/cubeGenerator";
import CameraController from "./controls/CameraController";

const App = () => {
  return (
    <Canvas>
      <ambientLight intensity={0.4} />
      <pointLight
        position={[0, 3, 0.3]}
        intensity={5}
        color="white"
        distance={100}
        decay={2}
        castShadow
      />

      {/*справа, вверху, спереди*/}
      <directionalLight color="white" intensity={0.9} position={[-1, 5, 10]} />
      <directionalLight color="white" intensity={0.9} position={[5, 5, 2]} />
      <directionalLight color="white" intensity={0.9} position={[0, 5, 5]} />
      <Physics gravity={[0, G, 0]}>
        {/* <Debug color="red" scale={1.1}> */}
        <CubeGenerator />
        <Model />
        {/* </Debug> */}
      </Physics>

      <PointerLockControls />
      <CameraController />
    </Canvas>
  );
};

export default App;
