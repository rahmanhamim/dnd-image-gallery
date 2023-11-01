import React, { createContext, useState, ReactNode } from "react";

interface AppContextType {
  data: string;
  setData: (data: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

interface AppProviderProps {
  children: ReactNode;
}

export const MyProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [data, setData] = useState("Hello from Context");

  return (
    <AppContext.Provider value={{ data, setData }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;
