import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { UsersService } from '../../users/services/users.service';
import { UserEntity } from '../../users/entities/user.entity';
import { PayloadToken } from '../interface/auth.interface';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}
  //Validacion del usuario

  //Validacion del usuario por nombre de usuario o email
  public async validateUser(username: string, password: string): Promise<any> {
    const userByUsername = await this.usersService.findBy({
      key: 'userName',
      value: username,
    });

    const userByEmail = await this.usersService.findBy({
      key: 'email',
      value: username,
    });

    if (userByUsername) {
      const match = await bcrypt.compare(password, userByUsername.password);
      if (match) return userByUsername;
    }
    if (userByEmail) {
      const match = await bcrypt.compare(password, userByEmail.password);
      if (match) return userByEmail;
    }
    console.log(userByUsername);
    console.log(userByEmail);
    return null;
  }

  // Function para general firma del token
  public signToken({
    payload,
    secret,
    expires,
  }: {
    payload: jwt.JwtPayload;
    secret: string;
    expires: number | string;
  }) {
    return jwt.sign(payload, secret, { expiresIn: expires });
  }

  // Function para verifier la firma del token
  public async generateToken(user: UserEntity): Promise<any> {
    const getUser = await this.usersService.findUserById(user.id.toString());
    const payload: PayloadToken = {
      role: getUser.role,
      sub: getUser.id.toString(),
    };
    return {
      access_token: this.signToken({
        payload,
        secret: process.env.JWT_SECRET,
        expires: '1h',
      }),
    };
  }
}
