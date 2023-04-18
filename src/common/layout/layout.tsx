import Footer from './footer';
import Header from './header';
import { LayoutProps } from './layout.type';

export default function Layout({ children, header, footer }: LayoutProps) {
  return (
    <>
      {header !== undefined ? header : <Header />}
      {children}
      {footer !== undefined ? footer : <Footer />}
    </>
  );
}
