import { IsInt, IsNumber, IsString, IsDateString } from 'class-validator';

export class CreateShowtimeDto {
  @IsInt()
  movieId: number;

  @IsString()
  theater: string;

  @IsDateString()
  startTime: string;

  @IsDateString()
  endTime: string;

  @IsNumber()
  price: number;
}
