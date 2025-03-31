import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({name: "movies"})
export class Movie {
  @PrimaryGeneratedColumn({name: "id"})
  id: number
    
  @Column({name: 'title', type: "varchar"})
  title: string;
  
  @Column({name: 'genre', type: "varchar"})
  genre: string;

  @Column({name: 'duration', type: "float"})
  duration: number;

  @Column({name: 'rating', type: "float"})
  rating: number;

  @Column({name: 'release_year', type: "int"})
  releaseYear: number;
}
