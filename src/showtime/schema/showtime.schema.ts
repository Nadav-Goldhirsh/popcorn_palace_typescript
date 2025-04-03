import { Movie } from 'src/movie/schema/movie.schema';
import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  Column,
  JoinColumn,
} from 'typeorm';

@Entity({ name: 'showtimes' })
export class Showtime {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @ManyToOne(() => Movie, (movie) => movie.id)
  @JoinColumn({ name: 'movie_id' })
  movieId: number;

  @Column({ name: 'theater' })
  theater: string;

  @Column({ name: 'start_time', type: 'timestamp with time zone' })
  startTime: string;

  @Column({ name: 'end_time', type: 'timestamp with time zone' })
  endTime: string;

  @Column({ name: 'price', type: 'float' })
  price: number;

  @Column({ name: 'deleted', type: 'boolean', default: false })
  deleted: boolean;
}
