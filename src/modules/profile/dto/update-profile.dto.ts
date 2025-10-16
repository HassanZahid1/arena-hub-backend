// src/profile/dto/update-profile.dto.ts
import { PartialType } from '@nestjs/mapped-types';
import { IsString, IsNotEmpty } from 'class-validator';
import { CreateProfileDto } from './create-profile.dto';

// eslint-disable-next-line @typescript-eslint/no-unsafe-call
export class UpdateProfileDto extends PartialType(CreateProfileDto) {
  @IsString()
  @IsNotEmpty()
  updatedBy: string;
}
