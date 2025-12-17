import { IsNotEmpty, IsOptional, MaxLength } from "class-validator";
import { Expose } from "class-transformer";

export class CookingStepDto {
  @Expose()
  @IsNotEmpty()
  @MaxLength(50)
  title: string;

  @Expose()
  @IsNotEmpty()
  description: string;

  @Expose()
  @IsOptional()
  image_url: string;
}
