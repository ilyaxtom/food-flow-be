import { IsNotEmpty, MaxLength } from "class-validator";

export class CreateRecipeDto {
  @IsNotEmpty()
  @MaxLength(50)
  title: string;

  @IsNotEmpty()
  @MaxLength(255)
  description: string;
}
