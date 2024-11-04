import { redirect } from "react-router"

export default function SettingsIndex() {
  return null
}

export async function clientLoader() {
  return redirect("/settings/profile")
}
