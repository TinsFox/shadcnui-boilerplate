import type { ReactNode } from "react"
import { useState } from "react"

function Versions(): ReactNode {
  const [versions] = useState({
    electron: process.versions.electron,
    chrome: process.versions.chrome,
    node: process.versions.node,
  })

  if (!versions) return null
  return (
    <ul className="versions">
      <li className="electron-version">Electron v{versions.electron}</li>
      <li className="chrome-version">Chromium v{versions.chrome}</li>
      <li className="node-version">Node v{versions.node}</li>
    </ul>
  )
}

export default Versions
