import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { Repository } from 'typeorm';
import { Movie } from './schema/movie.schema';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class MovieService {
  constructor(@InjectRepository(Movie) private movieRepository: Repository<Movie>) { }

  async create(movieData: CreateMovieDto) {
    await this.movieRepository.save(movieData)
  }

  findAll() {
    return this.movieRepository.find()
  }

  updateByTitle(title: string, updatedData: Partial<CreateMovieDto>) {
    return this.movieRepository.update({ title }, updatedData)
  }

  deleteById(id: number) {
    return this.movieRepository.delete({ id })
  }
}
