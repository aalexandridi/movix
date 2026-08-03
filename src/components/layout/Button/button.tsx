import clsx from "clsx";
import styles from "./Button.module.css";

type ButtonProps = {
  variant?: ButtonVariant;
  children: React.ReactNode;
  fontWeight?: string;
  onClick?: () => void;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  horizontal?: boolean;
  icon?: React.ReactNode;
};

type ButtonVariant = "primary" | "secondary";

export default function Button({
  variant = "primary",
  children,
  onClick,
  fontWeight = "400",
  disabled = false,
  type = "button",
  horizontal = true,
  icon,
}: ButtonProps) {
  return (
    <button
      type={type}
      disabled={disabled}
      className={clsx(
        styles[variant],
        horizontal ? "flex-row gap-2" : "flex-col items-center",
      )}
      style={{ fontWeight }}
      onClick={onClick}
    >
      {icon}
      {children}
    </button>
  );
}
