import { Showtime } from "src/showtime/schema/showtime.schema";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity({name: "booking"})
@Unique(["showtimeId", "seat"])
export class Booking {
  @PrimaryGeneratedColumn({name: "id"})
  id: number  

  @ManyToOne(() => Showtime, (showtime) => showtime.id)
  @JoinColumn({name: 'showtime_id'})
  showtimeId: number;

  @Column({name: 'seat', type: 'varchar'})
  seat: string;
}
