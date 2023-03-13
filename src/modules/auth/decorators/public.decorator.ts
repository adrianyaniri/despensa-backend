import { SetMetadata } from '@nestjs/common';
import { PUBLIC_KEY } from '../../../constants';

export const PublicDecorator = () => SetMetadata(PUBLIC_KEY, true);
