import Icon from '@/components/icons/icon';
import useIsomorphicLayoutEffect from '@/hooks/useIsomorphicLayoutEffect';
import useMe from '@/hooks/useMe';
import useScrollPosition from '@/hooks/useScrollPosition';
import useWindowSize from '@/hooks/useWindowSize';
import { getImageUrl } from '@/utils/utils';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import NavbarMobileModal from './nav-bar-mobile-modal';

type ContainerContentProps = {
  children?: any;
  title?: string;
};

export default function Content({ children, title }: ContainerContentProps) {
  const sidebar = useRef<HTMLDivElement>(null);
  const currSidebarPosY = useRef(0);
  const [direction, setDirection] = useState('up');
  const [sidebarHeight, setSidebarHeight] = useState(0);
  const [windowHeight] = useWindowSize();
  const [stickyValue, setStickyValue] = useState(0);
  const [marginTop, setMarginTop] = useState(0);
  const { user, isLoading } = useMe();
  const [navbarMobileVisible, setNavbarMobileVisible] = useState(false);

  const handleOpenNavbarMobile = () => {
    setNavbarMobileVisible(true);
  };

  const handleCloseNavbarMobile = () => {
    setNavbarMobileVisible(false);
  };

  useScrollPosition(
    ({ prevPos, currPos }: any) => {
      const currDirection = currPos.y > prevPos.y ? 'up' : 'down';
      const stickyValueAbs = Math.abs(stickyValue);
      const currPosYAbs = Math.abs(currPos.y);
      const prevPosYAbs = Math.abs(prevPos.y);

      let diff = Math.abs(currPosYAbs - prevPosYAbs);

      if (direction !== currDirection) {
        diff = 0;
        setDirection(currDirection);
      }

      if (currDirection === 'down') {
        currSidebarPosY.current += diff;
        if (currSidebarPosY.current >= stickyValueAbs) {
          currSidebarPosY.current = stickyValueAbs;
        }
      } else {
        currSidebarPosY.current -= diff;
        if (currSidebarPosY.current <= 0) {
          currSidebarPosY.current = 0;
        }
      }

      if (
        direction === 'up' &&
        currDirection === 'down' &&
        currPosYAbs < stickyValueAbs
      ) {
        setMarginTop(0);
      } else if (
        direction === 'down' &&
        currDirection === 'up' &&
        currSidebarPosY.current === stickyValueAbs
      ) {
        setMarginTop(currPosYAbs - stickyValueAbs);
      } else if (
        direction === 'up' &&
        currDirection === 'down' &&
        currSidebarPosY.current === 0
      ) {
        setMarginTop(currPosYAbs);
      }
    },
    [direction, stickyValue],
  );

  useIsomorphicLayoutEffect(() => {
    setSidebarHeight(sidebar.current?.offsetHeight || 0);
  }, []);

  useEffect(() => {
    const newStickyValue =
      sidebarHeight > windowHeight ? windowHeight - sidebarHeight : 0;
    setStickyValue(newStickyValue);
  }, [sidebarHeight, windowHeight]);

  const isSidebarScrollable = sidebarHeight > windowHeight;

  const sidebarBottom = (() => {
    if (isSidebarScrollable && direction === 'up') {
      return stickyValue;
    }
    return undefined;
  })();

  const sidebarTop = (() => {
    if (isSidebarScrollable) {
      return direction === 'down' ? stickyValue : undefined;
    }
    return 0;
  })();

  return (
    <main className="relative w-full">
      <NavbarMobileModal
        show={navbarMobileVisible}
        onClose={handleCloseNavbarMobile}
      />
      <div className="flex min-h-screen w-full gap-5">
        <div className="border-l-none basis-full border-grey-dark lg:border-l xl:basis-2/3 xl:border-r">
          {!!title && (
            <div className="sticky top-0 z-10 mb-4 border-b border-grey-dark bg-black/30 py-6 backdrop-blur-md">
              <button
                className="absolute left-4 top-1/2 h-8 w-8 -translate-y-1/2 overflow-hidden rounded-full bg-base-lighter bg-opacity-10 md:h-9 md:w-9 lg:hidden"
                onClick={handleOpenNavbarMobile}
              >
                {user?.avatar && (
                  <Image
                    fill
                    src={getImageUrl(user?.avatar)}
                    alt="profile avatar"
                  />
                )}
              </button>
              <h2 className="mx-auto max-w-xs px-4 text-center text-base font-bold md:text-lg lg:max-w-none lg:text-left lg:text-xl">
                {title}
              </h2>
            </div>
          )}
          {children}
        </div>
        <div className="relative mr-3 hidden basis-1/3 xl:block">
          {isSidebarScrollable ? <div style={{ marginTop }} /> : null}
          <div
            className="sticky h-fit w-full"
            style={{
              bottom: sidebarBottom,
              top: sidebarTop,
            }}
            ref={sidebar}
          >
            <div className="sticky top-0 mb-0.5 w-full bg-black py-0.5">
              <div className="relative mt-0.5 flex flex-row-reverse items-center overflow-hidden rounded-full bg-base-light">
                <input
                  className="peer h-full w-full rounded-full border border-transparent bg-transparent py-3 pl-10 pr-3 text-base transition duration-main placeholder:text-grey-main focus:border-brand-main focus:outline-none focus:ring-1 focus:ring-brand-main"
                  placeholder="Search Laundrex"
                />
                <div className="absolute inset-y-0 left-3 flex h-full items-center justify-center bg-opacity-0 text-grey-main peer-focus:text-brand-main">
                  <Icon className="h-5 w-5" name="search" />
                </div>
              </div>
            </div>
            <div className="mt-5 h-40 w-full rounded-2xl bg-base-main px-4 py-3">
              <h3 className="text-xl font-bold">Features</h3>
            </div>
            <div className="mt-5 h-96 w-full rounded-2xl bg-base-main px-4 py-3">
              <h3 className="text-xl font-bold">Trending</h3>
            </div>
            <div className="mt-5 h-72 w-full rounded-2xl bg-base-main px-4 py-3">
              <h3 className="text-xl font-bold">Suggestions</h3>
            </div>
            <div className="mt-5 h-64 w-full rounded-2xl bg-transparent px-4 py-3">
              <span className="text-xs">Terms of Service</span>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
