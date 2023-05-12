import { useState } from 'react';
import ContainerContent from './container.content';
import Sidebar from './container.sidebar';

type ContainerProps = {
  title?: string;
  children?: any;
};

export default function Container({ title = '', children }: ContainerProps) {
  const [sidebarVisible, setSidebarVisible] = useState(true);

  return (
    <div className="flex h-screen">
      <Sidebar
        visible={sidebarVisible}
        onClose={() => setSidebarVisible(false)}
      />
      <ContainerContent
        title={title}
        sidebarVisible={sidebarVisible}
        onOpenSidebar={() => setSidebarVisible(true)}
      >
        {children}
      </ContainerContent>
    </div>
  );
}
