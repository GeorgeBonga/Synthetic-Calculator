import React, { createContext, useContext, useState } from 'react';

const FontSizeContext = createContext();


export const useFontSize = () => {
  const context = useContext(FontSizeContext);
  if (!context) {
    throw new Error('useFontSize must be used within a FontSizeProvider');
  }
  return context;
};

export const FontSizeProvider = ({ children }) => {
  const [fontSize, setFontSize] = useState(16); 


  const onChangeFontSize = (size) => {
    setFontSize(size);
  };

  
  return (
    <FontSizeContext.Provider value={{ fontSize, onChangeFontSize }}>
      {children}
    </FontSizeContext.Provider>
  );
};
