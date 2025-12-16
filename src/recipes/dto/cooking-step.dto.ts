import { IsNotEmpty, IsOptional, MaxLength } from "class-validator";

export class CookingStepDto {
  @IsNotEmpty()
  @MaxLength(50)
  title: string;

  @IsNotEmpty()
  description: string;

  @IsOptional()
  image_url: string;
}
