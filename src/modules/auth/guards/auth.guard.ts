import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { Reflector } from '@nestjs/core';
import { UsersService } from '../../users/services/users.service';
import { useToken } from '../../../utils/use.token';
import { IUseToken } from '../interface/auth.interface';
import { HEADERS_TOKEN } from '../../../constants/key-decorator';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly userService: UsersService,
    private readonly reflector: Reflector,
  ) {}
  async canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.get<boolean>(
      'PUBLIC_KEY',
      context.getHandler(),
    );
    if (isPublic) return true;

    const request = context.switchToHttp().getRequest<Request>();
    const token = request.headers['authorization'];

    if (!token || Array.isArray(token)) {
      //throw new UnauthorizedException('Token not found');
      console.log('token no valido');
    }

    const managerToken: IUseToken | string = useToken(token);
    if (typeof managerToken === 'string') {
      throw new UnauthorizedException(managerToken);
    }

    if (managerToken.isExpired) {
      throw new UnauthorizedException('Token is expired');
    }
    const { sub } = managerToken;
    console.log(sub);
    const user = await this.userService.findUserById(sub);

    if (!user) throw new UnauthorizedException('Invalid user');
    request.idUser = user.id.toString();
    request.roleUser = user.role;
    return true;
  }
}