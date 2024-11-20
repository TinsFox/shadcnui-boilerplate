import { m } from "framer-motion"
import { useNavigate } from "react-router-dom"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/ui/button"

export const NotFound = () => {
  const navigate = useNavigate()

  return (
    <div className="mx-auto flex h-screen max-w-lg flex-col items-center justify-center text-center">
      <m.h1
        className="text-9xl font-bold"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        404
      </m.h1>
      <m.h2
        className="mt-4 text-2xl font-semibold"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        UH OH! You're lost.
      </m.h2>
      <m.p
        className="mt-2"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        The page you are looking for does not exist. How you got here is a
        mystery. But you can click the button below to go back to the homepage.
      </m.p>
      <m.button
        className={cn("mt-4", buttonVariants({ variant: "default" }))}
        onClick={() => navigate("/")}
        initial={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        HOME
      </m.button>
    </div>
  )
}
