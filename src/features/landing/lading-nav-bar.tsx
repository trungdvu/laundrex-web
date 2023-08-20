import Button from '@/components/buttons/button';
import Icon from '@/components/icons/icon';
import { useRouter } from 'next/router';

export default function LandingNavBar() {
  const router = useRouter();

  return (
    <div className="fixed top-0 z-10 w-full px-4">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between md:h-16">
        <Icon className="h-auto w-4 lg:w-6" name="logo-l" />
        <div className="flex items-center gap-4">
          <Button
            className="px-4 py-2 text-sm lg:text-base"
            onClick={() => router.push('/sign-in')}
          >
            Book now
          </Button>
        </div>
      </div>
    </div>
  );
}
