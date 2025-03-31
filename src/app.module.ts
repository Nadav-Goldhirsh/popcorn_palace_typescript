import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MovieModule } from './movie/movie.module';
import { ShowtimeModule } from './showtime/showtime.module';
import { BookingModule } from './booking/booking.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Movie } from './movie/schema/movie.schema';
import { Showtime } from './showtime/schema/showtime.schema';
import { Booking } from './booking/schema/booking.schema';
import { postgresConfig } from './config/postgres.config';

@Module({
  imports: [TypeOrmModule.forRoot({
    ...postgresConfig,
    entities: [Movie, Showtime, Booking]
  }) ,MovieModule, ShowtimeModule, BookingModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
