import { Canvas } from "@react-three/fiber";
import { Model } from "./Table_final";
import { useEffect, useRef, useState } from "react";
import { Physics } from "@react-three/cannon";
// import { Debug } from "@react-three/cannon";
import { G, light_intensity } from "./const/world_const";
import { CubeGenerator, CubeInfo } from "./cube/cubeGenerator";
import CameraController from "./controls/CameraController";
import styled from "styled-components";
import { PointerLockControls } from "@react-three/drei";
import { ControlPanel } from "./ControlPanel";

interface SideMenuProps {
  isMenuOpen: boolean;
  error: string | null;
}

interface StyledSideMenuProps {
  isMenuOpen: boolean;
}

const SideMenu: React.FC<SideMenuProps> = ({ isMenuOpen, error }) => {
  return (
    <StyledSideMenu isMenuOpen={isMenuOpen}>
      <div style={{ padding: "10px" }}>
        {error && (
          <div style={{ color: "red", marginTop: "10px" }}>Ошибка: {error}</div>
        )}
        {!error && <p>Введите текст и отправьте запрос</p>}
      </div>
    </StyledSideMenu>
  );
};

const StyledAppContainer = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  overflow: hidden;
  flex-direction: column;
`;

const StyledSideMenu = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== "isMenuOpen",
})<StyledSideMenuProps>`
  display: ${({ isMenuOpen }) => (isMenuOpen ? "block" : "none")};
  width: ${({ isMenuOpen }) => (isMenuOpen ? "200px" : "0")};
  height: calc(100vh - 50px);
  background-color: #e0e0e0;
  position: fixed;
  top: 50px;
  left: 0;
  bottom: 0;
  z-index: 10;
  overflow-y: auto;
  overflow-x: hidden;
  transition: width 0.3s ease;
  pointer-events: ${({ isMenuOpen }) => (isMenuOpen ? "auto" : "none")};
`;

const StyledCanvasBox = styled.div<StyledSideMenuProps>`
  margin-left: ${(props) => (props.isMenuOpen ? "200px" : "0")};
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  position: relative;

  canvas {
    position: absolute;
    top: 0px;
    left: 0px;
    margin: 0px;
    padding: 0px;
    pointer-events: ${(props) => (props.isMenuOpen ? "none" : "auto")};
  }
`;

const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const controlsRef = useRef<any>(null);
  const [isPointerLocked, setIsPointerLocked] = useState(false);
  const [inputText, setInputText] = useState("АУЮ");
  const [error, setError] = useState<string | null>(null);
  const [cubeData, setCubeData] = useState<CubeInfo[]>([]); // Хранение данных для кубов

  const handleDrop = async () => {
    try {
      setError(null);

      const response = await fetch("http://172.18.0.2:8080/api/word", {
        method: "POST",
        headers: {
          "Content-Type": "text/plain",
        },
        body: inputText,
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      // Обработка массива результата
      const data = await response.json();

      // Преобразование JSON в формат CubeInfo
      const transformedData: CubeInfo[] = data
        .filter((item: any) => !item.error) // Фильтруем ошибки
        .map((item: any) => ({
          gsi: item.headSyllable.gsi,
          position: item.position as [number, number, number],
          rotation: [item.rotX, item.rotY, item.rotZ] as [
            number,
            number,
            number
          ],
        }));

      // setCubeData(transformedData);
      // Добавляем новые элементы к существующему состоянию
      setCubeData((prevData) => [...prevData, ...transformedData]);
    } catch (err) {
      setError((err as Error).message);
    }
  };

  const handleErase = async () => {
    const data: CubeInfo[] = [];
    setCubeData(data);
  };

  useEffect(() => {
    console.log("Menu state changed to:", isMenuOpen);
  }, [isMenuOpen]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.ctrlKey && controlsRef.current) {
        controlsRef.current.lock();
      }
      if (event.code === "Escape") {
        setIsPointerLocked((prev) => !prev);
      }
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      if (!event.ctrlKey && controlsRef.current) {
        controlsRef.current.unlock();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("keyup", handleKeyUp);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <StyledAppContainer>
      <ControlPanel
        onToggleMenu={toggleMenu}
        inputText={inputText}
        setInputText={setInputText}
        handleDrop={handleDrop}
        handleErase={handleErase}
      />
      <SideMenu isMenuOpen={isMenuOpen} error={error} />
      <StyledCanvasBox
        isMenuOpen={isMenuOpen}
        onPointerDown={(e) => e.stopPropagation()}
      >
        <Canvas>
          <ambientLight intensity={light_intensity} />
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
          <Physics gravity={[0, G, -0.001]}>
            {/* <Debug color="red" scale={1.1}> */}
            <CubeGenerator cubes={cubeData} />
            <Model />
            {/* </Debug> */}
          </Physics>
          <CameraController />
          {isPointerLocked && <PointerLockControls ref={controlsRef} />}
        </Canvas>
      </StyledCanvasBox>
    </StyledAppContainer>
  );
};

export default App;
