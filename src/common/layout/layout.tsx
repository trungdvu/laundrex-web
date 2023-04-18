import Footer from './footer';
import Header from './header';

export default function Layout({ children }: { children: React.ReactNode }) {
  // render header, footer here
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}
