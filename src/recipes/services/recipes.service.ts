import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { PageDto } from "shared/dto/page.dto";
import { PageMetaDto } from "shared/dto/page-meta.dto";
import { Recipe } from "recipes/entities/Recipe";
import { CreateRecipeDto } from "recipes/dto/create-recipe.dto";
import { UpdateRecipeDto } from "recipes/dto/update-recipe.dto";
import { PatchRecipeDto } from "recipes/dto/patch-recipe.dto";
import {
  RECIPE_SORTABLE_FIELDS,
  RecipePageOptionsDto,
} from "recipes/dto/recipe-page-options.dto";

@Injectable()
export class RecipesService {
  constructor(
    @InjectRepository(Recipe) private recipesRepository: Repository<Recipe>,
  ) {}

  async findAll(pageOptionsDto: RecipePageOptionsDto) {
    const { page, limit, sortBy, order } = pageOptionsDto;

    const sortField = RECIPE_SORTABLE_FIELDS.includes(sortBy)
      ? sortBy
      : "created_at";

    const [items, itemsCount] = await this.recipesRepository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
      order: {
        [sortField]: order,
      },
    });

    const pageMeta = new PageMetaDto({ pageOptionsDto, itemsCount });

    if (page > pageMeta.pageCount) {
      throw new BadRequestException(
        "Page number exceeded total pages available",
      );
    }

    return new PageDto(items, pageMeta);
  }

  async findOne(id: string) {
    const recipe = await this.recipesRepository.findOne({ where: { id } });

    if (!recipe) {
      throw new NotFoundException(`Recipe with ID ${id} not found`);
    }

    return recipe;
  }

  async create(recipe: CreateRecipeDto) {
    const newRecipe = this.recipesRepository.create(recipe);

    return await this.recipesRepository.save(newRecipe);
  }

  async update(id: string, recipeDto: UpdateRecipeDto) {
    const recipe = await this.recipesRepository.preload({
      id,
      ...recipeDto,
    });

    if (!recipe) {
      throw new NotFoundException(`Recipe with ID ${id} not found`);
    }

    return await this.recipesRepository.save(recipe);
  }

  async partialUpdate(id: string, recipeDto: PatchRecipeDto) {
    const recipe = await this.recipesRepository.preload({
      id,
      ...recipeDto,
    });

    if (!recipe) {
      throw new NotFoundException(`Recipe with ID ${id} not found`);
    }

    return await this.recipesRepository.save(recipe);
  }

  async remove(id: string) {
    const deleteResult = await this.recipesRepository.delete(id);

    if (!deleteResult.affected) {
      throw new NotFoundException(`Recipe with ID ${id} not found`);
    }

    return "Recipe was deleted";
  }
}
