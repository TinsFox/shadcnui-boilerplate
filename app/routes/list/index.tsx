import { redirect } from "react-router"

export async function clientLoader() {
  return redirect("/list/basic-list")
}

export default function ListIndex() {
  return null
}
