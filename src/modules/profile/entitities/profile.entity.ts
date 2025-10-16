// src/profile/entities/profile.entity.ts
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum CourtType {
  CRICKET = 'cricket',
  FOOTBALL = 'football',
  BASKETBALL = 'basketball',
  TENNIS = 'tennis',
  BADMINTON = 'badminton',
  VOLLEYBALL = 'volleyball',
  SQUASH = 'squash',
  TABLE_TENNIS = 'table-tennis',
}

export class Facility {
  id: string;
  name: string;
  icon?: string;
  description?: string;
}

export class Court {
  id: string;
  name: string;
  type: CourtType[];
  length: number;
  width: number;
  weekdayRate: number;
  weekendRate: number;
  isActive: boolean;
}

export class ContactInfo {
  phone?: string;
  email?: string;
  website?: string;
}

export class HourlyRates {
  weekdays: number;
  weekends: number;
}

@Entity('profiles')
export class Profile {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column('text')
  description: string;

  @Column()
  location: string;

  @Column('json')
  facilities: Facility[];

  @Column('json')
  amenities: Facility[];

  @Column('simple-array')
  photos: string[];

  @Column('json')
  courts: Court[];

  @Column('json')
  contactInfo: ContactInfo;

  @Column('json')
  hourlyRates: HourlyRates;

  @CreateDateColumn()
  createdAt: Date;

  @Column()
  createdBy: string;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column()
  updatedBy: string;

  @Column({ default: false })
  isDeleted: boolean;
}
