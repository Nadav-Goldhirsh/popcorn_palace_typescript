import { Expose } from 'class-transformer';
import { IsInt, IsString } from 'class-validator';

export class CreateBookingDto {
  @IsInt()
  @Expose()
  showtimeId: number;

  @IsString()
  @Expose()
  seat: string;
}
