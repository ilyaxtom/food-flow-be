import { IsEnum, IsOptional } from "class-validator";
import { Order, PageOptionsDto } from "shared/dto/page-options.dto";

export type RecipeSortableFields =
  | "title"
  | "cooking_time"
  | "difficulty_level"
  | "created_at";

export const RECIPE_SORTABLE_FIELDS = [
  "title",
  "cooking_time",
  "difficulty_level",
  "created_at",
] as const;

export class RecipePageOptionsDto extends PageOptionsDto {
  @IsOptional()
  sortBy: RecipeSortableFields = "created_at";

  @IsOptional()
  @IsEnum(Order)
  order: Order = Order.DESC;
}
