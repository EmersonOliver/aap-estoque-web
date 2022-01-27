import { Component, OnInit } from '@angular/core';
import { Params } from '../models/params.model';
import { EquipamentoConsultaService } from './equipamento-consulta.service';

@Component({
  selector: 'app-equipamento-consulta',
  templateUrl: './equipamento-consulta.component.html',
  styleUrls: ['./equipamento-consulta.component.css']
})
export class EquipamentoConsultaComponent implements OnInit {

  params = {} as Params;
  listaStatus = [
    {
      value: 1,
      texto: 'Funcionando'
    },
    {
      value: 2,
      texto: 'Danificado'
    },
    {
      value: 3,
      texto: 'Em manutenção'
    }
  ];

  constructor(public consultaService:EquipamentoConsultaService) { }

  ngOnInit() {
    this.consultaService.carregarParams().subscribe(
      res=>{
        this.params = res;
        console.log(this.params)
      }
    ),error=>{
      console.log(error)
    }
  }

}
