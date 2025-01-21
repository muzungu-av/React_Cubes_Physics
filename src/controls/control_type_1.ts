// cameraControls.ts

type MovementState = {
  up: boolean;
  down: boolean;
  left: boolean;
  right: boolean;
};

export const handleWheel = (camera: THREE.Camera) => (event: WheelEvent) => {
  const zoomSpeed = 0.5;
  if (event.deltaY < 0) {
    camera.position.z -= zoomSpeed; // Камера вперед
  } else {
    camera.position.z += zoomSpeed; // Камера назад
  }
};

export const handleKeyDown = (
  event: KeyboardEvent,
  setMovement: React.Dispatch<React.SetStateAction<MovementState>>
) => {
  switch (event.code) {
    case "ArrowUp": // Камера вверх
      setMovement((prev) => ({ ...prev, up: true }));
      break;
    case "ArrowDown": // Камера вниз
      setMovement((prev) => ({ ...prev, down: true }));
      break;
    case "ArrowLeft": // Камера влево
      setMovement((prev) => ({ ...prev, left: true }));
      break;
    case "ArrowRight": // Камера вправо
      setMovement((prev) => ({ ...prev, right: true }));
      break;
  }
};

export const handleKeyUp = (
  event: KeyboardEvent,
  setMovement: React.Dispatch<React.SetStateAction<MovementState>>
) => {
  switch (event.code) {
    case "ArrowUp":
      setMovement((prev) => ({ ...prev, up: false }));
      break;
    case "ArrowDown":
      setMovement((prev) => ({ ...prev, down: false }));
      break;
    case "ArrowLeft":
      setMovement((prev) => ({ ...prev, left: false }));
      break;
    case "ArrowRight":
      setMovement((prev) => ({ ...prev, right: false }));
      break;
  }
};

export const handleMouseMove = (camera: THREE.Camera, event: MouseEvent) => {
  const rotateSpeed = 0.005;
  camera.rotation.y -= event.movementX * rotateSpeed;
  camera.rotation.x -= event.movementY * rotateSpeed;
};
