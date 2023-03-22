import React from "react";
import { useDispatch } from "react-redux";
import { TheContent, TheFooter, TheHeader } from "./index";
import TheSidebar from "./TheSidebar";
import "./TheLayout.css";

import { fetchUserData } from "../store/slices/AuthSlice";

const TheLayout = () => {
  const dispatch = useDispatch();
  React.useEffect(() => {
    
  }, [dispatch]);

  return (
    <div className="c-app c-default-layout">
      <TheSidebar />
      <div className="c-wrapper">
        <TheHeader />
        <div className="c-body pt-10 custom-color-c-app">
          <TheContent />
        </div>
        <TheFooter />
      </div>
    </div>
  );
};

export default TheLayout;
