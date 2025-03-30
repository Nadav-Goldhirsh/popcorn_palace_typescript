import { Injectable } from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';

@Injectable()
export class MovieService {
  private movies = [];
  private nextId = 1;

  create(movieData: CreateMovieDto) {
    const newMovie = {
      id: this.nextId++,
      ...movieData,
    };
    this.movies.push(newMovie);
    return newMovie;
  }

  findAll() {
    return this.movies;
  }
  updateByTitle(title: string, updatedData: Partial<CreateMovieDto>) {
    const movie = this.movies.find((m) => m.title === title);
    if (!movie) {
      return { error: 'Movie not found' };
    }
  
    Object.assign(movie, updatedData);
    return movie;
  }
  deleteById(id: number) {
    const index = this.movies.findIndex((m) => m.id === id);
    if (index === -1) {
      return { error: 'Movie not found' };
    }
  
    const deleted = this.movies.splice(index, 1);
    return { message: 'Movie deleted', movie: deleted[0] };
  }
}
