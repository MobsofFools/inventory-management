import "../styles/globals.css";
import { ChakraProvider } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import SidebarWithHeader from "../components/ItemCard/SideBar/SideBar";
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <SidebarWithHeader>
        <Component {...pageProps} />
      </SidebarWithHeader>
    </ChakraProvider>
  );
}

export default MyApp;
