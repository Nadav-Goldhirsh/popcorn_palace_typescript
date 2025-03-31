import { Inject, Injectable } from '@nestjs/common';
import { CreateShowtimeDto } from './dto/create-showtime.dto';
import { Repository } from 'typeorm';
import { Showtime } from './schema/showtime.schema';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ShowtimeService {
  constructor(@InjectRepository(Showtime) private readonly showtimeRepository: Repository<Showtime>) { }

  create(showtimeData: CreateShowtimeDto) {
    return this.showtimeRepository.save(showtimeData)
  }

  findAll() {
    return this.showtimeRepository.find({loadRelationIds: true})
  }

  findOne(id: number) {
    return this.showtimeRepository.findOneBy({ id })
  }
  deleteById(id: number) {
    return this.showtimeRepository.delete({ id })
  }
}
