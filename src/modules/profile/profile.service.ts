// src/profile/profile.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { Profile, CourtType } from './entitities/profile.entity';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class ProfileService {
  // Hardcoded mock data
  private profiles: Profile[] = [
    {
      id: '550e8400-e29b-41d4-a716-446655440000',
      name: 'Elite Sports Complex',
      description:
        'Premier sports facility with world-class amenities and professional coaching staff.',
      location: 'DHA Phase 5, Lahore',
      facilities: [
        {
          id: 'f1',
          name: 'Parking',
          icon: 'parking',
          description: 'Ample parking space for 100+ vehicles',
        },
        {
          id: 'f2',
          name: 'Changing Rooms',
          icon: 'changing-room',
          description: 'Clean and spacious changing facilities',
        },
      ],
      amenities: [
        {
          id: 'a1',
          name: 'Cafeteria',
          icon: 'cafeteria',
          description: 'On-site food and beverages',
        },
        {
          id: 'a2',
          name: 'Pro Shop',
          icon: 'shop',
          description: 'Sports equipment and merchandise',
        },
      ],
      photos: [
        'https://example.com/photo1.jpg',
        'https://example.com/photo2.jpg',
        'https://example.com/photo3.jpg',
      ],
      courts: [
        {
          id: 'c1',
          name: 'Court 1',
          type: [CourtType.BADMINTON, CourtType.BASKETBALL],
          length: 100,
          width: 60,
          weekdayRate: 2500,
          weekendRate: 3500,
          isActive: true,
        },
        {
          id: 'c2',
          name: 'Court 2',
          type: [CourtType.SQUASH],
          length: 100,
          width: 60,
          weekdayRate: 2000,
          weekendRate: 3000,
          isActive: true,
        },
      ],
      contactInfo: {
        phone: '+92-300-1234567',
        email: 'info@elitesports.com',
        website: 'https://www.elitesports.com',
      },
      hourlyRates: {
        weekdays: 2500,
        weekends: 3500,
      },
      createdAt: new Date('2024-01-15'),
      createdBy: 'admin@system.com',
      updatedAt: new Date('2024-01-15'),
      updatedBy: 'admin@system.com',
      isDeleted: false,
    },
  ];

  create(createProfileDto: CreateProfileDto): Profile {
    const newProfile: Profile = {
      id: uuidv4(),
      ...createProfileDto,
      createdAt: new Date(),
      updatedAt: new Date(),
      updatedBy: createProfileDto.createdBy,
      isDeleted: false,
    };

    this.profiles.push(newProfile);
    return newProfile;
  }

  findAll(): Profile[] {
    return this.profiles.filter((profile) => !profile.isDeleted);
  }

  findOne(id: string): Profile {
    const profile = this.profiles.find((p) => p.id === id && !p.isDeleted);
    if (!profile) {
      throw new NotFoundException(`Profile with ID ${id} not found`);
    }
    return profile;
  }

  update(id: string, updateProfileDto: UpdateProfileDto): Profile {
    const profileIndex = this.profiles.findIndex(
      (p) => p.id === id && !p.isDeleted,
    );
    if (profileIndex === -1) {
      throw new NotFoundException(`Profile with ID ${id} not found`);
    }

    const updatedProfile: Profile = {
      ...this.profiles[profileIndex],
      ...updateProfileDto,
      updatedAt: new Date(),
    };

    this.profiles[profileIndex] = updatedProfile;
    return updatedProfile;
  }

  remove(id: string): { message: string } {
    const profileIndex = this.profiles.findIndex(
      (p) => p.id === id && !p.isDeleted,
    );
    if (profileIndex === -1) {
      throw new NotFoundException(`Profile with ID ${id} not found`);
    }

    // Soft delete
    this.profiles[profileIndex].isDeleted = true;
    this.profiles[profileIndex].updatedAt = new Date();

    return { message: `Profile with ID ${id} has been deleted successfully` };
  }
}
