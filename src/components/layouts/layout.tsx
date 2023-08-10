import { pageMotion } from '@/utils/motion';
import { motion } from 'framer-motion';

export type LayoutProps = {
  children: React.ReactNode;
  header?: JSX.Element | null;
  footer?: JSX.Element | null;
  className?: string;
};

export default function Layout({
  children,
  header,
  footer,
  className,
}: LayoutProps) {
  return (
    <motion.div className={className} {...pageMotion}>
      {header && header}
      {children}
      {footer && footer}
    </motion.div>
  );
}
