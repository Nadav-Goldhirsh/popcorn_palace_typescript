import { Injectable } from '@nestjs/common';
import { CreateShowtimeDto } from './dto/create-showtime.dto';
import { Repository } from 'typeorm';
import { Showtime } from './schema/showtime.schema';
import { InjectRepository } from '@nestjs/typeorm';
import { Booking } from 'src/booking/schema/booking.schema';
import { BadRequestException } from '@nestjs/common';

@Injectable()
export class ShowtimeService {
  constructor(
    @InjectRepository(Showtime)
    private readonly showtimeRepository: Repository<Showtime>,
    @InjectRepository(Booking) private bookingRepository: Repository<Booking>,
  ) {}

  async create(showtimeData: CreateShowtimeDto) {
    const { theater, startTime, endTime } = showtimeData;
    if (new Date(showtimeData.endTime) <= new Date(showtimeData.startTime)) {
      throw new BadRequestException('End time must be after start time');
    }

    // Find existing (non-deleted) showtimes in the same theater
    const existingShowtimes = await this.showtimeRepository.find({
      where: {
        theater,
        deleted: false,
      },
    });

    // Check for overlap
    const hasOverlap = existingShowtimes.some((existing) => {
      const existingStart = new Date(existing.startTime).getTime();
      const existingEnd = new Date(existing.endTime).getTime();
      const newStart = new Date(startTime).getTime();
      const newEnd = new Date(endTime).getTime();

      // Overlap condition
      return newStart < existingEnd && existingStart < newEnd;
    });

    if (hasOverlap) {
      throw new BadRequestException(
        'This theater already has a showtime scheduled during the selected time range.',
      );
    }

    // Save showtime if no overlap
    return this.showtimeRepository.save(showtimeData);
  }

  findAll() {
    return this.showtimeRepository.find({
      where: { deleted: false },
    });
  }

  findOne(id: number) {
    return this.showtimeRepository.findOne({
      where: {
        id,
        deleted: false,
      },
    });
  }

  async deleteById(id: number) {
    await this.showtimeRepository.update({ id }, { deleted: true });

    await this.bookingRepository.update({ showtimeId: id }, { deleted: true });

    return { message: `Showtime ${id} and related bookings deleted` };
  }
}
