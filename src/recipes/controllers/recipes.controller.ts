import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
  UploadedFile,
  UseInterceptors,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import type { Express } from "express";
import { CreateRecipeDto } from "recipes/dto/create-recipe.dto";
import { PatchRecipeDto } from "recipes/dto/patch-recipe.dto";
import { RecipePageOptionsDto } from "recipes/dto/recipe-page-options.dto";
import { UpdateRecipeDto } from "recipes/dto/update-recipe.dto";
import { ValidateImagePipe } from "recipes/pipes/validate-image.pipe";
import { RecipesService } from "recipes/services/recipes.service";

@Controller("recipes")
export class RecipesController {
  constructor(private readonly recipesService: RecipesService) {}

  @Get()
  findAll(@Query() paginationDto: RecipePageOptionsDto) {
    return this.recipesService.findAll(paginationDto);
  }

  @Get(":slug")
  findOne(@Param("slug") slug: string) {
    return this.recipesService.findOne(slug);
  }

  @Post()
  @UseInterceptors(
    FileInterceptor("recipe_cover", { limits: { fileSize: 5 * 1024 * 1024 } }),
  )
  create(
    @UploadedFile(ValidateImagePipe) file: Express.Multer.File,
    @Body() createRecipeDto: CreateRecipeDto,
  ) {
    return this.recipesService.create(createRecipeDto, file);
  }

  @Put(":slug")
  @UseInterceptors(
    FileInterceptor("recipe_cover", { limits: { fileSize: 5 * 1024 * 1024 } }),
  )
  update(
    @Param("slug") slug: string,
    @UploadedFile(ValidateImagePipe) file: Express.Multer.File,
    @Body() updateRecipeDto: UpdateRecipeDto,
  ) {
    return this.recipesService.update(slug, updateRecipeDto, file);
  }

  @Patch(":slug")
  @UseInterceptors(
    FileInterceptor("recipe_cover", { limits: { fileSize: 5 * 1024 * 1024 } }),
  )
  partialUpdate(
    @Param("slug") slug: string,
    @UploadedFile() file: Express.Multer.File,
    @Body() patchRecipeDto: PatchRecipeDto,
  ) {
    return this.recipesService.partialUpdate(slug, patchRecipeDto, file);
  }

  @Delete(":slug")
  remove(@Param("slug") slug: string) {
    return this.recipesService.remove(slug);
  }
}
