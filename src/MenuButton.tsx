interface MenuButtonProps {
  toggleMenu: () => void;
}

const MenuButton: React.FC<MenuButtonProps> = ({ toggleMenu }) => {
  const handleButtonClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Предотвращает всплытие клика к canvas
    if (document.pointerLockElement) {
      document.exitPointerLock(); // Освобождаем курсор перед открытием меню
    }
    toggleMenu(); // Вызываем функцию переключения меню
  };

  return (
    <button
      style={{
        position: "absolute",
        top: "10px",
        left: "10px",
        zIndex: 99999,
        padding: "10px 20px",
        fontSize: "16px",
        cursor: "pointer",
      }}
      className="ui-element"
      onClick={handleButtonClick}
    >
      Toggle Menu
    </button>
  );
};

export default MenuButton;
