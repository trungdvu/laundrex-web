import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { sans } from '../configs/fonts.config';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <style jsx global>
        {`
          :root {
            --font-sans: ${sans.style.fontFamily};
          }
        `}
      </style>
      <Component {...pageProps} />
    </>
  );
}
