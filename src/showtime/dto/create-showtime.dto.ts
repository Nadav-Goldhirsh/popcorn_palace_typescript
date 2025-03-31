import { Expose, Transform } from 'class-transformer';
import { IsInt, IsNumber, IsString, IsDateString } from 'class-validator';

export class CreateShowtimeDto {
  @IsInt()
  @Expose()
  movieId: number;

  @IsString()
  @Expose()
  theater: string;

  @IsDateString()
  @Expose()
  startTime: string;

  @IsDateString()
  @Expose()
  endTime: string;

  @IsNumber()
  @Expose()
  price: number;
}
