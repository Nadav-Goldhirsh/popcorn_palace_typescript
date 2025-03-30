import { Test, TestingModule } from '@nestjs/testing';
import { MovieService } from './movie.service';
import { CreateMovieDto } from './dto/create-movie.dto';

describe('MovieService', () => {
  let service: MovieService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MovieService],
    }).compile();

    service = module.get<MovieService>(MovieService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should add a new movie', () => {
    const movie: CreateMovieDto = {
      title: 'Inception',
      genre: 'Sci-Fi',
      duration: 148,
      rating: 8.8,
      releaseYear: 2010,
    };

    const result = service.create(movie);

    expect(result).toHaveProperty('id');
    expect(result.title).toBe('Inception');
    expect(result.rating).toBe(8.8);
  });

  it('should return all movies', () => {
    const movie1: CreateMovieDto = {
      title: 'Inception',
      genre: 'Sci-Fi',
      duration: 148,
      rating: 8.8,
      releaseYear: 2010,
    };

    const movie2: CreateMovieDto = {
      title: 'The Matrix',
      genre: 'Action',
      duration: 136,
      rating: 8.7,
      releaseYear: 1999,
    };

    service.create(movie1);
    service.create(movie2);

    const movies = service.findAll();

    expect(movies.length).toBe(2);
    expect(movies[0].title).toBe('Inception');
    expect(movies[1].title).toBe('The Matrix');
  });
});
