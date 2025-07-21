import { Injectable } from '@nestjs/common';
import { v2 as cloudinary } from 'cloudinary';
import { ConfigService } from '@nestjs/config';
import {UploadedFileType} from 'types'


@Injectable()
export class CloudinaryService {
  constructor(private configService: ConfigService) {
    cloudinary.config({
      cloud_name: this.configService.get('CLOUDINARY_CLOUD_NAME'),
      api_key: this.configService.get('CLOUDINARY_API_KEY'),
      api_secret: this.configService.get('CLOUDINARY_API_SECRET'),
    });
  }

  async uploadImage(file:UploadedFileType): Promise<string> {
    return new Promise((resolve, reject) => {
      
      cloudinary.uploader.upload_stream(
        { resource_type: 'auto' },
        (error, result) => {
          if (error) return reject(error);
          resolve(result.secure_url); // Return the image URL
        },
      ).end(file.buffer); // Use file.buffer for in-memory uploads
    });
  }

  async deleteFile(publicId: string) {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.destroy(publicId, { resource_type: 'video' }, (error, result) => {
      if (error) return reject(error);
      resolve(result);
    });
  });
}

  extractCloudinaryPublicId(url: string): string | null {
    try {
      const parts = url.split('/');
      const fileName = parts[parts.length - 1];
      const folder = parts[parts.length - 2];
      const nameWithoutExt = fileName.split('.')[0];
      return `${folder}/${nameWithoutExt}`;
    } catch (e) {
      console.error('Failed to extract Cloudinary public ID:', e);
      return null;
    }
  }
}
