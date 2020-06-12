import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginaErrorLogComponent } from './pagina-error-log.component';

describe('PaginaErrorLogComponent', () => {
  let component: PaginaErrorLogComponent;
  let fixture: ComponentFixture<PaginaErrorLogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaginaErrorLogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaginaErrorLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
