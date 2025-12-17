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
  Query,
  UploadedFile,
  UseInterceptors,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import type { Express } from "express";
import { RecipesService } from "recipes/services/recipes.service";
import { CreateRecipeDto } from "recipes/dto/create-recipe.dto";
import { UpdateRecipeDto } from "recipes/dto/update-recipe.dto";
import { PatchRecipeDto } from "recipes/dto/patch-recipe.dto";
import { RecipePageOptionsDto } from "recipes/dto/recipe-page-options.dto";
import { ValidateImagePipe } from "recipes/pipes/validate-image.pipe";

@Controller("recipes")
export class RecipesController {
  constructor(private readonly recipesService: RecipesService) {}

  @Get()
  findAll(@Query() paginationDto: RecipePageOptionsDto) {
    return this.recipesService.findAll(paginationDto);
  }

  @Get(":id")
  findOne(@Param("id", ParseUUIDPipe) id: string) {
    return this.recipesService.findOne(id);
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

  @Put(":id")
  @UseInterceptors(
    FileInterceptor("recipe_cover", { limits: { fileSize: 5 * 1024 * 1024 } }),
  )
  update(
    @Param("id", ParseUUIDPipe) id: string,
    @UploadedFile(ValidateImagePipe) file: Express.Multer.File,
    @Body() updateRecipeDto: UpdateRecipeDto,
  ) {
    return this.recipesService.update(id, updateRecipeDto, file);
  }

  @Patch(":id")
  @UseInterceptors(
    FileInterceptor("recipe_cover", { limits: { fileSize: 5 * 1024 * 1024 } }),
  )
  partialUpdate(
    @Param("id", ParseUUIDPipe) id: string,
    @UploadedFile() file: Express.Multer.File,
    @Body() patchRecipeDto: PatchRecipeDto,
  ) {
    return this.recipesService.partialUpdate(id, patchRecipeDto, file);
  }

  @Delete(":id")
  remove(@Param("id", ParseUUIDPipe) id: string) {
    return this.recipesService.remove(id);
  }
}
