import Icon from '@/components/icons/icon';

const iconClassName = 'h-[26.5px] w-[26.5px]';

export const NAV_ITEMS = [
  {
    href: '/admin/dashboard',
    title: 'Dashboard',
    icon: <Icon name="home" className={iconClassName} />,
    iconActive: <Icon name="home-filled" className={iconClassName} />,
  },
  {
    href: '/admin/bookings',
    title: 'Bookings',
    icon: <Icon name="list" className={iconClassName} />,
    iconActive: <Icon name="list-filled" className={iconClassName} />,
  },
];

export type NavMenuItem = (typeof NAV_ITEMS)[0];
