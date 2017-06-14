import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.css']
})
export class TimerComponent implements OnInit {

 

  minutos: number;
  segundos: number;
  isPaused: boolean;
  buttonLabel: string;

  constructor() {
    this.resetTimer();
    setInterval(() => this.tick(), 1000);
  }

  ngOnInit() {
  }

  resetTimer(): void {
    this.isPaused = true;
    this.minutos = 0;
    this.segundos = 10;
    this.buttonLabel = 'Empezar';
  }

  private tick(): void {
    if (!this.isPaused) {
      this.buttonLabel = 'Pausar';

      if (--this.segundos < 0) {
        this.segundos = 59;
        if (--this.minutos < 0) {
          this.resetTimer();
        }
      }
    }
  }

  togglePause(): void {
    this.isPaused = !this.isPaused;
    if (this.minutos < 24 || this.segundos < 59) {
      this.buttonLabel = this.isPaused ? 'Reanudar' : 'Pausar';
    }
  }

}
