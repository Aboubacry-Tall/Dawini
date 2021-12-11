import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicamentsBaseComponent } from './medicaments-base.component';

describe('MedicamentsBaseComponent', () => {
  let component: MedicamentsBaseComponent;
  let fixture: ComponentFixture<MedicamentsBaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MedicamentsBaseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MedicamentsBaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
