import router from 'next/router';
import NProgress from 'nprogress';
import { memo, useEffect, useRef } from 'react';

type NextNProgressProps = {
  color?: string;
  startPosition?: number;
  stopDelayMs?: number;
  height?: number;
  showOnShallow?: boolean;
  nonce?: string;
  transformCSS?: (css: string) => JSX.Element;
};

const NextNProgress = ({
  color = '#7EA949',
  startPosition = 0.3,
  stopDelayMs = 200,
  height = 3,
  showOnShallow,
  nonce,
  transformCSS = (css) => <style nonce={nonce}>{css}</style>,
}: NextNProgressProps) => {
  const timer = useRef<NodeJS.Timeout | null>(null);

  const routeChangeStart = (
    _: string,
    {
      shallow,
    }: {
      shallow: boolean;
    },
  ) => {
    if (!shallow || showOnShallow) {
      NProgress.set(startPosition);
      NProgress.start();
    }
  };

  const routeChangeEnd = (
    _: string,
    {
      shallow,
    }: {
      shallow: boolean;
    },
  ) => {
    if (!shallow || showOnShallow) {
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(() => {
        NProgress.done(true);
      }, stopDelayMs);
    }
  };

  const routeChangeError = (
    _err: Error,
    _url: string,
    {
      shallow,
    }: {
      shallow: boolean;
    },
  ) => {
    if (!shallow || showOnShallow) {
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(() => {
        NProgress.done(true);
      }, stopDelayMs);
    }
  };

  useEffect(() => {
    router.events.on('routeChangeStart', routeChangeStart);
    router.events.on('routeChangeComplete', routeChangeEnd);
    router.events.on('routeChangeError', routeChangeError);

    return () => {
      router.events.off('routeChangeStart', routeChangeStart);
      router.events.off('routeChangeComplete', routeChangeEnd);
      router.events.off('routeChangeError', routeChangeError);
    };
  }, []);

  return transformCSS(`
    #nprogress {
      pointer-events: none;
    }
    #nprogress .bar {
      background: ${color};
      position: fixed;
      z-index: 9999;
      top: 0;
      left: 0;
      width: 100%;
      height: ${height}px;
    }
    #nprogress .peg {
      display: block;
      position: absolute;
      right: 0px;
      width: 100px;
      height: 100%;
      box-shadow: 0 0 10px ${color}, 0 0 5px ${color};
      opacity: 1;
      -webkit-transform: rotate(3deg) translate(0px, -4px);
      -ms-transform: rotate(3deg) translate(0px, -4px);
      transform: rotate(3deg) translate(0px, -4px);
    }
    .nprogress-custom-parent {
      overflow: hidden;
      position: relative;
    }
    .nprogress-custom-parent #nprogress .bar {
      position: absolute;
    }
  `);
};

export default memo(NextNProgress);
