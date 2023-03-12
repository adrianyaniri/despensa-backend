import { IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';

export class ProjectsDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(10, { message: 'Description is too short' })
  description: string;
}

export class ProjectsUpdatedDto {
  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description: string;
}
