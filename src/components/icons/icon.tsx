import classNames from 'classnames';
import { twMerge } from 'tailwind-merge';
import {
  ArrowLeft,
  Bell,
  BellFilled,
  Bookmark,
  BookmarkFilled,
  ChevronDown,
  Cross,
  Eye,
  EyeClosed,
  Filter,
  Home,
  HomeFilled,
  List,
  ListFilled,
  LogoL,
  Message,
  MessageFilled,
  More,
  MoreCircle,
  Search,
  SearchThick,
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
      className={twMerge(
        classNames(
          'h-5 w-5 fill-current text-inherit md:h-6 md:w-6',
          className,
        ),
      )}
    />
  );
}
