import { useParams } from "react-router"

export default function PlaygroundRoute() {
  const { id } = useParams()
  return (
    <div>
      <h1>Id: {id}</h1>
    </div>
  )
}
