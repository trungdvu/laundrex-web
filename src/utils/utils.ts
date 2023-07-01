import { S3_BUCKET_HOST } from '@/constants/constants';

export function capitalizeFirstLetter(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export async function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(() => resolve(true), ms));
}

export function getImageUrl(s3ObjectKey: string) {
  return `${S3_BUCKET_HOST}/${s3ObjectKey}`;
}
