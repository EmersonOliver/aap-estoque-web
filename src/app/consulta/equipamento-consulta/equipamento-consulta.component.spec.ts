import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EquipamentoConsultaComponent } from './equipamento-consulta.component';

describe('EquipamentoConsultaComponent', () => {
  let component: EquipamentoConsultaComponent;
  let fixture: ComponentFixture<EquipamentoConsultaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EquipamentoConsultaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EquipamentoConsultaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
