import { redirect } from "react-router-dom"

export const loader = ({
  request,
  params,
}: {
  request: Request
  params: { chartName: string }
}) => {
  const url = new URL(request.url)
  return redirect(`${url.pathname}/${params.chartName}`)
}
