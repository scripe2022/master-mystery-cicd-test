import React, { type ButtonHTMLAttributes } from "react";
import "./Button.css";

type ButtonVariant = "start" | "round";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  fontSize?: string | number;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = "start",
  className = "",
  fontSize,
  style,
  ...props
}) => {
  const computedClasses = ["btn", `btn-${variant}`, className].filter(Boolean).join(" ");

  const dynamicStyle = {
    ...style,
    ...(fontSize ? { "--btn-font-size": fontSize } : {}),
  } as React.CSSProperties;

  return (
    <button className={computedClasses} style={dynamicStyle} {...props}>
      {children}
    </button>
  );
};

export default Button;
