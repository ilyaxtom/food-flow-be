import {
  IsNotEmpty,
  IsNumber,
  MaxLength,
  Min,
  Max,
  ArrayNotEmpty,
  ValidateNested,
} from "class-validator";
import { CookingStepDto } from "./cooking-step.dto";
import { Type } from "class-transformer";

export class UpdateRecipeDto {
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
