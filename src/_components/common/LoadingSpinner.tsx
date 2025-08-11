export default function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center py-10">
      <div
        className="spinner w-[100px] h-[100px] rounded-full
        border-5 border-[#aaaaaa36] border-t-[#da6319] border-b-[#da6319]"
      ></div>
    </div>
  );
}
