import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { sans } from '../configs/typography';
import NextNProgress from '@/components/loadings/next-n-progress';

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
      <NextNProgress />
      <Component {...pageProps} />
    </>
  );
}
