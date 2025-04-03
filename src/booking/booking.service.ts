import { Injectable, BadRequestException } from '@nestjs/common';
import { CreateBookingDto } from './dto/create-booking.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Booking } from './schema/booking.schema';

@Injectable()
export class BookingService {
  constructor(
    @InjectRepository(Booking)
    private readonly bookingRepository: Repository<Booking>,
  ) {}

  async create(bookingData: CreateBookingDto) {
    const { seat, showtimeId, userId } = bookingData;

    // Check if the seat is already booked for the same showtime
    const existingBooking = await this.bookingRepository.findOne({
      where: {
        seat,
        showtimeId,
        deleted: false,
      },
    });

    if (existingBooking) {
      throw new BadRequestException(
        'This seat is already booked for the selected showtime.',
      );
    }

    // Save new booking
    try {
      const booking = this.bookingRepository.create({
        seat,
        showtimeId,
        userId,
        deleted: false,
      });
      return await this.bookingRepository.save(booking);
    } catch (error) {
      throw new BadRequestException('Failed to create booking.');
    }
  }

  findAll() {
    return this.bookingRepository.find({
      where: { deleted: false },
      loadRelationIds: true,
    });
  }
}
