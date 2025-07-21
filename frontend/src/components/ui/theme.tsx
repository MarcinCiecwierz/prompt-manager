import { createSystem, defaultConfig, defineConfig } from "@chakra-ui/react";
import "@fontsource-variable/roboto-mono";

const customConfig = defineConfig({
  theme: {
    tokens: {
      colors: {
        orange: {
          50: { value: "#fff7ed" },
          100: { value: "#ffedd5" },
          200: { value: "#fed7aa" },
          300: { value: "#fdba74" },
          400: { value: "#fb923c" },
          500: { value: "#f97316" },
          600: { value: "#ea580c" },
          700: { value: "#c2410c" },
          800: { value: "#9a3412" },
          900: { value: "#7c2d12" },
          950: { value: "#431407" },
        },
        fonts: {
          mono: { value: "'Roboto Mono Variable', monospace" },
        },
      },
    },
    recipes: {
      button: {
        base: {
          borderRadius: "xl",
        },
      },
      avatar: {
        base: {
          borderRadius: "xl",
        },
      },
    },
  },
  globalCss: {
    heading: {
      fontFamily: "mono",
    },
    body: {
      bg: "#FAF3E0",
      fontFamily: "mono",
    },
  },
});

export const system = createSystem(defaultConfig, customConfig);
