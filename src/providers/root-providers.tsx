import { QueryClientProvider } from "@tanstack/react-query"
import { LazyMotion, MotionConfig } from "framer-motion"
import type { FC, PropsWithChildren } from "react"
import { HotkeysProvider } from "react-hotkeys-hook"

import { Devtools } from "@/components/devtools"
import { ThemeCustomizer } from "@/components/theme/theme-customizer"
import { ThemeProvider } from "@/components/theme/theme-provider"
import { ThemeWrapper } from "@/components/theme/theme-wrapper"
import { ThemesStyle } from "@/components/theme/themes-styles"
import { Toaster } from "@/components/ui/sonner"
import { Toaster as PrimitiveToaster } from "@/components/ui/toaster"
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
        <ThemeWrapper>
          <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
            <TooltipProvider>
              <HotkeysProvider initiallyActiveScopes={["home"]}>
                {import.meta.env.DEV && <Devtools />}
                {children}
                <ThemeCustomizer className="fixed bottom-4 right-4 z-[9999]" />
              </HotkeysProvider>
            </TooltipProvider>
            <ThemesStyle />
          </ThemeProvider>
        </ThemeWrapper>
      </QueryClientProvider>
    </MotionConfig>
    <PrimitiveToaster />
    <Toaster richColors />
  </LazyMotion>
)
