import React, { createContext, useState } from "react";

const NewsContext = createContext();

const NewsContextProvider = (props) => {
  const [themeMode, setThemeMode] = useState("light");

  return (
    <NewsContext.Provider
      value={{
        themeMode: themeMode,
        setThemeMode: setThemeMode
      }}
    >
      {props.children}
    </NewsContext.Provider>
  );
};

export { NewsContext, NewsContextProvider };
