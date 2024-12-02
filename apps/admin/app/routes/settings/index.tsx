import { redirect } from "react-router"

export const clientLoader = () => redirect(`/settings/profile`)

export default function SettingsIndex() {
  return null
}
