import "../styles/globals.css";
import type { AppProps } from "next/app";
import { useMemo } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Box } from "@mui/material";

function MyApp({ Component, pageProps }: AppProps) {
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: "dark",
          primary: {
            main: "#26a27b",
          },
          secondary: {
            main: "#fafafa",
          },
        },
      }),
    []
  );

  return (
    <ThemeProvider theme={theme}>
      <div
        style={{
          width: "100%",
          height: "100vh",
          backgroundColor: "rgb(44, 44, 44)",
          color: "white",
          paddingLeft: "20px",
        }}
      >
        <Component {...pageProps} />
      </div>
    </ThemeProvider>
  );
}

export default MyApp;
