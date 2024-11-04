import { redirect } from "react-router"

export async function clientLoader({ params }: any) {
  if (!params.chartId) {
    return redirect(`/charts/area-chart`)
  }
  return redirect(`/charts/${params.chartId}/area-chart`)
}

export default function ChartIndex() {
  return null
}
