# Routing

shadcnui-boilerplate uses a **file-system based router** where folders are used to define routes.

This function is implemented by [Innei](https://github.com/innei). source code is [here](https://github.com/innei-template/vite-react-tailwind-template/blob/master/src/utils/route-builder.ts). Thanks for **Innei**!

The `route-builder` use `react-router@v6`

Each folder represents a route segment that maps to a URL segment. To create a nested route, you can nest folders inside each other.
