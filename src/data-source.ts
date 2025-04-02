import { DataSource } from 'typeorm';
import { Movie } from './movie/schema/movie.schema';
import { Showtime } from './showtime/schema/showtime.schema';
import { Booking } from './booking/schema/booking.schema';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'popcorn',
  entities: [Movie, Showtime, Booking],
  synchronize: true, 
});
