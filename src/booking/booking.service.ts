import { Injectable } from '@nestjs/common';
import { CreateBookingDto } from './dto/create-booking.dto';

@Injectable()
export class BookingService {
  private bookings = [];
  private nextId = 1;

  create(bookingData: CreateBookingDto) {
    // Check if seat is already booked for this showtime
    const alreadyBooked = this.bookings.find(
      (b) =>
        b.showtimeId === bookingData.showtimeId &&
        b.seat.toLowerCase() === bookingData.seat.toLowerCase(),
    );

    if (alreadyBooked) {
      return { error: 'Seat already booked for this showtime.' };
    }

    const newBooking = {
      id: this.nextId++,
      ...bookingData,
    };

    this.bookings.push(newBooking);
    return newBooking;
  }

  findAll() {
    return this.bookings;
  }
}
