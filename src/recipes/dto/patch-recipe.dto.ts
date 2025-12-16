import { PartialType } from "@nestjs/swagger";
import { UpdateRecipeDto } from "./update-recipe.dto";

export class PatchRecipeDto extends PartialType(UpdateRecipeDto) {}
