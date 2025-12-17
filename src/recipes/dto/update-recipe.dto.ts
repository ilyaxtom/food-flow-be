import {
  IsNotEmpty,
  IsNumber,
  MaxLength,
  Min,
  Max,
  ArrayNotEmpty,
  ValidateNested,
  IsInt,
} from "class-validator";
import { CookingStepDto } from "./cooking-step.dto";
import { Transform, Type } from "class-transformer";

export class UpdateRecipeDto {
  @IsNotEmpty()
  @MaxLength(50)
  title: string;

  @IsNotEmpty()
  @MaxLength(255)
  subtitle: string;

  @Type(() => Number)
  @IsInt()
  @Min(1)
  cooking_time: number;

  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(5)
  difficulty_level: number;

  @Transform(({ value }) => JSON.parse(value))
  @Type(() => CookingStepDto)
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  cooking: CookingStepDto[];
}
