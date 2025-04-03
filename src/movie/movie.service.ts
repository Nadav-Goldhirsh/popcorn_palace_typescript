import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { Repository } from 'typeorm';
import { Movie } from './schema/movie.schema';
import { Showtime } from '../showtime/schema/showtime.schema';
import { Booking } from '../booking/schema/booking.schema';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class MovieService {
  constructor(
    @InjectRepository(Movie) private movieRepository: Repository<Movie>,
    @InjectRepository(Showtime)
    private showtimeRepository: Repository<Showtime>,
    @InjectRepository(Booking) private bookingRepository: Repository<Booking>,
  ) {}

  async create(movieData: CreateMovieDto): Promise<Movie> {
    const savedMovie = await this.movieRepository.save(movieData);
    return savedMovie;
  }

  findAll() {
    return this.movieRepository.find({ where: { deleted: false } });
  }

  async updateByTitle(title: string, updateDto: Partial<CreateMovieDto>) {
    const movie = await this.movieRepository.findOne({
      where: { title, deleted: false },
    });

    if (!movie) {
      throw new NotFoundException(`Movie with title '${title}' not found`);
    }

    Object.assign(movie, updateDto);
    return await this.movieRepository.save(movie);
  }

  async deleteById(id: number) {
    const movie = await this.movieRepository.findOne({ where: { id } });
    if (!movie) throw new BadRequestException('Movie not found');

    // Mark movie as deleted
    movie.deleted = true;
    await this.movieRepository.save(movie);

    // Get related showtimes
    const showtimes = await this.showtimeRepository.find({
      where: { movieId: id, deleted: false },
    });

    for (const showtime of showtimes) {
      showtime.deleted = true;
      await this.showtimeRepository.save(showtime);

      // Mark related bookings as deleted
      const bookings = await this.bookingRepository.find({
        where: { showtimeId: showtime.id, deleted: false },
      });
      for (const booking of bookings) {
        booking.deleted = true;
        await this.bookingRepository.save(booking);
      }
    }

    return {
      message: `Movie ${id} and related showtimes and bookings logically deleted.`,
    };
  }
}
