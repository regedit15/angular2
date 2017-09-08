import { Component, OnInit, OnChanges, DoCheck, AfterContentInit, AfterContentChecked, AfterViewInit, AfterViewChecked, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-home',
  template: `
  <h1> Demos <small>angular</small></h1>
  <hr>

  <app-ng-style></app-ng-style>
  <br>
  <app-css></app-css>
  <br>
  <p>
    hola mundo desde app.component
  </p>
  <br>
  <app-clases></app-clases>

  <br>
  <br>
  <p [appResaltado]="'orange'">
    Hola mundo directiva
  </p>

  <br>
  <br>

  <app-ng-switch></app-ng-switch>
  `,
  styles: []
})
export class HomeComponent implements OnInit, OnChanges, DoCheck, AfterContentInit, AfterContentChecked, AfterViewInit, AfterViewChecked, OnDestroy {

  constructor() { }

  ngOnInit() {
    console.log("OnInit");
  }

  ngOnChanges() {
    console.log("OnChanges");
  }

  ngDoCheck() {
    console.log("DoCheck");
  }

  ngAfterContentInit() {
    console.log("AfterContentInit");
  }

  ngAfterContentChecked() {
    console.log("AfterContentChecked");
  }

  ngAfterViewInit() {
    console.log("AfterViewInit");
  }

  ngAfterViewChecked() {
    console.log("AfterViewChecked");
  }

  ngOnDestroy() {
    console.log("OnDestroy");
  }

}
