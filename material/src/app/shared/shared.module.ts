import {NgModule} from '@angular/core';
// import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatCheckboxModule, MatDatepickerModule, MatInputModule, MatNativeDateModule} from '@angular/material';


@NgModule({
  imports: [
    // BrowserAnimationsModule,
    //  aqui ponemos los imports de angular material
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCheckboxModule,
  ],
  exports: [
    MatInputModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ]
})
export class SharedModule {
}
