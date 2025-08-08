import { SetStateAction } from "react";

interface InputProps {
  type: string;
  placeholder?: string;
  value: string;
  onChange: React.Dispatch<SetStateAction<string>>;
}

export default function InputType({
  type,
  placeholder,
  value,
  onChange,
}: InputProps) {
  return (
    <input
      type={type}
      className="w-full p-2 px-2 border-1 border-[#dfdfdf] outline-[#da6319] rounded"
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}
