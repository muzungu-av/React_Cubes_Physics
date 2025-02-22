import { Canvas } from "@react-three/fiber";
import { Model } from "./Table_final";
import { useEffect, useRef, useState } from "react";
import { Physics, Debug } from "@react-three/cannon";
import { G, light_intensity } from "./const/world_const";
import { CubeGenerator } from "./cube/cubeGenerator";
import CameraController from "./controls/CameraController";
import styled from "styled-components";
import { PointerLockControls } from "@react-three/drei";

interface ControlPanelProps {
  onToggleMenu: () => void;
}

interface SideMenuProps {
  isMenuOpen: boolean;
}

interface StyledSideMenuProps {
  isMenuOpen: boolean;
}

// Панель с кнопкой
const ControlPanel: React.FC<ControlPanelProps> = ({ onToggleMenu }) => {
  return (
    <StyledControlPanel>
      <button
        className="ui-element"
        onMouseDown={(e) => e.stopPropagation()}
        onClick={onToggleMenu}
      >
        Toggle Menu
      </button>
    </StyledControlPanel>
  );
};

// Боковое меню
const SideMenu: React.FC<SideMenuProps> = ({ isMenuOpen }) => {
  return <StyledSideMenu isMenuOpen={isMenuOpen}>Меню</StyledSideMenu>;
};

// Основной контейнер
const StyledAppContainer = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  overflow: hidden;
  flex-direction: column;
`;

// Контейнер для бокового меню
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

// Контейнер для Canvas
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

// Панель с кнопкой
const StyledControlPanel = styled.div`
  height: 50px;
  width: 100%;
  background-color: #e0f0a0;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 10000;
  display: flex;
  align-items: center;
  justify-content: center;
`;

// Основной компонент приложения
const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(true);
  const controlsRef = useRef<any>(null); // Ссылка на PointerLockControls
  const [isPointerLocked, setIsPointerLocked] = useState(false);

  useEffect(() => {
    console.log("Menu state changed to:", isMenuOpen);
  }, [isMenuOpen]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.ctrlKey && controlsRef.current) {
        controlsRef.current.lock();
      }

      if (event.code === "KeyF") {
        setIsPointerLocked((prev) => !prev); // Переключаем состояние
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

  // useEffect(() => {
  //   const handleKeyDown = (event: KeyboardEvent) => {
  //     if (event.ctrlKey && controlsRef.current) {
  //       controlsRef.current.lock(); // Включаем управление
  //     }
  //   };

  //   const handleKeyUp = (event: KeyboardEvent) => {
  //     if (!event.ctrlKey && controlsRef.current) {
  //       controlsRef.current.unlock(); // Выключаем управление
  //     }
  //   };

  //   document.addEventListener("keydown", handleKeyDown);
  //   document.addEventListener("keyup", handleKeyUp);

  //   return () => {
  //     document.removeEventListener("keydown", handleKeyDown);
  //     document.removeEventListener("keyup", handleKeyUp);
  //   };
  // }, []);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <StyledAppContainer>
      <ControlPanel onToggleMenu={toggleMenu} />
      <SideMenu isMenuOpen={isMenuOpen} />
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
            <CubeGenerator />
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
