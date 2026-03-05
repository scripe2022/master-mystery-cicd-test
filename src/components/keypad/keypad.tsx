import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./keypad.css";

type KeyType = "digit" | "clear" | "enter";

interface KeyConfig {
  label: string;
  value: string;
  type: KeyType;
}
interface KeypadProps {
  onSuccess: () => void;
  onClose: () => void;
}

const keys: KeyConfig[] = [
  { label: "1", value: "1", type: "digit" },
  { label: "2", value: "2", type: "digit" },
  { label: "3", value: "3", type: "digit" },
  { label: "4", value: "4", type: "digit" },
  { label: "5", value: "5", type: "digit" },
  { label: "6", value: "6", type: "digit" },
  { label: "7", value: "7", type: "digit" },
  { label: "8", value: "8", type: "digit" },
  { label: "9", value: "9", type: "digit" },
  { label: "Clear", value: "clear", type: "clear" },
  { label: "0", value: "0", type: "digit" },
  { label: "Enter", value: "enter", type: "enter" },
];

export default function Keypad({ onSuccess, onClose }: KeypadProps) {
  const location = useLocation();
  const CORRECT_CODE = location.pathname === "/room2" ? "9426" : "503";
  const [value, setValue] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  const handleClick = (key: KeyConfig) => {
    if (key.type === "clear") {
      setValue("");
      setMessage("");
      return;
    } else if (key.type === "enter") {
      if (value.length !== CORRECT_CODE.length) {
        return;
      }

      if (value === CORRECT_CODE) {
        setMessage("CORRECT");
        setTimeout(() => {
          onSuccess(); // close modal + notify parent
        }, 1500);
        return;
      }
      setMessage("INCORRECT");

      setTimeout(() => {
        setValue("");
        setMessage("");
      }, 1500);
      return;
    } else {
      if (value.length < CORRECT_CODE.length) {
        setValue((prev) => prev + key.value);
      } else {
        setValue((prev) => prev.slice(1) + key.value);
      }
    }
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const key = event.key;

      if (/^[0-9]$/i.test(event.key)) {
        handleClick({ label: key, value: key, type: "digit" });
      } else if (key === "Enter") {
        handleClick({ label: key, value: "enter", type: "enter" });
      } else if (key === "Backspace" || key === "Delete") {
        handleClick({ label: "Clear", value: "clear", type: "clear" });
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  });

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div
          className={`display ${message ? (message === "CORRECT" ? "correct" : "incorrect") : ""}`}
        >
          {message ? message : value.padEnd(CORRECT_CODE.length, "_")}
        </div>

        <div className="keypad-grid">
          {keys.map((key) => (
            <button
              key={key.label}
              className={`key key-${key.type}`}
              onClick={() => handleClick(key)}
            >
              {key.label}
            </button>
          ))}
        </div>
        <button className="close-btn" onClick={onClose}>
          X
        </button>
      </div>
    </div>
  );
}
