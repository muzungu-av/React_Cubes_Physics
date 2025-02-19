import { useRef } from "react";

interface CanvasComponentProps {
  toggleMenu: () => void;
}

const CanvasComponent: React.FC<CanvasComponentProps> = ({ toggleMenu }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const handleCanvasClick = () => {
    if (document.pointerLockElement === canvasRef.current) {
      document.exitPointerLock();
    } else {
      canvasRef.current?.requestPointerLock();
    }
  };

  return (
    <canvas
      ref={canvasRef}
      onClick={handleCanvasClick}
      style={{ width: "100%", height: "100%", background: "black" }}
    />
  );
};

export default CanvasComponent;
