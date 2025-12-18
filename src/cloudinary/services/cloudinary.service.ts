import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { v2 as cloudinary } from "cloudinary";
import * as streamifier from "streamifier";

interface CloudinaryUploadResult {
  image_url: string;
  image_public_id: string;
}

interface CloudinaryDeleteResult {
  result: string;
}

@Injectable()
export class CloudinaryService {
  async uploadImage(
    file: Express.Multer.File,
  ): Promise<CloudinaryUploadResult> {
    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: "recipes",
          quality: "80",
          fetch_format: "webp",
          width: "1280",
          crop: "scale",
        },
        (error, result) => {
          if (error || !result) {
            reject(new InternalServerErrorException("Failed to delete image"));
            return;
          }

          resolve({
            image_url: result.secure_url,
            image_public_id: result.public_id,
          });
        },
      );

      streamifier.createReadStream(file.buffer).pipe(uploadStream);
    });
  }

  async deleteImage(publicId: string) {
    return new Promise((resolve, reject) => {
      cloudinary.uploader.destroy(
        publicId,
        (err, result: CloudinaryDeleteResult) => {
          if (err || result.result !== "ok") {
            reject(new InternalServerErrorException("Failed to delete image"));
          }

          resolve(result);
        },
      );
    });
  }
}
