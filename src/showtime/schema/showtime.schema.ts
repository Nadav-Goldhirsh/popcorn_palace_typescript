import { Movie } from "src/movie/schema/movie.schema";
import { Entity, PrimaryGeneratedColumn, OneToOne, Column, JoinColumn } from "typeorm";

@Entity({name: "showtimes"})
export class Showtime {
    @PrimaryGeneratedColumn({name: "id"})
    id: number;

    @OneToOne((type) => Movie, (movie) => movie.id)
    @JoinColumn({name: "movie_id"})
    movieId: number;

    @Column({ name: "theater" })
    theater: string;

    @Column({ name: "start_time", type: "timestamp with time zone" })
    startTime: string;

    @Column({ name: "end_time", type: "timestamp with time zone" })
    endTime: string;

    @Column({ name: "price", type: "float" })
    price: number;
}
