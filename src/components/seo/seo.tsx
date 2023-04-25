import Head from 'next/head';
import { useRouter } from 'next/router';
import { defaultMetaData } from './seo.config';

export type SeoProps = {
  date?: string;
  templateTitle?: string;
} & Partial<typeof defaultMetaData>;

export default function Seo(props: SeoProps) {
  const router = useRouter();
  const meta = {
    ...defaultMetaData,
    ...props,
  };

  meta.title = props.templateTitle
    ? `${props.templateTitle} | ${meta.siteName}`
    : meta.title;

  return (
    <Head>
      <title>{meta.title}</title>
      <meta name="robots" content={meta.robots} />
      <meta name="description" content={meta.description} />
      <meta property="og:url" content={`${meta.url}${router.asPath}`} />
      <link rel="canonical" href={`${meta.url}${router.asPath}`} />
    </Head>
  );
}
