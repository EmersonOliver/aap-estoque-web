import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { AppUtils } from 'src/app/AppUtils';

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

  ];

  equipamentoForm: FormGroup;

  constructor(public spinner: NgxSpinnerService) { }

  ngOnInit() {

    this.equipamentoForm = new FormGroup({
      nome: new FormControl(null, [Validators.required]),
      modelo: new FormControl(null, [Validators.required]),
      numeroSerie: new FormControl(null, [Validators.required]),
      patrimonio: new FormControl(null, [Validators.required]),
      cor: new FormControl(null, [Validators.required]),
      status: new FormControl(null, [Validators.required]),
      fabricante: new FormControl(null, [Validators.required]),
      departamento: new FormControl(null, [Validators.required])
    });
  }
  onSubmit() {
    if (this.equipamentoForm.invalid) {
      window.alert('Preencha todos os campos obrigatórios.')
      AppUtils.validarForm(['nome', 'modelo', 'numeroSerie', 'patrimonio', 'cor', 'status'], this.equipamentoForm);
      return;
    }


  }

}
