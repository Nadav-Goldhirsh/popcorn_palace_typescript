import { Module } from '@nestjs/common';
import { ShowtimeController } from './showtime.controller';
import { ShowtimeService } from './showtime.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Showtime } from './schema/showtime.schema';
import { Booking } from 'src/booking/schema/booking.schema';

@Module({
  imports: [TypeOrmModule.forFeature([Showtime, Booking])],
  controllers: [ShowtimeController],
  providers: [ShowtimeService],
})
export class ShowtimeModule {}
