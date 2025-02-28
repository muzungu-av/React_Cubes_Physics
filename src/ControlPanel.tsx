import React from "react";
import styled from "styled-components";

interface ControlPanelProps {
  onToggleMenu: () => void;
  inputText: string;
  setInputText: (value: string) => void;
  handleSubmit: () => void;
}

// Стилизованная панель управления
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
  gap: 20px;
`;

export const ControlPanel: React.FC<ControlPanelProps> = ({
  onToggleMenu,
  inputText,
  setInputText,
  handleSubmit,
}) => {
  return (
    <StyledControlPanel>
      <button
        className="ui-element"
        onMouseDown={(e) => e.stopPropagation()}
        onClick={onToggleMenu}
      >
        Toggle Menu
      </button>
      <div>
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Введите буквы (например, АУЮ)"
          style={{ padding: "5px", marginRight: "10px" }}
        />
        <button onClick={handleSubmit} style={{ padding: "5px 15px" }}>
          Отправить
        </button>
      </div>
    </StyledControlPanel>
  );
};
