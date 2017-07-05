import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroesBuscadosComponent } from './heroes-buscados.component';

describe('HeroesBuscadosComponent', () => {
  let component: HeroesBuscadosComponent;
  let fixture: ComponentFixture<HeroesBuscadosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeroesBuscadosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeroesBuscadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
