import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BalanceChargeComponent } from './balance-charge.component';

describe('BalanceChargeComponent', () => {
  let component: BalanceChargeComponent;
  let fixture: ComponentFixture<BalanceChargeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BalanceChargeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BalanceChargeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
