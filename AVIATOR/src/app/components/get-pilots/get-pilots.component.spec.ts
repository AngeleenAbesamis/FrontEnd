import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetPilotsComponent } from './get-pilots.component';

describe('GetPilotsComponent', () => {
  let component: GetPilotsComponent;
  let fixture: ComponentFixture<GetPilotsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GetPilotsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GetPilotsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
