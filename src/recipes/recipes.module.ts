import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CloudinaryModule } from "cloudinary/cloudinary.module";
import { Recipe } from "recipes/entities/Recipe";
import { RecipesController } from "./controllers/recipes.controller";
import { RecipesService } from "./services/recipes.service";

@Module({
  imports: [TypeOrmModule.forFeature([Recipe]), CloudinaryModule],
  controllers: [RecipesController],
  providers: [RecipesService],
})
export class RecipesModule {}
