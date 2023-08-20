import { ICONS } from '@/components/icons/icon';
import Seo from '@/components/seo/seo';
import LandingNavBar from '@/features/landing/lading-nav-bar';
import { LANDING_KEY_ITEMS } from '@/features/landing/lading.const';
import Image from 'next/image';
import clothsOne from '../assets/cloths-1.png';

export default function Home() {
  const keys = Object.keys(ICONS);
  return (
    <>
      <Seo />
      <LandingNavBar />
      <main>
        <section className="relative bg-quaternary py-14 md:py-16">
          <div className="max-w-6xl px-4 pt-14 md:pt-16 lg:mx-auto lg:flex lg:items-center lg:gap-8">
            <h1 className="text-3xl font-bold md:px-4 md:text-center md:text-6xl lg:flex-1 lg:text-left">
              Laundry & dry cleaning with 24h delivery in
              <br />
              <span className="text-brand-main">Vietnam</span>
            </h1>
            <div className="relative mx-auto mt-16 hidden h-96 w-96 md:block lg:mt-0 lg:flex-1">
              <Image src={clothsOne.src} alt="Cloths" fill />
            </div>
          </div>
        </section>
        <section className="relative py-14 md:py-16">
          <div className="px-4 text-center">
            <h1 className="text-3xl font-bold md:px-4 md:text-4xl">
              We collect, clean, and deliver
              <br />
              your laundry and dry cleaning.
            </h1>
            <div className="mt-14 inline-flex flex-col items-start gap-6 md:mt-16 lg:flex-row">
              {LANDING_KEY_ITEMS.map((item) => (
                <div
                  className="flex w-full items-center gap-4 font-bold md:text-lg"
                  key={item.src}
                >
                  <div className="relative h-12 w-12">
                    <Image src={item.src} alt={item.alt} fill />
                  </div>
                  <span className="lg:whitespace-nowrap">{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
