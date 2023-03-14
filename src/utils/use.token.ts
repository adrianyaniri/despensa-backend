import {
  AuthTokenResult,
  IUseToken,
} from '../modules/auth/interface/auth.interface';
import * as jwt from 'jsonwebtoken';

export const useToken = (token: string): IUseToken | string => {
  try {
    const decodeToken = jwt.decode(token) as AuthTokenResult;
    const currentDate = new Date();
    const expiredDate = new Date(decodeToken.exp);
    return {
      role: decodeToken.role,
      sub: decodeToken.sub,
      isExpired: +expiredDate <= +currentDate / 1000,
    };
  } catch (error) {
    return 'Token no valido';
  }
};
