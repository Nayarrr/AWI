import { Component, signal } from '@angular/core';
import { StudentList } from './student-list/student-list';
import { Counter } from './counter/counter';
import { StudentDetail } from './student-detail/student-detail';
import { LogViewer } from './log-viewer/log-viewer';

@Component({
  selector: 'app-root',
  standalone : true,
  imports: [StudentList, Counter, StudentDetail, LogViewer],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('R-app');
}
