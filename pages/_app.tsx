import "../styles/globals.css";
import type { AppProps } from "next/app";
import { useMemo } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { deepOrange } from "@mui/material/colors";
import { Box } from "@mui/material";

function MyApp({ Component, pageProps }: AppProps) {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          background: {
            default: deepOrange[900],
            paper: deepOrange[900],
          },
          mode: prefersDarkMode ? "dark" : "light",
        },
      }),
    [prefersDarkMode]
  );

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          display: "flex",
          width: "100%",
          // alignItems: "center",
          // justifyContent: "center",
          bgcolor: "background.default",
          color: "text.primary",
          p: 3,
        }}
      >
        <Component {...pageProps} />
      </Box>
    </ThemeProvider>
  );
}

export default MyApp;
