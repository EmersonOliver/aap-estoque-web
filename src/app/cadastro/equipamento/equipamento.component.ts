import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-equipamento',
  templateUrl: './equipamento.component.html',
  styleUrls: ['./equipamento.component.css']
})
export class EquipamentoComponent implements OnInit {

  listaStatus = [
    {
      value: 'INDISPONIVEL',
      texto: 'Indisponível'
    },
    {
      value: 'DISPONIVEL',
      texto: 'Disponível'
    },
    {
      value: 'DANIFICADO',
      texto: 'Danificado'
    },
    {
      value: 'EM_MANUTENCAO',
      texto: 'Em Manutenção'
    },
    {
      value: 'EM_ESTOQUE',
      texto: 'Em Estoque'
    },
    {
      value: 'FORA_DO_ESTOQUE',
      texto: 'Fora do Estoque'
    }

  ]

  constructor() { }

  ngOnInit() {
    }

  onChangeStatus(event){
    console.log(event.target.value)
  }

}
