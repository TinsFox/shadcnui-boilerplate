import { QueryClientProvider } from "@tanstack/react-query"
import { LazyMotion, MotionConfig } from "framer-motion"
import type { FC, PropsWithChildren } from "react"
import { HotkeysProvider } from "react-hotkeys-hook"

import { Devtools } from "@/components/devtools"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/sonner"
import { TooltipProvider } from "@/components/ui/tooltip"
import { queryClient } from "@/lib/query-client"

const loadFeatures = () =>
  import("../framer-lazy-feature").then((res) => res.default)

export const RootProviders: FC<PropsWithChildren> = ({ children }) => (
  <LazyMotion features={loadFeatures} strict key="framer">
    <MotionConfig
      transition={{
        type: "tween",
        duration: 0.15,
        ease: "easeInOut",
      }}
    >
      <QueryClientProvider client={queryClient}>
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
          <TooltipProvider>
            <HotkeysProvider initiallyActiveScopes={["home"]}>
              {import.meta.env.DEV && <Devtools />}
              {children}
            </HotkeysProvider>
          </TooltipProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </MotionConfig>
    <Toaster richColors />
  </LazyMotion>
)
