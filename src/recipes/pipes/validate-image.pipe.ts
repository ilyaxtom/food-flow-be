import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from "@nestjs/common";

@Injectable()
export class ValidateImagePipe implements PipeTransform {
  transform(file: Express.Multer.File, metadata: ArgumentMetadata) {
    if (!file.mimetype.startsWith("image/")) {
      throw new BadRequestException("Only image files allowed");
    }

    return file;
  }
}
