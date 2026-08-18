import clsx from "clsx";
import styles from "./Button.module.css";

type ButtonProps = {
  variant?: ButtonVariant;
  children: React.ReactNode;
  fontWeight?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  horizontal?: boolean;
  icon?: React.ReactNode;
  className?: string;
};

export type ButtonVariant = "primary" | "secondary" | "tertiary";

export default function Button({
  variant = "primary",
  children,
  onClick,
  fontWeight = "400",
  disabled = false,
  type = "button",
  horizontal = true,
  icon,
  className,
}: ButtonProps) {
  return (
    <button
      type={type}
      disabled={disabled}
      className={clsx(
        styles[variant],
        horizontal ? "flex-row gap-2" : "flex-col items-center",
        className,
      )}
      style={{ fontWeight }}
      onClick={onClick}
    >
      {icon}
      {children}
    </button>
  );
}
