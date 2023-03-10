import { ROLES } from '../../../constants';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { UserEntity } from '../entities/user.entity';
import { ACCESS_LEVELS } from '../../../constants/ROLES';
import { ProjectsEntity } from '../../project/entities/projects.entity';

export class UserDto {
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @IsNotEmpty()
  @IsString()
  lastName: string;

  @IsNotEmpty()
  @IsString()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNotEmpty()
  @IsNumber()
  age: number;

  @IsNotEmpty()
  @IsString()
  username: string;

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
  @IsString()
  email: string;

  @IsOptional()
  @IsString()
  password: string;

  @IsOptional()
  @IsNumber()
  age: number;

  @IsOptional()
  @IsString()
  username: string;

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
  @IsEnum(ACCESS_LEVELS)
  accessLevel: ACCESS_LEVELS;
}
