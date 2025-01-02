import type { InputFieldProps } from "@/types/auth";

export function InputField({
  type,
  id,
  name,
  placeholder,
  value,
  onChange,
  roundedClass,
}: InputFieldProps) {
  return (
    <input
      type={type}
      id={id}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={`block h-12 w-full px-3 py-2 border border-gray-300 focus:outline-1 focus:outline-theme-color-blue sm:text-sm font-mono ${roundedClass} `}
    />
  );
}
