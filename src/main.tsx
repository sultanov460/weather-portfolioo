import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import WeatherProvider from "./context/weatherContext.tsx";
import { ToastContainer } from "react-toastify";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <WeatherProvider>
      <App />
      <ToastContainer />
    </WeatherProvider>
  </StrictMode>
);
