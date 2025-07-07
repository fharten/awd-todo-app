import '@/styles/globals.css';
import { ChakraProvider, theme } from '@chakra-ui/react';
import { fonts } from '../lib/fonts';
import { SWRConfig } from 'swr';
import { AppProps } from 'next/app';

const fetcher = (url: string) => fetch(url).then((response) => response.json());

function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <style jsx global>
        {`
          :root {
            --font-rubik: ${fonts.rubik.style.fontFamily};
          }
          body,
          html {
            height: 100%;
          }
        `}
      </style>
      <ChakraProvider theme={theme}>
        <SWRConfig value={{ fetcher }}>
          <Component {...pageProps} />
        </SWRConfig>
      </ChakraProvider>
    </>
  );
}

export default App;
