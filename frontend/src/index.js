import React from "react";
import App from "./App";
import { createRoot } from "react-dom";

const root = createRoot(document.getElementById("root"));

const ModernApp = () => {
  return (
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
};

root.render(<ModernApp />);
