import { Canvas } from "@react-three/fiber";
import { Model } from "./Table_final";
import { CameraControls, OrbitControls } from "@react-three/drei";
import { Debug, Physics } from "@react-three/cannon";
import { G } from "./const/world_const";
import { CubeGenerator } from "./cube/cubeGenerator";

const App = () => {
  return (
    <Canvas>
      {/* .сверху.(вперед-назад) */}
      <CameraControls />
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

      <OrbitControls
        position={[1, 0, 0]}
        enableRotate={true}
        enablePan={false}
        rotateSpeed={0.4}
        // maxPolarAngle={Math.PI / 1.8} //камера сверху
        // minPolarAngle={Math.PI / 4} //камера снизу
        // maxAzimuthAngle={Math.PI / 6}
        // minAzimuthAngle={-Math.PI / 6}
      />
    </Canvas>
  );
};

export default App;
