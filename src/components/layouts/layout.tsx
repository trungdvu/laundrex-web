import Footer from './footer';
import Header from './header';

export type LayoutProps = {
  children: React.ReactNode;
  header?: JSX.Element | null;
  footer?: JSX.Element | null;
};

export default function Layout({ children, header, footer }: LayoutProps) {
  return (
    <>
      {header !== undefined ? header : <Header />}
      {children}
      {footer !== undefined ? footer : <Footer />}
    </>
  );
}
