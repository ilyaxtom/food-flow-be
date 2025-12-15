import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "recipes" })
export class Recipe {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;
}
