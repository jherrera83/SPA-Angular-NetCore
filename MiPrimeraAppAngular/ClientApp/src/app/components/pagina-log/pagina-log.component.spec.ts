import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginaLogComponent } from './pagina-log.component';

describe('PaginaLogComponent', () => {
  let component: PaginaLogComponent;
  let fixture: ComponentFixture<PaginaLogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaginaLogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaginaLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
