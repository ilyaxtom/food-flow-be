import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Recipe } from "typeorm/entities/Recipe";
import { ICreateRecipe } from "recipes/types/CreateRecipe.types";
import { IUpdateRecipe } from "recipes/types/UpdateRecipe.types";

@Injectable()
export class RecipesService {
  constructor(
    @InjectRepository(Recipe) private recipesRepository: Repository<Recipe>,
  ) {}

  async findAll() {
    return await this.recipesRepository.find();
  }

  async findById(id: string) {
    const recipe = await this.recipesRepository.findOne({ where: { id } });

    if (!recipe) {
      throw new NotFoundException();
    }

    return recipe;
  }

  async create(recipe: ICreateRecipe) {
    const newRecipe = this.recipesRepository.create(recipe);

    return await this.recipesRepository.save(newRecipe);
  }

  async editRecipe(id: string, recipeDto: IUpdateRecipe) {
    return await this.recipesRepository.update(id, recipeDto);
  }

  async patchRecipe(id: string, recipeDto: IUpdateRecipe) {
    return await this.recipesRepository.update(id, recipeDto);
  }

  async deleteRecipe(id: string) {
    const deleteResult = await this.recipesRepository.delete(id);

    if (!deleteResult.affected) {
      throw new NotFoundException("No Recipe found to delete");
    }

    return "Recipe was deleted";
  }
}
