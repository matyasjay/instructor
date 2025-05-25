import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { AppRouter } from "./router";
import { AppProvider } from "./provider";
import "./index.css";

export default function App() {
  return (
    <StrictMode>
      <AppProvider>
        <AppRouter />
      </AppProvider>
    </StrictMode>
  );
}

const root = document.getElementById("root");

if (!root) {
  throw new Error("No root element found to hydrate app!");
}

createRoot(document.getElementById("root")!).render(<App />);
