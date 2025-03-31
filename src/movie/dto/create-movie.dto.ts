import { Expose } from 'class-transformer';
import { IsString, IsNumber, IsInt } from 'class-validator';

export class CreateMovieDto {
  @IsString()
  @Expose()
  title: string;

  @IsString()
  @Expose()
  genre: string;

  @IsInt()
  @Expose()
  duration: number;

  @IsNumber()
  @Expose()
  rating: number;

  @IsInt()
  @Expose()
  releaseYear: number;
}
