import "../styles/globals.css";
import { RecoilRoot } from "recoil";
import { ChakraProvider, CSSReset, extendTheme } from "@chakra-ui/react";
import { AuthProvider } from "../auth";
import "@fontsource/raleway/400.css";
import "@fontsource/open-sans/700.css";
import Head from "next/head";

const theme = extendTheme({
  fonts: {
    heading: "Open Sans",
    body: "Raleway",
  },
});

function MyApp({ Component, pageProps }) {
  return (
    <RecoilRoot>
      <Head>
        <title>ZerOpacity</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      <ChakraProvider theme={theme}>
        <CSSReset />
        <AuthProvider>
          <Component {...pageProps} />
        </AuthProvider>
      </ChakraProvider>
    </RecoilRoot>
  );
}

export default MyApp;
