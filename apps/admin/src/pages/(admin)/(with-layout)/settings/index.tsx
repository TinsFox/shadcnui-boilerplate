import { redirect } from "react-router-dom"

export function Component() {
  return null
}

export const loader = () => redirect(`/settings/profile`)
