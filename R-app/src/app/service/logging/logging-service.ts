import { Injectable, signal } from '@angular/core';
import { LogEntry } from '../../log-entry';

@Injectable({
  providedIn: 'root'
})
export class LoggingService {
  private readonly _logs = signal<LogEntry[]>([
    {id : '1', ts : new Date(), message : 'Logging service initialized', scope : 'LoggingService'},
    {id : '2', ts : new Date(), message : 'StudentList service initialized', scope : 'StudentListService'}
  ]);

  readonly logs = this._logs.asReadonly();

  nextID = this._logs().length + 1;

  log(message : string, scope? : string) : void {
    const entry : LogEntry = {
      id : this.nextID.toString(),
      ts : new Date(),
      message,
      scope
    };
    this._logs.update(list => [...list, entry]);
  }

  clear() : void {
    this._logs.set([]);
  }
}
