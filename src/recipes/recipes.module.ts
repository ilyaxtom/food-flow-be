import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Recipe } from "typeorm/entities/Recipe";
import { RecipesController } from "./controllers/recipes.controller";
import { RecipesService } from "./services/recipes.service";

@Module({
  imports: [TypeOrmModule.forFeature([Recipe])],
  controllers: [RecipesController],
  providers: [RecipesService],
})
export class RecipesModule {}
