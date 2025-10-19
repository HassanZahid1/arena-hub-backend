// src/profile/profile.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { Profile } from './entitities/profile.entity';
// import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(Profile)
    private profileRepository: Repository<Profile>,
  ) {}

  async create(createProfileDto: CreateProfileDto): Promise<Profile> {
    const newProfile = this.profileRepository.create({
      ...createProfileDto,
      updatedBy: createProfileDto.createdBy,
    });

    return await this.profileRepository.save(newProfile);
  }

  async findAll(): Promise<Profile[]> {
    return await this.profileRepository.find({
      where: { isDeleted: false },
    });
  }

  async findOne(id: string): Promise<Profile> {
    const profile = await this.profileRepository.findOne({
      where: { id, isDeleted: false },
    });
    if (!profile) {
      throw new NotFoundException(`Profile with ID ${id} not found`);
    }
    return profile;
  }

  async update(
    id: string,
    updateProfileDto: UpdateProfileDto,
  ): Promise<Profile> {
    const profile = await this.findOne(id);

    Object.assign(profile, updateProfileDto);
    profile.updatedAt = new Date();

    return await this.profileRepository.save(profile);
  }

  async remove(id: string): Promise<{ message: string }> {
    const profile = await this.findOne(id);

    profile.isDeleted = true;
    profile.updatedAt = new Date();

    await this.profileRepository.save(profile);

    return { message: `Profile with ID ${id} has been deleted successfully` };
  }
}
