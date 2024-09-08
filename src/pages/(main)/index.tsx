import { Link } from "react-router-dom"

import { Logo } from "@/components/icons/logo"
import { logos } from "@/components/icons/logos"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip.js"
import { cn } from "@/lib/utils"

// Tailwind Grid cell classes lookup
const columnClasses: Record<(typeof logos)[number]["column"], string> = {
  1: "xl:col-start-1",
  2: "xl:col-start-2",
  3: "xl:col-start-3",
  4: "xl:col-start-4",
  5: "xl:col-start-5",
}
const rowClasses: Record<(typeof logos)[number]["row"], string> = {
  1: "xl:row-start-1",
  2: "xl:row-start-2",
  3: "xl:row-start-3",
  4: "xl:row-start-4",
  5: "xl:row-start-5",
  6: "xl:row-start-6",
}
export function Component() {
  return (
    <main className="grid h-full place-items-center">
      <div className="grid place-items-center px-4 py-16 xl:grid-cols-2 xl:gap-24">
        <div className="flex max-w-md flex-col items-center text-center xl:order-2 xl:items-start xl:text-left">
          <a
            href="https://github.com/TinsFox/vite-boilerplate"
            className="animate-slide-top [animation-fill-mode:backwards] xl:animate-slide-left xl:[animation-delay:0.5s] xl:[animation-fill-mode:backwards]"
          >
            <Logo />
          </a>
          <h1
            data-heading
            className="mt-8 animate-slide-top text-4xl font-medium text-foreground [animation-delay:0.3s] [animation-fill-mode:backwards] md:text-5xl xl:mt-4 xl:animate-slide-left xl:text-6xl xl:[animation-delay:0.8s] xl:[animation-fill-mode:backwards]"
          >
            <a href="https://github.com/TinsFox/vite-boilerplate">
              Shadcn UI Boilerplate
            </a>
          </h1>
          <p
            data-paragraph
            className="mt-6 animate-slide-top text-xl/7 text-muted-foreground [animation-delay:0.8s] [animation-fill-mode:backwards] xl:mt-8 xl:animate-slide-left xl:text-xl/6 xl:leading-10 xl:[animation-delay:1s] xl:[animation-fill-mode:backwards]"
          >
            Check the
            {" "}
            <a
              className="underline hover:no-underline"
              href="https://shadcnui-boilerplate.pages.dev/guide/what-is-shadcn-ui-boilerplate"
            >
              Getting Started guide
            </a>
            {" "}
            file for how to get your project off the ground!
          </p>
        </div>
        <ul className="mt-16 flex max-w-3xl flex-wrap justify-center gap-2 sm:gap-4 xl:mt-0 xl:grid xl:grid-flow-col xl:grid-cols-5 xl:grid-rows-6">
          <TooltipProvider>
            {logos.map((logo, i) => (
              <li
                key={logo.href}
                className={cn(
                  columnClasses[logo.column],
                  rowClasses[logo.row],
                  "animate-roll-reveal [animation-fill-mode:backwards]",
                )}
                style={{ animationDelay: `${i * 0.07}s` }}
              >
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Link
                      to={logo.href}
                      className="grid size-20 place-items-center rounded-2xl bg-violet-600/10 p-4 transition hover:-rotate-6 hover:bg-violet-600/15 dark:bg-violet-200 dark:hover:bg-violet-100 sm:size-24"
                    >
                      <img src={logo.src} alt={logo.name} />
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent>{logo.name}</TooltipContent>
                </Tooltip>
              </li>
            ))}
          </TooltipProvider>
        </ul>
      </div>
    </main>
  )
}
