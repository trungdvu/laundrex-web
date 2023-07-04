import Button from '@/components/buttons/button';
import Input from '@/components/inputs/input';
import Label from '@/components/inputs/label';
import Seo from '@/components/seo/seo';
import fileUploadService from '@/libs/file-upload-service';
import { useState } from 'react';

export default function Home() {
  const [key, setKey] = useState('');

  const handleDelete = async () => {
    const res = await fileUploadService.delete(key);
    console.log('🚀 ~ handleDelete ~ res:', res);
  };

  return (
    <>
      <Seo />
      <main className="px-10 py-24">
        <div className="flex w-2/3 flex-col gap-4">
          <Label>File key</Label>
          <Input
            value={key}
            onChange={(e) => setKey(e.currentTarget.value)}
            className="w-full"
          />
          <Button className="mt-4" onClick={handleDelete}>
            Delete
          </Button>
        </div>
        <div className="py-64">This is a fucking Laundry service</div>
      </main>
    </>
  );
}
