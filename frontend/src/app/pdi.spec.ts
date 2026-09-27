import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { Pdi } from './pdi';

describe('Pdi', () => {
  let component: Pdi;
  let fixture: ComponentFixture<Pdi>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Pdi],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(Pdi);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
