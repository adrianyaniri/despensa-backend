import { ROLES } from '../../../constants';
import {
  IsDateString,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  Matches,
  MinLength,
} from 'class-validator';
import { UserEntity } from '../entities/user.entity';
import { ACCESS_LEVELS } from '../../../constants/ROLES';
import { ProjectsEntity } from '../../projects/entities/projects.entity';

export class UserDto {
  @IsOptional()
  @IsString()
  firstName = 'name';

  @IsNotEmpty()
  @IsString()
  lastName: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  @MinLength(8, { message: 'Password must be at least 8 characters long' })
  @Matches(/^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$/, {
    message: 'Password must contain at least one letter and one number',
  })
  password: string;

  @IsDateString()
  @IsNotEmpty()
  fechaNacimiento: string;

  @IsNotEmpty()
  @IsString()
  userName: string;

  @IsNotEmpty()
  @IsEnum(ROLES)
  role: ROLES;
}

export class UserUpdatedDto {
  @IsOptional()
  @IsString()
  firstName: string;

  @IsOptional()
  @IsString()
  lastName: string;

  @IsOptional()
  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  @MinLength(8, { message: 'Password must be at least 8 characters long' })
  @Matches(/^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$/, {
    message: 'Password must contain at least one letter and one number',
  })
  password: string;

  @IsOptional()
  @IsDateString()
  fechaNacimiento: string;

  @IsOptional()
  @IsString()
  userName: string;

  @IsOptional()
  @IsEnum(ROLES)
  role: ROLES;
}

export class UserToProjectDto {
  @IsNotEmpty()
  @IsUUID()
  userId: UserEntity;

  @IsNotEmpty()
  @IsUUID()
  projectId: ProjectsEntity;

  @IsNotEmpty()
  @IsEnum(ACCESS_LEVELS, { message: 'Access level is not valid' })
  accessLevel: ACCESS_LEVELS;
}
