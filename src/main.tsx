import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserStore } from "./storage/browser";
import { App } from "./ui/App";
import "./ui/style.css";

const root = document.getElementById("root");
if (!root) throw new Error("Missing application root.");
createRoot(root).render(
  <StrictMode>
    <App store={createBrowserStore()} />
  </StrictMode>,
);
