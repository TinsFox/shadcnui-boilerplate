import { StrictMode } from "react"
import ReactDOM from "react-dom/client"
import { HydratedRouter } from "react-router/dom"

ReactDOM.hydrateRoot(
  document,
  <StrictMode>
    <HydratedRouter />
  </StrictMode>,
)
