import { m } from "framer-motion"
import type { FC } from "react"

import { attachOpenInEditor } from "@/lib/dev"
import { getNewIssueUrl } from "@/lib/issues"

import { Button } from "../ui/button"
import { parseError } from "./helper"

export const ModalErrorFallback: FC = (
  props,
) => {
  const { message, stack } = parseError(props.error)

  return (
    <m.div
      className="flex flex-col items-center justify-center rounded-md bg-background p-2"
      exit={{
        opacity: 0,
        scale: 0.9,
      }}
    >
      <div className="m-auto max-w-prose text-center">
        <div className="mb-4">
          <i className="text-4xl text-red-500" />
        </div>
        <div className="text-lg font-bold">{message}</div>
        {import.meta.env.DEV && stack ? (
          <div className="mt-4 cursor-text overflow-auto whitespace-pre rounded-md bg-red-50 p-4 text-left font-mono text-sm text-red-600">
            {attachOpenInEditor(stack)}
          </div>
        ) : null}

        <p className="my-8">
          The App has a temporary problem, click the button below to try
          reloading the app or another solution?
        </p>

        <div className="center gap-4">
          <Button onClick={() => {}} variant="outline">
            Close Modal
          </Button>
          <Button
            onClick={() => window.location.reload()}
            variant="outline"
          >
            Reload
          </Button>
        </div>

        <p className="mt-8">
          Still having this issue? Please give feedback in Github, thanks!
          <a
            className="ml-2 cursor-pointer duration-200 hover:text-accent"
            href={getNewIssueUrl({
              title: `Error: ${message}`,
              body: `### Error\n\n${message}\n\n### Stack\n\n\`\`\`\n${stack}\n\`\`\``,
              label: "bug",
            })}
            target="_blank"
            rel="noreferrer"
          >
            Submit Issue
          </a>
        </p>
      </div>
    </m.div>
  )
}
