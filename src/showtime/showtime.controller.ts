import { Body, Controller, Get, Post } from '@nestjs/common';
import { ShowtimeService } from './showtime.service';
import { CreateShowtimeDto } from './dto/create-showtime.dto';
import { Param } from '@nestjs/common'; 
import { Delete } from '@nestjs/common'; 


@Controller('showtimes')
export class ShowtimeController {
  constructor(private readonly showtimeService: ShowtimeService) {}

  @Post()
  create(@Body() createShowtimeDto: CreateShowtimeDto) {
    return this.showtimeService.create(createShowtimeDto);
  }

  @Get()
  findAll() {
    return this.showtimeService.findAll();
  }


@Get(':id')
findOne(@Param('id') id: string) {
  return this.showtimeService.findOne(Number(id));
}

@Delete(':id')
delete(@Param('id') id: string) {
  return this.showtimeService.deleteById(Number(id));
}

}
