import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaplefComponent } from './maplef.component';

describe('MaplefComponent', () => {
  let component: MaplefComponent;
  let fixture: ComponentFixture<MaplefComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MaplefComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MaplefComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
