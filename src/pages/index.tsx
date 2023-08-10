import Icon, { ICONS } from '@/components/icons/icon';
import Seo from '@/components/seo/seo';

export default function Home() {
  const keys = Object.keys(ICONS);
  return (
    <>
      <Seo />
      <main className="px-10 py-24">
        {keys.map((name) => (
          <Icon key={name} name={name as any} />
        ))}
        <div className="py-64">This is a fucking Laundry service</div>
      </main>
    </>
  );
}
