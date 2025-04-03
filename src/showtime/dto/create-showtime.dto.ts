import {
  IsInt,
  IsNumber,
  IsString,
  IsDateString,
  IsNotEmpty,
} from 'class-validator';

export class CreateShowtimeDto {
  @IsInt()
  @IsNotEmpty()
  movieId: number;

  @IsString()
  @IsNotEmpty()
  theater: string;

  @IsDateString()
  @IsNotEmpty()
  startTime: string;

  @IsDateString()
  @IsNotEmpty()
  endTime: string;

  @IsNumber()
  @IsNotEmpty()
  price: number;
}
