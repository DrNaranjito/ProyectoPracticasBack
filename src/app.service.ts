import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  all(): string {
    return 'All products!';
  }
  new(): string {
    return 'New products!';
  }
  update(): string {
    return 'Update products!';
  }
  delete(): string {
    return 'Delete products!';
  }
}
