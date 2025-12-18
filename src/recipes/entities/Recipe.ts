import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { CookingStepDto } from "recipes/dto/cooking-step.dto";

@Entity({ name: "recipes" })
export class Recipe {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  title: string;

  @Column()
  subtitle: string;

  @Column()
  image_url: string;

  @Column()
  image_public_id: string;

  @Column({ type: "int" })
  cooking_time: number;

  @Column({ type: "int" })
  difficulty_level: number;

  @Column({ unique: true })
  slug: string;

  @Column({ type: "jsonb" })
  cooking: CookingStepDto[];

  @Column({ type: "timestamptz", default: () => "CURRENT_TIMESTAMPTZ" })
  created_at: Date;
}
