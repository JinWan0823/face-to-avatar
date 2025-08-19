"use client";

import AlertMessage from "@/_components/common/AlertMessage";
import { createContext, ReactNode, useContext, useState } from "react";

interface AlertContextType {
  showAlert: (message: string) => void;
}
interface AlertProviderProps {
  children: ReactNode;
}

const AlertContext = createContext<AlertContextType | null>(null);

export function AlertProvider({ children }: AlertProviderProps) {
  const [message, setMessage] = useState("");
  const [visible, setVisible] = useState(false);

  const showAlert = (msg: string) => {
    setMessage(msg);
    setVisible(true);
    setTimeout(() => {
      setVisible(false);
    }, 2000);
  };

  return (
    <AlertContext.Provider value={{ showAlert }}>
      {children}
      {visible && <AlertMessage message={message} />}
    </AlertContext.Provider>
  );
}
export const useAlert = () => {
  const context = useContext(AlertContext);
  if (!context) {
    throw new Error("useAlert must be used within an AlertProvider");
  }
  return context;
};
