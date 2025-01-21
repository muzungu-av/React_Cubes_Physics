import { useEffect, useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import {
  handleKeyDown,
  handleKeyUp,
  handleWheel,
  handleMouseMove,
} from "./control_type_1";
import {
  camera_moveSpeed,
  camera_far,
  camera_fov,
  camera_near,
  camera_position_x,
  camera_position_y,
  camera_position_z,
} from "../const/world_const";
import * as THREE from "three";

const CameraController = () => {
  const { camera, gl } = useThree();

  // Установка начальной позиции камеры
  useEffect(() => {
    if (camera instanceof THREE.PerspectiveCamera) {
      // Настройка параметров перспективной камеры
      camera.fov = camera_fov; // Уменьшение FOV для уменьшения растяжения
      camera.aspect = window.innerWidth / window.innerHeight; // Соотношение сторон
      camera.near = camera_near; // Ближняя плоскость отсечения
      camera.far = camera_far; // Дальняя плоскость отсечения
      camera.position.set(
        camera_position_x,
        camera_position_y,
        camera_position_z
      ); // Начальная позиция камеры

      camera.updateProjectionMatrix(); // Обновление проекционной матрицы камеры

      // Обновление размера холста при изменении размеров окна
      const handleResize = () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        gl.setSize(window.innerWidth, window.innerHeight);
      };

      window.addEventListener("resize", handleResize);

      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }
  }, [camera, gl]);

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
    if (movement.up) camera.position.y += camera_moveSpeed;
    if (movement.down) camera.position.y -= camera_moveSpeed;
    if (movement.left) camera.position.x -= camera_moveSpeed;
    if (movement.right) camera.position.x += camera_moveSpeed;
    // console.log(
    //   `Camera position: x=${camera.position.x}, y=${camera.position.y}, z=${camera.position.z}`
    // );
  });

  return null;
};

export default CameraController;
