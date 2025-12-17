import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { v2 as cloudinary } from "cloudinary";
import * as streamifier from "streamifier";

@Injectable()
export class CloudinaryService {
  async uploadImage(file: Express.Multer.File): Promise<string> {
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
          if (error) {
            reject(error);
          }

          if (!result || !result.secure_url) {
            throw new InternalServerErrorException("Failed to upload image");
          }

          resolve(result.secure_url);
        },
      );

      streamifier.createReadStream(file.buffer).pipe(uploadStream);
    });
  }
}
