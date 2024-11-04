import { Suspense } from "react"
import { useLoaderData } from "react-router"

const components = import.meta.glob(`../components/**`)

export const clientLoader = async ({
  params,
}: {
  request: Request
  params: { chartId: string }
}) => {
  const { chartId } = params

  const modules = await Promise.all(
    Object.entries(components).map(async ([path, chart]) => {
      const mod = (await chart()) as {
        Component: React.FC
        description: string
      }
      return { path, ...mod }
    }),
  )

  const filteredModules = modules.filter(({ path }) => path.includes(chartId))

  const chartMap = Object.fromEntries(
    filteredModules.map(({ path, Component: component, description }) => [
      path,
      { component, description },
    ]),
  )

  return {
    components: chartMap,
  }
}

export default function Chart() {
  const { components } = useLoaderData() as Awaited<
    ReturnType<typeof clientLoader>
  >

  return (
    <>
      <div className="grid flex-1 scroll-mt-20 items-start gap-10 md:grid-cols-2 md:gap-6 lg:grid-cols-3 xl:gap-10">
        <Suspense fallback={<div>Loading...</div>}>
          {Object.entries(components).map(([path, prop]) => {
            const { component: ChartComponent, description } = prop
            return (
              <div key={path} className="p-4 ">
                <ChartComponent />
                <p>{description}</p>
              </div>
            )
          })}
        </Suspense>
      </div>
    </>
  )
}
