import { redirect } from "react-router";

export const clientLoader = ({
	request,
}: {
	request: Request;
	params: { chartName: string };
}) => {
	const url = new URL(request.url);
	return redirect(`${url.pathname}/area-chart`);
};
