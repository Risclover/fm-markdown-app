import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ThemeProvider, FileProvider } from "./context";
import App from "./App";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
      <FileProvider>
        <App />
      </FileProvider>
    </ThemeProvider>
  </StrictMode>
);
