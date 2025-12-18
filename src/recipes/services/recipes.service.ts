import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CloudinaryService } from "cloudinary/services/cloudinary.service";
import { nanoid } from "nanoid";
import { CreateRecipeDto } from "recipes/dto/create-recipe.dto";
import { PatchRecipeDto } from "recipes/dto/patch-recipe.dto";
import {
  RECIPE_SORTABLE_FIELDS,
  RecipePageOptionsDto,
} from "recipes/dto/recipe-page-options.dto";
import { UpdateRecipeDto } from "recipes/dto/update-recipe.dto";
import { Recipe } from "recipes/entities/Recipe";
import { PageMetaDto } from "shared/dto/page-meta.dto";
import { PageDto } from "shared/dto/page.dto";
import slugify from "slugify";
import { Repository } from "typeorm";

@Injectable()
export class RecipesService {
  constructor(
    @InjectRepository(Recipe) private recipesRepository: Repository<Recipe>,
    private cloudinaryService: CloudinaryService,
  ) {}

  private async replaceImage(recipe: Recipe, file: Express.Multer.File) {
    const upload = await this.cloudinaryService.uploadImage(file);
    const oldPublicId = recipe.image_public_id;

    Object.assign(recipe, upload);

    await this.recipesRepository.save(recipe);
    await this.cloudinaryService.deleteImage(oldPublicId);
  }

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

  async findOne(slug: string) {
    const recipe = await this.recipesRepository.findOne({ where: { slug } });

    if (!recipe) {
      throw new NotFoundException(`Recipe with slug ${slug} not found`);
    }

    return recipe;
  }

  async create(recipe: CreateRecipeDto, recipeCover: Express.Multer.File) {
    if (!recipeCover) {
      throw new BadRequestException("Recipe cover image is required");
    }

    const imageUpload = await this.cloudinaryService.uploadImage(recipeCover);

    const baseSlug = slugify(recipe.title, { lower: true, strict: true });

    const newRecipe = this.recipesRepository.create({
      ...recipe,
      ...imageUpload,
      slug: `${baseSlug}-${nanoid(6)}`,
    });

    return await this.recipesRepository.save(newRecipe);
  }

  async update(
    slug: string,
    recipeDto: UpdateRecipeDto,
    recipeCover: Express.Multer.File,
  ) {
    if (!recipeCover) {
      throw new BadRequestException("Recipe cover image is required");
    }

    const recipe = await this.recipesRepository.findOneBy({ slug });

    if (!recipe) {
      throw new NotFoundException(`Recipe with slug ${slug} not found`);
    }

    await this.replaceImage(recipe, recipeCover);

    Object.assign(recipe, {
      ...recipeDto,
    });

    return await this.recipesRepository.save(recipe);
  }

  async partialUpdate(
    slug: string,
    recipeDto: PatchRecipeDto,
    recipeCover: Express.Multer.File,
  ) {
    const recipe = await this.recipesRepository.findOneBy({ slug });

    if (!recipe) {
      throw new NotFoundException(`Recipe with slug ${slug} not found`);
    }

    const updates: Partial<Recipe> = { ...recipeDto };

    if (recipeCover) {
      await this.replaceImage(recipe, recipeCover);
    }

    Object.assign(recipe, updates);

    await this.recipesRepository.save(recipe);
  }

  async remove(slug: string) {
    const recipe = await this.recipesRepository.findOneBy({ slug });

    if (!recipe) {
      throw new NotFoundException(`Recipe with slug ${slug} not found`);
    }

    await this.cloudinaryService.deleteImage(recipe.image_public_id);

    await this.recipesRepository.delete(recipe.id);

    return "Recipe was deleted";
  }
}
