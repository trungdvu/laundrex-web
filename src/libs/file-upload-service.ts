import axios from 'axios';
import laundrexApi from './laundrex-api';

const fileUploadService = Object.freeze({
  async getPresignedUrl({
    filename,
    folder,
  }: {
    filename: string;
    folder?: 'avatars';
  }) {
    return laundrexApi.post('/file-uploads/presigned-url', {
      filename,
      folder: folder ?? undefined,
    });
  },

  async upload(presignedUrl: string, file: File) {
    return axios.put(presignedUrl, file, {
      headers: {
        'Content-Type': file.type,
      },
    });
  },
});

export default fileUploadService;
