import { create } from "@storybook/theming/create"

export const lightTheme = create({
  base: "light",
  brandTitle: "My Storybook",
  brandUrl: "/",

  // Colors
  colorPrimary: "#0099FF",
  colorSecondary: "#0099FF",

  // UI
  appBg: "#F6F9FC",
  appContentBg: "#FFFFFF",
  appBorderColor: "rgba(0,0,0,.1)",
  appBorderRadius: 4,

  // Text colors
  textColor: "#333333",
  textInverseColor: "#FFFFFF",

  // Toolbar default and active colors
  barTextColor: "#999999",
  barSelectedColor: "#0099FF",
  barBg: "#FFFFFF",

  // Form colors
  inputBg: "#FFFFFF",
  inputBorder: "rgba(0,0,0,.1)",
  inputTextColor: "#333333",
  inputBorderRadius: 4,
})

export const darkTheme = create({
  base: "dark",
  brandTitle: "My Storybook",
  brandUrl: "/",

  // Colors
  colorPrimary: "#0099FF",
  colorSecondary: "#0099FF",

  // UI
  appBg: "#1b1b1b",
  appContentBg: "#262626",
  appBorderColor: "rgba(255,255,255,.1)",
  appBorderRadius: 4,

  // Text colors
  textColor: "#FFFFFF",
  textInverseColor: "#333333",

  // Toolbar default and active colors
  barTextColor: "#999999",
  barSelectedColor: "#0099FF",
  barBg: "#1b1b1b",

  // Form colors
  inputBg: "#333333",
  inputBorder: "rgba(255,255,255,.1)",
  inputTextColor: "#FFFFFF",
  inputBorderRadius: 4,
})
