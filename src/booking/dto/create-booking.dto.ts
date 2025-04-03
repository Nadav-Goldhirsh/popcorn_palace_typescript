import { IsInt, IsString, IsUUID, IsNotEmpty } from 'class-validator';

export class CreateBookingDto {
  @IsInt()
  @IsNotEmpty()
  showtimeId: number;

  @IsString()
  @IsNotEmpty()
  seat: string;

  @IsUUID()
  @IsNotEmpty()
  userId: string;
}
