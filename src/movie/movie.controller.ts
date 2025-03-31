import { Body, Controller, Get, Post } from '@nestjs/common';
import { MovieService } from './movie.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { Param, Patch } from '@nestjs/common';
import { Delete } from '@nestjs/common';

@Controller('movies')
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @Post()
  create(@Body() createMovieDto: CreateMovieDto) {
    return this.movieService.create(createMovieDto);
  }

  @Get('all')
  findAll() {
    return this.movieService.findAll();
  }

  @Patch('update/:title')
  update(
    @Param('title') title: string,
    @Body() updateDto: Partial<CreateMovieDto>,
  ) {
    return this.movieService.updateByTitle(title, updateDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.movieService.deleteById(Number(id));
  }
}
