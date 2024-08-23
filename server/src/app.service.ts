import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
  getText():string{
    return 'This my first try to show some text by Nest'
  }
}
