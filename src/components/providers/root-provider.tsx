import { QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { LazyMotion, MotionConfig } from "framer-motion"
import type { FC, PropsWithChildren } from "react"
import { HotkeysProvider } from "react-hotkeys-hook"

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
        <TooltipProvider>
          <HotkeysProvider initiallyActiveScopes={["home"]}>
            {import.meta.env.DEV && <Devtools />}
            {children}
          </HotkeysProvider>
        </TooltipProvider>
      </QueryClientProvider>
    </MotionConfig>
    <Toaster />
  </LazyMotion>
)

const Devtools = () => (
  <>
    {import.meta.env.DEV && (
      <ReactQueryDevtools buttonPosition="bottom-left" client={queryClient} />
    )}
  </>
)
