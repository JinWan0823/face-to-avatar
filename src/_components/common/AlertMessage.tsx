import { AnimatePresence, motion } from "framer-motion";

interface MessageProps {
  message: string;
}

export default function AlertMessage({ message }: MessageProps) {
  return (
    <>
      <AnimatePresence>
        <motion.div
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "100%" }}
          transition={{ type: "spring", stiffness: 600, damping: 60 }}
          className="p-2 w-[90%] max-w-[400px] 
        fixed bottom-[20px] left-1/2 translate-x-[-50%]
        text-lg font-bold text-white 
        bg-[#da6319] border-2 border-point rounded-full
        z-[9999]"
        >
          <p className="text-center">{message}</p>
        </motion.div>
      </AnimatePresence>
    </>
  );
}
