import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HealthController } from './health/health.controller';
import { ProfileModule } from './modules/profile/profile.module';
import { Profile } from './modules/profile/entitities/profile.entity';

@Module({
  imports: [
    // TypeORM configuration (commented out since no DB connection)
    // TypeOrmModule.forRoot({
    //   type: 'postgres',
    //   host: 'localhost',
    //   port: 5432,
    //   username: 'your_username',
    //   password: 'your_password',
    //   database: 'your_database',
    //   entities: [__dirname + '/**/*.entity{.ts,.js}'],
    //   synchronize: true, // Don't use in production
    // }),
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'arena-hub.db',
      entities: [Profile],
      synchronize: true, // Don't use in production
      logging: true,
    }),
    ProfileModule,
  ],
  controllers: [AppController, HealthController],
  providers: [AppService],
})
export class AppModule {}
