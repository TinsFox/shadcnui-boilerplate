import * as React from "react"

interface EmptyProps {
  description?: React.ReactNode
  icon?: React.ReactNode
}

export function Empty(props: EmptyProps) {
  return <div>{props.description || "No results"}</div>
}
