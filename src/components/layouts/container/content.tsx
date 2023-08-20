import Avatar from '@/components/avatar';
import Icon from '@/components/icons/icon';
import useIsomorphicLayoutEffect from '@/hooks/useIsomorphicLayoutEffect';
import useMe from '@/hooks/useMe';
import useScrollPosition from '@/hooks/useScrollPosition';
import useWindowSize from '@/hooks/useWindowSize';
import { useEffect, useRef, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import NavbarMobileModal from './nav-bar-mobile-modal';

type ContainerContentProps = {
  children?: any;
  title?: string;
  sidebarVisible?: boolean;
};

export default function Content({
  children,
  title,
  sidebarVisible = true,
}: ContainerContentProps) {
  const sidebar = useRef<HTMLDivElement>(null);
  const currSidebarPosY = useRef(0);
  const [direction, setDirection] = useState('up');
  const [sidebarHeight, setSidebarHeight] = useState(0);
  const [windowHeight] = useWindowSize();
  const [stickyValue, setStickyValue] = useState(0);
  const [marginTop, setMarginTop] = useState(0);
  const { user } = useMe();
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
        <div className="border-l-none basis-full border-main lg:border-l xl:basis-2/3 xl:border-r">
          {!!title && (
            <div className="sticky top-0 z-10 mb-4 flex h-14 items-center justify-center border-b border-main bg-base md:h-16 lg:h-20 lg:justify-start lg:bg-base/30 lg:backdrop-blur-md">
              <button
                className={twMerge(
                  'absolute left-4 top-1/2 h-8 w-8 -translate-y-1/2 overflow-hidden rounded-full bg-opacity-10 md:h-9 md:w-9 lg:hidden',
                  !user?.avatar && 'bg-secondary',
                )}
                onClick={handleOpenNavbarMobile}
              >
                <Avatar
                  className="h-full w-full"
                  url={user?.avatar}
                  name={user?.name}
                  email={user?.email}
                />
              </button>
              <h2 className="mx-auto max-w-xs px-4 text-center text-base font-bold md:text-lg lg:mx-0 lg:max-w-none lg:text-left lg:text-xl">
                {title}
              </h2>
            </div>
          )}
          {children}
        </div>
        {sidebarVisible && (
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
              <div className="sticky top-0 flex h-14 w-full flex-col justify-center bg-base md:h-16 lg:h-20">
                <div className="relative flex flex-row-reverse items-center overflow-hidden rounded-full bg-secondary">
                  <input
                    className="peer h-full w-full rounded-full border border-transparent bg-transparent py-3 pl-10 pr-3 text-base transition duration-normal placeholder:text-secondary focus:border-brand-main focus:outline-none focus:ring-1 focus:ring-brand-main"
                    placeholder="Search Laundrex"
                  />
                  <div className="absolute inset-y-0 left-3 flex h-full items-center justify-center bg-opacity-0 text-secondary peer-focus:text-brand-main">
                    <Icon className="h-5 w-5" name="search" />
                  </div>
                </div>
              </div>
              <div className="mt-4 h-40 w-full rounded-2xl bg-main px-4 py-3">
                <h3 className="text-xl font-bold">Features</h3>
              </div>
              <div className="mt-4 h-96 w-full rounded-2xl bg-main px-4 py-3">
                <h3 className="text-xl font-bold">Trending</h3>
              </div>
              <div className="mt-4 h-72 w-full rounded-2xl bg-main px-4 py-3">
                <h3 className="text-xl font-bold">Suggestions</h3>
              </div>
              <div className="mt-4 h-64 w-full rounded-2xl bg-transparent px-4 py-3">
                <span className="text-xs">Terms of Service</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
