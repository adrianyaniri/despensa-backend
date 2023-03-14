import { SetMetadata } from '@nestjs/common';

export const AccessLevel = (accessLevel: number) =>
  SetMetadata('ACCESS_LEVEL', accessLevel);
