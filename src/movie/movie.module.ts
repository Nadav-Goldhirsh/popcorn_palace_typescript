import { Module } from '@nestjs/common';
import { MovieController } from './movie.controller';
import { MovieService } from './movie.service';
import { Movie } from './schema/movie.schema';
import { Showtime } from 'src/showtime/schema/showtime.schema';
import { Booking } from 'src/booking/schema/booking.schema';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Movie, Showtime, Booking])],
  controllers: [MovieController],
  providers: [MovieService],
})
export class MovieModule {}
