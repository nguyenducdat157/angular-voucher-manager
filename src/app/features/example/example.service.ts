import { Injectable } from '@angular/core';
import { LoggerService } from 'src/app/core/services/logger.service';

@Injectable({ providedIn: 'root' })
export class ExampleService {
  constructor(private logger: LoggerService) {}

  logExample() {
    this.logger.log('Button clicked!');
    this.logger.warn('This is a warning!');
    this.logger.error('This is an error!');
  }
}
