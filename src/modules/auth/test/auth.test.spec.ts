// Archivo: auth.service.test.ts
import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from '../service/auth.service';

describe('AuthService', () => {
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService],
    }).compile();

    authService = module.get<AuthService>(AuthService);
  });
});
