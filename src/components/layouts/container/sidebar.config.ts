import {
  UilDashboard,
  UilSetting,
  UilTransaction,
} from '@iconscout/react-unicons';

export const SIDEBAR_MENU_ITEMS = [
  {
    href: '/dashboard',
    title: 'Dashboard',
    Icon: UilDashboard,
  },
  {
    href: '/bookings',
    title: 'Bookings',
    Icon: UilTransaction,
  },
  {
    href: '/settings',
    title: 'Settings',
    Icon: UilSetting,
  },
];
export type SidebarMenuItem = (typeof SIDEBAR_MENU_ITEMS)[0];
