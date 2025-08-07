interface InputProps {
  type: string;
  placeholder?: string;
}

export default function InputType({ type, placeholder }: InputProps) {
  return (
    <input
      type={type}
      className="w-full p-2 px-2 border-1 border-[#dfdfdf] outline-[#da6319] rounded"
      placeholder={placeholder}
    />
  );
}
