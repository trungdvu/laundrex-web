import { twMerge } from 'tailwind-merge';
import {
  ArrowLeft,
  ArrowUpFilled,
  At,
  Bell,
  BellFilled,
  Bookmark,
  BookmarkFilled,
  Calendar,
  Check,
  ChevronDown,
  Cross,
  Doodle,
  Exclamation,
  Eye,
  EyeClosed,
  Filter,
  Home,
  HomeFilled,
  Letter,
  List,
  ListFilled,
  LogoL,
  MenuList,
  Message,
  MessageFilled,
  More,
  MoreCircle,
  Search,
  SearchThick,
  Verify,
} from './icons';

export const ICONS = {
  home: Home,
  'home-filled': HomeFilled,
  search: Search,
  'search-thick': SearchThick,
  bell: Bell,
  'bell-filled': BellFilled,
  bookmark: Bookmark,
  'bookmark-filled': BookmarkFilled,
  list: List,
  'list-filled': ListFilled,
  message: Message,
  'message-filled': MessageFilled,
  more: More,
  'more-circle': MoreCircle,
  'arrow-left': ArrowLeft,
  'logo-l': LogoL,
  filter: Filter,
  'chevron-down': ChevronDown,
  eye: Eye,
  'eye-close': EyeClosed,
  cross: Cross,
  'arrow-up-filled': ArrowUpFilled,
  letter: Letter,
  icon: Check,
  verify: Verify,
  at: At,
  exclamation: Exclamation,
  doodle: Doodle,
  calendar: Calendar,
  'menu-list': MenuList,
};

type IconName = keyof typeof ICONS;

export default function Icon({
  name,
  className,
}: {
  name: IconName;
  className?: string;
}) {
  const Component = ICONS[name];
  return (
    <Component
      className={twMerge('h-5 w-5 fill-current text-inherit', className)}
    />
  );
}
