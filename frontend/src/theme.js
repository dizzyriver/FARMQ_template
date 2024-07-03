// src/theme.js
import { createTheme } from "@mui/material/styles";
import getCssVariable from "./utils/getCssVariable";

const theme = createTheme({
  palette: {
    primary: {
      main: getCssVariable("--color-primary"),
      light: getCssVariable("--color-primary-50"),
      dark: getCssVariable("--color-primary-900"),
      contrastText: getCssVariable("--color-on-primary"),
    },
    secondary: {
      main: getCssVariable("--color-secondary"),
      light: getCssVariable("--color-secondary-50"),
      dark: getCssVariable("--color-secondary-900"),
      contrastText: getCssVariable("--color-on-secondary"),
    },
    background: {
      default: getCssVariable("--color-background"),
      paper: getCssVariable("--color-surface"),
    },
    error: {
      main: getCssVariable("--color-error"),
    },
    text: {
      primary: getCssVariable("--color-on-background"),
      secondary: getCssVariable("--color-on-surface"),
    },
    complementary: {
      50: getCssVariable("--color-complementary-50"),
      100: getCssVariable("--color-complementary-100"),
      200: getCssVariable("--color-complementary-200"),
      300: getCssVariable("--color-complementary-300"),
      400: getCssVariable("--color-complementary-400"),
      500: getCssVariable("--color-complementary-500"),
      600: getCssVariable("--color-complementary-600"),
      700: getCssVariable("--color-complementary-700"),
      800: getCssVariable("--color-complementary-800"),
      900: getCssVariable("--color-complementary-900"),
    },
    analogous: {
      50: getCssVariable("--color-analogous-50"),
      100: getCssVariable("--color-analogous-100"),
      200: getCssVariable("--color-analogous-200"),
      300: getCssVariable("--color-analogous-300"),
      400: getCssVariable("--color-analogous-400"),
      500: getCssVariable("--color-analogous-500"),
      600: getCssVariable("--color-analogous-600"),
      700: getCssVariable("--color-analogous-700"),
      800: getCssVariable("--color-analogous-800"),
      900: getCssVariable("--color-analogous-900"),
    },
    triadic: {
      50: getCssVariable("--color-triadic-50"),
      100: getCssVariable("--color-triadic-100"),
      200: getCssVariable("--color-triadic-200"),
      300: getCssVariable("--color-triadic-300"),
      400: getCssVariable("--color-triadic-400"),
      500: getCssVariable("--color-triadic-500"),
      600: getCssVariable("--color-triadic-600"),
      700: getCssVariable("--color-triadic-700"),
      800: getCssVariable("--color-triadic-800"),
      900: getCssVariable("--color-triadic-900"),
    },
  },
  typography: {
    fontFamily: getCssVariable("--font-family-primary"),
    h1: {
      fontFamily: getCssVariable("--font-family-secondary"),
    },
    h2: {
      fontFamily: getCssVariable("--font-family-secondary"),
    },
    h3: {
      fontFamily: getCssVariable("--font-family-secondary"),
    },
    h4: {
      fontFamily: getCssVariable("--font-family-secondary"),
    },
    h5: {
      fontFamily: getCssVariable("--font-family-secondary"),
    },
    h6: {
      fontFamily: getCssVariable("--font-family-secondary"),
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          backgroundColor: getCssVariable("--color-primary"),
          color: getCssVariable("--color-on-primary"),
          "&:hover": {
            backgroundColor: getCssVariable("--color-primary-900"),
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        colorPrimary: {
          backgroundColor: getCssVariable("--color-complementary-500"),
        },
      },
    },
  },
});

export default theme;
