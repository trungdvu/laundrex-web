import { useState } from 'react';
import useIsomorphicLayoutEffect from './useIsomorphicLayoutEffect';

const useWindowSize = () => {
  const [size, setSize] = useState({ width: 0, height: 0 });

  const handleSize = () => {
    setSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  };

  useIsomorphicLayoutEffect(() => {
    handleSize();

    window.addEventListener('resize', handleSize);

    return () => window.removeEventListener('resize', handleSize);
  }, []);

  return [size.height, size.width];
};

export default useWindowSize;
