import { redirect } from "react-router";

export async function clientLoader() {
	return redirect("/dashboard/overview");
}
