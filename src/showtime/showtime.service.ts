import { Injectable } from '@nestjs/common';
import { CreateShowtimeDto } from './dto/create-showtime.dto';

@Injectable()
export class ShowtimeService {
  private showtimes = [];
  private nextId = 1;

  create(showtimeData: CreateShowtimeDto) {
    // Check for overlapping showtimes in the same theater
    const conflict = this.showtimes.find((s) => {
      return (
        s.theater === showtimeData.theater &&
        this.overlaps(showtimeData.startTime, showtimeData.endTime, s.startTime, s.endTime)
      );
    });

    if (conflict) {
      return { error: 'Showtime conflicts with an existing showtime in this theater.' };
    }

    const newShowtime = {
      id: this.nextId++,
      ...showtimeData,
    };

    this.showtimes.push(newShowtime);
    return newShowtime;
  }

  findAll() {
    return this.showtimes;
  }

  private overlaps(start1: string, end1: string, start2: string, end2: string): boolean {
    const s1 = new Date(start1).getTime();
    const e1 = new Date(end1).getTime();
    const s2 = new Date(start2).getTime();
    const e2 = new Date(end2).getTime();

    return s1 < e2 && s2 < e1; // time windows overlap
  }
  findOne(id: number) {
    const showtime = this.showtimes.find((s) => s.id === id);
    if (!showtime) {
      return { error: 'Showtime not found' };
    }
    return showtime;
  }
  deleteById(id: number) {
    const index = this.showtimes.findIndex((s) => s.id === id);
    if (index === -1) {
      return { error: 'Showtime not found' };
    }
  
    const deleted = this.showtimes.splice(index, 1);
    return { message: 'Showtime deleted', showtime: deleted[0] };
  }
  
}
