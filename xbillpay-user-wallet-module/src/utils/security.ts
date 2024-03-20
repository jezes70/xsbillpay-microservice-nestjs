
import { SetMetadata } from '@nestjs/common';



export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);

export const FLUTTER_KEY="FLWSECK_TEST-1027c82b77955bc418fea981775638c4-X"