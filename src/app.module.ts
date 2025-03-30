import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MovieModule } from './movie/movie.module';
import { ShowtimeModule } from './showtime/showtime.module';
import { BookingModule } from './booking/booking.module';

@Module({
  imports: [MovieModule, ShowtimeModule, BookingModule], 
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
