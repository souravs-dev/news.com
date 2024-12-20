import React from "react";
import AppRouter from "./infrastructure/routing/AppRouter";
import { NewsContextProvider } from "./context/NewsContext";
import { NewsTheme } from "./theme/ThemeCustomization";
import { BrowserRouter } from "react-router-dom";

const App = () => {

  return (
    <BrowserRouter>
      <NewsContextProvider>
        <NewsTheme>
          <AppRouter />
        </NewsTheme>
      </NewsContextProvider>
    </BrowserRouter>
  );
};

export default App;
