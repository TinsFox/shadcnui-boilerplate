import { useLocation, useNavigate } from "react-router-dom"

import { Logo } from "../icons/logo"
import { Button } from "../ui/button"
import { PoweredByFooter } from "./PoweredByFooter"

export const NotFound = () => {
  const location = useLocation()

  const navigate = useNavigate()
  return (
    <div className="center prose m-auto size-full flex-col">
      <main className="flex grow flex-col items-center justify-center">
        <div className="center mb-8 flex">
          <Logo className="size-20" />
        </div>
        <p className="font-semibold">
          You have come to a desert of knowledge where there is nothing.
        </p>
        <p>
          Current path: <code>{location.pathname}</code>
        </p>

        <p>
          <Button onClick={() => navigate("/")}>Back to Home</Button>
        </p>
      </main>

      <PoweredByFooter className="center -mt-12 flex gap-2 py-8" />
    </div>
  )
}
