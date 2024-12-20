import React from "react";
import { Route, Routes } from "react-router-dom";
import NewsFeedApp from "../../pages/newsFeed";

const AppRouter = () => {
  return (
    <>
      <Routes>
        <Route 
         exact 
         path="/" 
         element={<NewsFeedApp />} 
        />
      </Routes>

    </>
  );
};

export default AppRouter;
