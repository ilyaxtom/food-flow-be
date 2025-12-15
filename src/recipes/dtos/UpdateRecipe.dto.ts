import { IsNotEmpty, MaxLength } from "class-validator";

export class UpdateRecipeDto {
  @IsNotEmpty()
  @MaxLength(50)
  title: string;

  @IsNotEmpty()
  @MaxLength(255)
  description: string;
}
