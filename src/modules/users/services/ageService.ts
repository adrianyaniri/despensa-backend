import { Injectable } from '@nestjs/common';

@Injectable()
export class AgeService {
  calculateAge(birthday: Date): number {
    const today = new Date();
    const age = today.getFullYear() - birthday.getFullYear();
    const month = today.getMonth() - birthday.getMonth();

    if (month < 0 || (month === 0 && today.getDate() < birthday.getDate())) {
      return age - 1;
    }
    return age;
  }
}
