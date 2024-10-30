"use client";
import { createContext, useState } from "react";

interface IUIContext {
  isSidebarOpen: boolean;

  openSidebar: () => void;
  closeSidebar: () => void;
}

interface UIProviderProps {
  children: React.ReactNode;
}

const initialState: IUIContext = {
  isSidebarOpen: false,
  closeSidebar: () => {},
  openSidebar: () => {},
};

export const UIContext = createContext<IUIContext>(initialState);

export default function UIProvider({ children }: UIProviderProps) {
  const [isSidebarOpen, setIsSidebarMenuState] = useState(false);

  const openSidebar = () => setIsSidebarMenuState(true);

  const closeSidebar = () => setIsSidebarMenuState(false);

  return (
    <UIContext.Provider
      value={{
        isSidebarOpen,
        openSidebar,
        closeSidebar,
      }}
    >
      {children}
    </UIContext.Provider>
  );
}
