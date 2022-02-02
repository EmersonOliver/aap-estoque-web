import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { AppUtils } from 'src/app/AppUtils';
import { CidadeDTO } from 'src/app/core/dtos/cidade.dto.model';
import { DepartamentoDTO } from 'src/app/core/dtos/departamento.dto.model';
import { EquipamentoDTO } from 'src/app/core/dtos/equipamento.dto.model';
import { EstoqueDTO } from 'src/app/core/dtos/estoque.dto.model';
import { FabricanteDTO } from 'src/app/core/dtos/fabricante.dto.model';
import { EquipamentoService } from './equipamento.service';



@Component({
  selector: 'app-equipamento',
  templateUrl: './equipamento.component.html',
  styleUrls: ['./equipamento.component.css']
})
export class EquipamentoComponent implements OnInit {

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

  sucesso : boolean = false;
  erro : boolean = false;

  messageError = '';
  equipamentoForm: FormGroup;

  constructor(private spinner: NgxSpinnerService, public equipamentoService:EquipamentoService) { }

  ngOnInit() {
    this.equipamentoForm = new FormGroup({
      nome: new FormControl(null, [Validators.required]),
      modelo: new FormControl(null, [Validators.required]),
      numeroSerie: new FormControl(null, [Validators.required]),
      patrimonio: new FormControl(null, [Validators.required]),
      cor: new FormControl(null, [Validators.required]),
      status: new FormControl(null, [Validators.required]),
      fabricante: new FormControl(null, [Validators.required]),
      departamento: new FormControl(null, [Validators.required]),
      cidade: new FormControl(null, Validators.required),
      estado: new FormControl(null, Validators.required),
      uf: new FormControl(null, Validators.required),
      dataEntrada: new FormControl(null, Validators.required)
    });

    console.log(this.equipamentoForm.value)
  }
  onSubmit() {
    this.spinner.show();
    this.reinicializarRequisicao();
    if (this.equipamentoForm.invalid) {
      window.alert('Preencha todos os campos obrigatórios.')
      AppUtils.validarForm(['nome', 'modelo', 'numeroSerie', 'patrimonio', 
      'cor', 'status','departamento','fabricante','estado','cidade','uf', 'dataEntrada'], 
      this.equipamentoForm);
      this.spinner.hide();
      return;
    }

    let estoque = {} as EstoqueDTO;
    let equipamento = {} as EquipamentoDTO;
    let cidade = {} as CidadeDTO;
    let departamento = {} as DepartamentoDTO;
    let fabricante =  {} as FabricanteDTO;
    //Estoque
    estoque.dataEntradaEstoque = this.equipamentoForm.controls.dataEntrada.value;
    //cidade
    cidade.cidade = this.equipamentoForm.controls.cidade.value;
    cidade.estado = this.equipamentoForm.controls.estado.value;
    cidade.uf = this.equipamentoForm.controls.uf.value;
    // Departamento
    departamento.nomeDepartamento = this.equipamentoForm.controls.departamento.value;
    departamento.cidade = cidade;
  
  //  fabricante
    fabricante.nome = this.equipamentoForm.controls.fabricante.value;

    //Equipamento
    equipamento.cor = this.equipamentoForm.controls.cor.value;
    equipamento.modelo = this.equipamentoForm.controls.modelo.value;
    equipamento.nome = this.equipamentoForm.controls.nome.value;
    equipamento.numeroSerie = this.equipamentoForm.controls.numeroSerie.value;
    equipamento.patrimonio = this.equipamentoForm.controls.patrimonio.value;
    equipamento.statusEquipamento = this.equipamentoForm.controls.status.value;
    equipamento.departamento = departamento;
    equipamento.departamento.cidade = cidade;
    equipamento.fabricante = fabricante;
    
  //estoque e equipamento
    estoque.equipamento = equipamento;

    this.equipamentoService.cadastrarEntrada(estoque).subscribe(
      res=>{
        console.log(res);
        this.spinner.hide();
        this.equipamentoForm.reset();
        this.sucesso = true;
      },
      error=>{
        console.log(error);
        this.spinner.hide();
        this.erro = true;
        this.messageError = (error != null || error != '') 
        ? error : ': Entre em contato com o Administrador do sistema';
      }
    );
  }

  reinicializarRequisicao(){
    this.sucesso = false;
    this.erro = false;
    this.messageError = '';
  }

}
