import { Global, Module } from "@nestjs/common";
import { UsersService } from './services/users.service';
import { UsersController } from './controllers/users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { UserProjectsEntity } from './entities/userProjects.entity';
import { AgeService } from './services/ageService';

@Global()
@Module({
  imports: [
    // Import other modules here
    TypeOrmModule.forFeature([UserEntity, UserProjectsEntity]),
  ],
  providers: [UsersService, AgeService],
  controllers: [UsersController],
  exports: [UsersService, AgeService, TypeOrmModule],
})
export class UsersModule {}
