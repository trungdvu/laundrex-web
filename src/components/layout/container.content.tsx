import { UilBars } from '@iconscout/react-unicons';
import { AnimatePresence, motion } from 'framer-motion';

type ContainerContentProps = {
  children?: any;
  title?: string;
  sidebarVisible: boolean;
  onOpenSidebar: () => void;
};

export default function ContainerContent({
  children,
  title,
  sidebarVisible,
  onOpenSidebar,
}: ContainerContentProps) {
  return (
    <motion.div
      className="h-full w-full translate-x-0 overflow-scroll"
      animate={{
        marginLeft: sidebarVisible ? 0 : -288,
        transition: { type: 'keyframes' },
      }}
    >
      <Header
        title={title}
        onOpenSidebar={onOpenSidebar}
        sidebarVisible={sidebarVisible}
      />
      {children}
    </motion.div>
  );
}

type HeaderProps = Pick<
  ContainerContentProps,
  'onOpenSidebar' | 'sidebarVisible' | 'title'
>;

function Header({ title, sidebarVisible, onOpenSidebar }: HeaderProps) {
  return (
    <div className="relative flex h-20 w-full items-center border-b px-5">
      <AnimatePresence initial={false} mode="sync">
        {!sidebarVisible ? (
          <motion.button
            className="btn-icon absolute flex h-10 w-10"
            onClick={onOpenSidebar}
            initial={{
              left: 20,
              translateX: -20,
              opacity: 0,
              top: '50%',
              translateY: '-50%',
            }}
            animate={{
              opacity: 1,
              translateX: 0,
              transition: { delay: 0.4, type: 'keyframes' },
            }}
            exit={{ opacity: 0, transition: { delay: 0 } }}
          >
            <UilBars size={28} />
          </motion.button>
        ) : null}
      </AnimatePresence>
      <div className="flex w-full items-center justify-between">
        <motion.h2
          className="text-2xl font-bold"
          animate={{
            marginLeft: !sidebarVisible ? 50 : 0,
            transition: {
              delay: 0.4,
              type: 'keyframes',
            },
          }}
        >
          {title}
        </motion.h2>
        <div className="flex gap-2">
          <div className="flex flex-col items-end justify-center">
            <span className="font-medium">Trung Vu</span>
            <span className="text-sm">Adminstrator</span>
          </div>
          <div className="h-10 w-10 bg-neutral-100 text-sm"></div>
        </div>
      </div>
    </div>
  );
}
