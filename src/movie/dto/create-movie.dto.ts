import {
  IsString,
  IsNumber,
  IsInt,
  IsPositive,
  Min,
  Max,
  IsNotEmpty,
} from 'class-validator';

export class CreateMovieDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  genre: string;

  @IsInt()
  @IsPositive({ message: 'Duration must be a positive integer' })
  @IsNotEmpty()
  duration: number;

  @IsNumber()
  @Min(0)
  @Max(10)
  @IsNotEmpty()
  rating: number;

  @IsInt()
  @IsNotEmpty()
  @Max(2025)
  releaseYear: number;
}
