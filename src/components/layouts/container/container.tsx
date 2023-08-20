import Content from './content';
import NavBar from './nav-bar';

type ContainerProps = {
  title?: string;
  sidebarVisible?: boolean;
  children?: any;
};

export default function Container({
  title = '',
  sidebarVisible = true,
  children,
}: ContainerProps) {
  return (
    <div className="flex w-full justify-center">
      <div className="relative flex w-full max-w-screen-2xl">
        <NavBar />
        <Content title={title} sidebarVisible={sidebarVisible}>
          {children}
        </Content>
      </div>
    </div>
  );
}
