import { DependencyList, useRef } from 'react';
import useIsomorphicLayoutEffect from './useIsomorphicLayoutEffect';

const isBrowser = typeof window !== `undefined`;

function getScrollPosition({ element, useWindow }: any) {
  if (!isBrowser) return { x: 0, y: 0 };

  const target = element ? element.current : document.body;
  const position = target.getBoundingClientRect();

  return useWindow
    ? { x: window.scrollX, y: window.scrollY }
    : { x: position.left, y: position.top };
}

export default function useScrollPosition(
  effect: any,
  deps?: DependencyList,
  element?: any,
  useWindow?: boolean,
  wait?: number,
) {
  const position = useRef(getScrollPosition({ useWindow }));
  const timeout = useRef<NodeJS.Timeout | null>(null);

  const callBack = () => {
    const currPos = getScrollPosition({ element, useWindow });
    effect({ prevPos: position.current, currPos });
    position.current = currPos;
    timeout.current = null;
  };

  useIsomorphicLayoutEffect(() => {
    const handleScroll = () => {
      if (wait) {
        if (timeout.current === null) {
          timeout.current = setTimeout(callBack, wait);
        }
      } else {
        callBack();
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, deps);
}
