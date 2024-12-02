import { redirect } from "react-router"

export const clientLoader = () => redirect(`/system/about`)

export default function SystemIndex() {
  return null
}
