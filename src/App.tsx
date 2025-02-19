import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Model } from "./Table_final";
import { useEffect, useState } from "react";
import { PointerLockControls } from "@react-three/drei";
import { Physics } from "@react-three/cannon";
import { Debug } from "@react-three/cannon";
import { G, light_intensity } from "./const/world_const";
import { CubeGenerator } from "./cube/cubeGenerator";
import CameraController from "./controls/CameraController";
import styled from "styled-components";

interface ControlPanelProps {
  onToggleMenu: () => void;
}

interface SideMenuProps {
  isMenuOpen: boolean;
}

interface StyledSideMenuProps {
  isMenuOpen: boolean;
}

const ControlPanel: React.FC<ControlPanelProps> = ({ onToggleMenu }) => {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    console.log("Button clicked, calling onToggleMenu");
    onToggleMenu();
  };
  return (
    <StyledControlPanel>
      <button
        z-index={99999}
        className="ui-element"
        onMouseDown={(e) => e.stopPropagation()}
        onClick={handleClick}
      >
        Toggle Menu
      </button>
    </StyledControlPanel>
  );
};

const SideMenu: React.FC<SideMenuProps> = ({ isMenuOpen }) => {
  return <StyledSideMenu isMenuOpen={isMenuOpen}>Меню</StyledSideMenu>;
};

const StyledAppContainer = styled.div`
  width: 100vw;
  height: 100vh;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const StyledControlPanel = styled.div`
  height: 50px;
  width: 100%;
  background-color: #f0f0f0;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 10000;
  display: flex;
  align-items: center;
  justify-content: center;
`;

// Типизируем пропсы для StyledSideMenu
const StyledSideMenu = styled.div<StyledSideMenuProps>`
  width: ${(props) => (props.isMenuOpen ? "200px" : "0")};
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
`;

// Типизируем пропсы для StyledCanvasBox
const StyledCanvasBox = styled.div<StyledSideMenuProps>`
  margin-top: 50px;
  margin-left: ${(props) => (props.isMenuOpen ? "200px" : "0")};
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #ffffff;
  overflow: hidden;
  position: relative;
  transition: margin-left 0.3s ease;

  canvas {
    width: calc(100% - 40px);
    height: calc(100% - 40px);
    position: absolute;
    top: 10px;
    left: 10px;
    right: 10px;
    bottom: 10px;
    margin: 0;
    padding: 0;
    pointer-events: ${(props) => (props.isMenuOpen ? "none" : "auto")};
  }
`;

const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    console.log("Menu state changed to:", isMenuOpen);
  }, [isMenuOpen]);

  const toggleMenu = () => {
    console.log(">>>>" + isMenuOpen);
    setIsMenuOpen(!isMenuOpen);
    console.log(">>>>" + isMenuOpen);
  };

  return (
    <StyledAppContainer>
      <ControlPanel onToggleMenu={toggleMenu} />
      <SideMenu isMenuOpen={isMenuOpen} />
      <StyledCanvasBox isMenuOpen={isMenuOpen}>
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
      </StyledCanvasBox>
    </StyledAppContainer>
  );
};

export default App;
