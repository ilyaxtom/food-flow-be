import {
  ArrayNotEmpty,
  IsNotEmpty,
  IsNumber,
  Max,
  MaxLength,
  Min,
  ValidateNested,
} from "class-validator";
import { Type } from "class-transformer";
import { CookingStepDto } from "./cooking-step.dto";

export class CreateRecipeDto {
  @IsNotEmpty()
  @MaxLength(50)
  title: string;

  @IsNotEmpty()
  @MaxLength(255)
  subtitle: string;

  @IsNotEmpty()
  image_url: string;

  @IsNumber()
  @Min(1)
  cooking_time: number;

  @IsNumber()
  @Min(1)
  @Max(5)
  difficulty_level: number;

  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => CookingStepDto)
  cooking: CookingStepDto[];
}
