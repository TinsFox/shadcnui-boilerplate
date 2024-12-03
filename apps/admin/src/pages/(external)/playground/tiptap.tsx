import { MinimalTiptapEditor } from "@repo/tiptap/minimal-tiptap"
import type { Content } from "@tiptap/react"
import { useState } from "react"

export function Component() {
  const [value, setValue] = useState<Content>("")

  return (
    <MinimalTiptapEditor
      value={value}
      onChange={setValue}
      className="w-full"
      editorContentClassName="p-5"
      output="html"
      placeholder="Type your description here..."
      autofocus={true}
      editable={true}
      editorClassName="focus:outline-none"
    />
  )
}
