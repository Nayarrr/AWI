import { Component, WritableSignal, signal } from '@angular/core';

@Component({
  selector: 'app-counter',
  imports: [],
  templateUrl: './counter.html',
  styleUrl: './counter.scss'
})

export class Counter {
  count : WritableSignal<number> = signal<number>(0)

  increment() {
    this.count.update(c => c + 1)
  }

  reset() {
    this.count.set(0)
  }

  decrement() {
    this.count.update(c => c - 1)
  }

  increment5(){
    this.count.update(c => c+5)
  }
}
