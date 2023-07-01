import axios from 'axios';
import laundrexApi from './laundrex-api';

const fileUploadService = Object.freeze({
  async getPresignedUrl(filename: string) {
    return laundrexApi.post('/file-uploads/presigned-url', { filename });
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
