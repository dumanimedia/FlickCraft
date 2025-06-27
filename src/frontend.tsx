import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App";

function start() {
  const root = createRoot(document.getElementById("root")!);
  root.render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", start);
} else {
  start();
}
