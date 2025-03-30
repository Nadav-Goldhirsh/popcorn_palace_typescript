import { IsString, IsNumber, IsInt } from 'class-validator';

export class CreateMovieDto {
  @IsString()
  title: string;

  @IsString()
  genre: string;

  @IsInt()
  duration: number;

  @IsNumber()
  rating: number;

  @IsInt()
  releaseYear: number;
}
