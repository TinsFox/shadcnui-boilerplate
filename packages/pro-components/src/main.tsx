import "./index.css"
import "@repo/ui/globals.css"

import { StrictMode } from "react"
import { createRoot } from "react-dom/client"

import App from "./App.tsx"

createRoot(document.querySelector("#root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
