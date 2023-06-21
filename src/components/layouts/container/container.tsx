import { useState } from 'react';
import Content from './content';
import Sidebar from './sidebar';

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
      <Content
        title={title}
        sidebarVisible={sidebarVisible}
        onOpenSidebar={() => setSidebarVisible(true)}
      >
        {children}
      </Content>
    </div>
  );
}
