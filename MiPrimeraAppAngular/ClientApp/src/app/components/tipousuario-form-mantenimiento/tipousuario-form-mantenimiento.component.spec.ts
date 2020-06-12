import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TipousuarioFormMantenimientoComponent } from './tipousuario-form-mantenimiento.component';

describe('TipousuarioFormMantenimientoComponent', () => {
  let component: TipousuarioFormMantenimientoComponent;
  let fixture: ComponentFixture<TipousuarioFormMantenimientoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TipousuarioFormMantenimientoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TipousuarioFormMantenimientoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
