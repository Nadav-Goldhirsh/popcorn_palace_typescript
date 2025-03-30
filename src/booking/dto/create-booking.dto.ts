import { IsInt, IsString } from 'class-validator';

export class CreateBookingDto {
  @IsInt()
  showtimeId: number;

  @IsString()
  seat: string;
}
