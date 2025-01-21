import { useEffect, useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import {
  handleKeyDown,
  handleKeyUp,
  handleWheel,
  handleMouseMove,
} from "./control_type_1";

const CameraController = () => {
  const { camera, gl } = useThree();
  const [movement, setMovement] = useState({
    up: false,
    down: false,
    left: false,
    right: false,
  });
  const [ctrlPressed, setCtrlPressed] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    const wheelHandler = handleWheel(camera);
    const keyDownHandler = (event: KeyboardEvent) => {
      if (event.code === "ControlLeft" || event.code === "ControlRight") {
        setCtrlPressed(true);
      }
      handleKeyDown(event, setMovement);
    };

    const keyUpHandler = (event: KeyboardEvent) => {
      if (event.code === "ControlLeft" || event.code === "ControlRight") {
        setCtrlPressed(false);
      }
      handleKeyUp(event, setMovement);
    };

    const mouseMoveHandler = (event: MouseEvent) => {
      if (ctrlPressed && isDragging) {
        handleMouseMove(camera, event);
      }
    };

    const mouseDownHandler = (event: MouseEvent) => {
      if (ctrlPressed) {
        setIsDragging(true);
        event.preventDefault(); // Предотвращение стандартного поведения
        gl.domElement.requestPointerLock(); // Захват указателя
      } else {
        event.preventDefault(); // Отключение захвата сцены при простом клике
      }
    };

    const mouseUpHandler = () => {
      setIsDragging(false);
      document.exitPointerLock(); // Освобождение захвата указателя
    };

    window.addEventListener("wheel", wheelHandler);
    window.addEventListener("keydown", keyDownHandler);
    window.addEventListener("keyup", keyUpHandler);
    window.addEventListener("mousemove", mouseMoveHandler);
    gl.domElement.addEventListener("mousedown", mouseDownHandler);
    window.addEventListener("mouseup", mouseUpHandler);

    return () => {
      window.removeEventListener("wheel", wheelHandler);
      window.removeEventListener("keydown", keyDownHandler);
      window.removeEventListener("keyup", keyUpHandler);
      window.removeEventListener("mousemove", mouseMoveHandler);
      gl.domElement.removeEventListener("mousedown", mouseDownHandler);
      window.removeEventListener("mouseup", mouseUpHandler);
    };
  }, [camera, ctrlPressed, gl, isDragging]);

  useFrame(() => {
    const speed = 0.1;
    if (movement.up) camera.position.y += speed;
    if (movement.down) camera.position.y -= speed;
    if (movement.left) camera.position.x -= speed;
    if (movement.right) camera.position.x += speed;
  });

  return null;
};

export default CameraController;
