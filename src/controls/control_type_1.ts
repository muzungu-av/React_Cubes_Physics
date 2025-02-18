import { camera_rotateSpeed, camera_zoomSpeed } from "../const/world_const";

type MovementState = {
  up: boolean;
  down: boolean;
  left: boolean;
  right: boolean;
};

export const handleWheel = (camera: THREE.Camera) => (event: WheelEvent) => {
  if (event.deltaY < 0) {
    camera.position.z -= camera_zoomSpeed; // Камера вперед
  } else {
    camera.position.z += camera_zoomSpeed; // Камера назад
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

//кажется не работает
export const handleMouseMove = (camera: THREE.Camera, event: MouseEvent) => {
  camera.rotation.y -= event.movementX * camera_rotateSpeed;
  camera.rotation.x -= event.movementY * camera_rotateSpeed;
};
