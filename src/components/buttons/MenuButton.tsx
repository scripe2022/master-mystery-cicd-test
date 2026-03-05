import React, { useState } from "react";
import Button from "./Button";
import Modal from "../modal/Modal";

interface MenuButtonProps {
  children?: React.ReactNode;
  ariaLabel?: string;
}

const MenuButton: React.FC<MenuButtonProps> = ({ children, ariaLabel = "Open menu" }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button variant="round" onClick={() => setIsOpen(true)} aria-label={ariaLabel}>
        Menu
      </Button>

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        {children ?? <div>Menu not implemented</div>}
      </Modal>
    </>
  );
};

export default MenuButton;
