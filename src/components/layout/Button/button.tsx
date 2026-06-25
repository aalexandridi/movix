import styles from "./Button.module.css";

type ButtonVariant = "primary" | "secondary";

type ButtonProps = {
  variant?: ButtonVariant;
  children: React.ReactNode;
  fontWeight?: string;
  onClick?: () => void;
};

export default function Button({
  variant = "primary",
  children,
  onClick,
  fontWeight = "400",
}: ButtonProps) {
  return (
    <button
      className={styles[variant]}
      style={{ fontWeight }}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
