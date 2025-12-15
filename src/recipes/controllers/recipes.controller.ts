import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Put,
} from "@nestjs/common";
import { RecipesService } from "recipes/services/recipes.service";
import { CreateRecipeDto } from "recipes/dtos/CreateRecipe.dto";
import { UpdateRecipeDto } from "recipes/dtos/UpdateRecipe.dto";

@Controller("recipes")
export class RecipesController {
  constructor(private readonly recipesService: RecipesService) {}

  @Get()
  getRecipes() {
    return this.recipesService.findAll();
  }

  @Get(":id")
  getRecipeById(@Param("id", ParseUUIDPipe) id: string) {
    return this.recipesService.findById(id);
  }

  @Post()
  createRecipe(@Body() createRecipeDto: CreateRecipeDto) {
    return this.recipesService.create(createRecipeDto);
  }

  @Put(":id")
  updateRecipe(
    @Param("id", ParseUUIDPipe) id: string,
    @Body() updateRecipeDto: UpdateRecipeDto,
  ) {
    return this.recipesService.editRecipe(id, updateRecipeDto);
  }

  @Patch(":id")
  patchRecipe(
    @Param("id", ParseUUIDPipe) id: string,
    @Body() patchRecipeDto: UpdateRecipeDto,
  ) {
    return this.recipesService.patchRecipe(id, patchRecipeDto);
  }

  @Delete(":id")
  deleteRecipe(@Param("id", ParseUUIDPipe) id: string) {
    return this.recipesService.deleteRecipe(id);
  }
}
