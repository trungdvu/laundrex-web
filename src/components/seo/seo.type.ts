import { defaultMetaData } from './seo.config';

export type SeoProps = {
  date?: string;
  templateTitle?: string;
} & Partial<typeof defaultMetaData>;
