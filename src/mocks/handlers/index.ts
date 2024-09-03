import { albumHandles as albumHandles } from "./albums"
import { userHandlers as userHandlers } from "./user"

export const handlers = [...albumHandles, ...userHandlers]
