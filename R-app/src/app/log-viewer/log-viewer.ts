import { Component, inject } from '@angular/core';
import { DatePipe } from '@angular/common';
import { LoggingService } from '../service/logging/logging-service';

@Component({
  selector: 'app-log-viewer',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './log-viewer.html',
  styleUrl: './log-viewer.scss'
})
export class LogViewer {
  ls = inject(LoggingService);

  logs = this.ls.logs;

  reset(): void {
    this.ls.clear();
  }

}
