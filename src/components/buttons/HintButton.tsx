import React, { useState } from "react";
import Button from "./Button";
import Modal from "../modal/Modal";

interface HintButtonProps {
  hint: string;
}

const HintButton: React.FC<HintButtonProps> = ({ hint }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button variant="round" onClick={() => setIsOpen(true)}>
        Hint
      </Button>

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        {hint}
      </Modal>
    </>
  );
};

export default HintButton;
