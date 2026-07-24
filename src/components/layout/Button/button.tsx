import styles from "./Button.module.css";

type ButtonProps = {
  variant?: ButtonVariant;
  children: React.ReactNode;
  fontWeight?: string;
  onClick?: () => void;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
};

type ButtonVariant = "primary" | "secondary";

export default function Button({
  variant = "primary",
  children,
  onClick,
  fontWeight = "400",
  disabled = false,
  type = "button",
}: ButtonProps) {
  return (
    <button
      type={type}
      disabled={disabled}
      className={styles[variant]}
      style={{ fontWeight }}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
