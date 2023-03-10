import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class ProjectsDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
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
