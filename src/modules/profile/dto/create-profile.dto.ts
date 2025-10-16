// src/profile/dto/create-profile.dto.ts
import {
  IsString,
  IsArray,
  IsObject,
  IsNotEmpty,
  IsOptional,
  ValidateNested,
  IsNumber,
  IsBoolean,
  IsEnum,
} from 'class-validator';
import { Type } from 'class-transformer';
import { CourtType } from '../entitities/profile.entity';

export class FacilityDto {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  icon?: string;

  @IsString()
  @IsOptional()
  description?: string;
}

export class CourtDto {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsArray()
  @IsEnum(CourtType, { each: true })
  type: CourtType[];

  @IsNumber()
  length: number;

  @IsNumber()
  width: number;

  @IsNumber()
  weekdayRate: number;

  @IsNumber()
  weekendRate: number;

  @IsBoolean()
  isActive: boolean;
}

export class ContactInfoDto {
  @IsString()
  @IsOptional()
  phone?: string;

  @IsString()
  @IsOptional()
  email?: string;

  @IsString()
  @IsOptional()
  website?: string;
}

export class HourlyRatesDto {
  @IsNumber()
  weekdays: number;

  @IsNumber()
  weekends: number;
}

export class CreateProfileDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  location: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => FacilityDto)
  facilities: FacilityDto[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => FacilityDto)
  amenities: FacilityDto[];

  @IsArray()
  @IsString({ each: true })
  photos: string[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CourtDto)
  courts: CourtDto[];

  @IsObject()
  @ValidateNested()
  @Type(() => ContactInfoDto)
  contactInfo: ContactInfoDto;

  @IsObject()
  @ValidateNested()
  @Type(() => HourlyRatesDto)
  hourlyRates: HourlyRatesDto;

  @IsString()
  @IsNotEmpty()
  createdBy: string;
}
