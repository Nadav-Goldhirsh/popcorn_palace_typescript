import { Inject, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateBookingDto } from './dto/create-booking.dto';
import { Repository } from 'typeorm';
import { Booking } from './schema/booking.schema';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class BookingService {
  constructor(@InjectRepository(Booking) private bookingRepository: Repository<Booking>) { 
  }

  create(bookingData: CreateBookingDto) {
    try {
    return this.bookingRepository.save(bookingData)
    } catch(error) {
      throw new InternalServerErrorException("You cant double book")
    }
  }

  findAll() {
    return this.bookingRepository.find({
      where: { deleted: false },
      loadRelationIds: true,
    });
  }
  
}
