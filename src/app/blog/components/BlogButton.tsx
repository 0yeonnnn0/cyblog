interface ButtonProps {
  text: string;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "danger";
}

export function BlogButton({
  text,
  onClick,
  variant = "primary",
}: ButtonProps) {
  const variants = {
    primary: "text-black hover:bg-blue-600",
    secondary: "text-gray-700 hover:bg-gray-50",
    danger: "text-black hover:bg-red-600",
  };

  return (
    <button
      className={`
          px-4 py-1.5 rounded-sm
          transition-colors duration-200
          border border-gray-300
          ${variants[variant]}
        `}
      onClick={onClick}
    >
      {text}
    </button>
  );
}
