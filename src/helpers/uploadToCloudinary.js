import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_KI_CHAVI,
  api_secret: process.env.CLOUDINARY_KISI_KO_BATANA_MAT,
});

export const uploadToCloudinary = async (
  localFilePath,
  folder = 'hospitalImages'
) => {
  try {
    if (!localFilePath) throw new Error('File path is required');

    const result = await cloudinary.uploader.upload(localFilePath, {
      folder,
      resource_type: 'auto',
    });
    return result.secure_url;
  } catch (error) {
    throw error;
  } finally {
    try {
      if (fs.existsSync(localFilePath)) {
        fs.unlinkSync(localFilePath);
      }
    } catch (fsError) {
      throw new Error(`File delete error: ${fsError}`);
    }
  }
};
