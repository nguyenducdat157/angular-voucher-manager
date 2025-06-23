import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class LoggerService {
  log(message: any, ...optionalParams: any[]): void {
    console.log('[LOG]:', message, ...optionalParams);
  }

  warn(message: any, ...optionalParams: any[]): void {
    console.warn('[WARN]:', message, ...optionalParams);
  }

  error(message: any, ...optionalParams: any[]): void {
    console.error('[ERROR]:', message, ...optionalParams);
  }
}
