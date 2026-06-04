import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Toaster } from "react-hot-toast";

import "./index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <>
      <App />

      <Toaster
        position="top-right"
        reverseOrder={false}
        toastOptions={{
          duration: 2500,

          style: {
            background: "#111",
            color: "#fff",
            border: "1px solid #ffc400",
            borderRadius: "14px",
            fontWeight: "700",
            padding: "14px 18px",
          },

          success: {
            iconTheme: {
              primary: "#ffc400",
              secondary: "#111",
            },
          },

          error: {
            iconTheme: {
              primary: "#ff2d2d",
              secondary: "#fff",
            },
          },
        }}
      />
    </>
  </StrictMode>
);