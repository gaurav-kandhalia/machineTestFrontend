import React, { createContext, useContext, useState } from "react";

const FileContext = createContext();

export const FileProvider = ({ children }) => {
  const [filePath, setFilePath] = useState(null);
  return (
    <FileContext.Provider value={{ filePath, setFilePath }}>
      {children}
    </FileContext.Provider>
  );
};

export const useFile = () => {
  return useContext(FileContext);
};
