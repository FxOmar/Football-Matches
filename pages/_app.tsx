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
      <Box
        sx={{
          width: "100%",
          height: "100%",
          bgcolor: "background.default",
          color: "text.primary",
          pl: 3,
        }}
      >
        <Component {...pageProps} />
      </Box>
    </ThemeProvider>
  );
}

export default MyApp;
