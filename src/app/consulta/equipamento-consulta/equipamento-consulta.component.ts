import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AppUtils } from 'src/app/AppUtils';
import { CidadeDTO } from 'src/app/core/dtos/cidade.dto.model';
import { DepartamentoDTO } from 'src/app/core/dtos/departamento.dto.model';
import { EquipamentoDTO } from 'src/app/core/dtos/equipamento.dto.model';
import { EquipamentoVO } from 'src/app/core/dtos/equipamento.model.vo';
import { EstoqueDTO } from 'src/app/core/dtos/estoque.dto.model';
import { FabricanteDTO } from 'src/app/core/dtos/fabricante.dto.model';
import { Params } from 'src/app/core/dtos/params.model';
import { CidadeModel } from 'src/app/core/models/cidade.model';
import { EquipamentoModel } from 'src/app/core/models/equipamento.model';
import { EquipamentoConsultaService } from './equipamento-consulta.service';
declare var $ : any;

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

  equipamentos = [];
  buscarForm: FormGroup;
  equipamentoVO = {} as EquipamentoVO
  editarForm : FormGroup;

  dropdownListStatus = [];
  dropdownStatus = {};

  sucesso:boolean = false;
  erro:boolean = false;

  constructor(
    public consultaService: EquipamentoConsultaService, 
    private spinner:NgxSpinnerService,
    private activatedRoute: ActivatedRoute) {
    
   }

  ngOnInit() {

    this.selecionar(this.activatedRoute.snapshot.params['id']);


    this.consultaService.carregarParams().subscribe(
      res => {
        this.params = res;
      }
    ), error => {
      console.log(error)
    }

    this.dropdownStatus = {
      singleSelection: false,
      textField: 'texto',
      idField: 'value',
      selectAllText: 'Todos',
      unSelectAllText: 'Remover todos',
      noDataAvailablePlaceholderText: 'Nenhum Status Encontrado',
      itemsShowLimit: 5,
      allowSearchFilter: true
    };

    this.buscarForm = new FormGroup({
      nome: new FormControl(null),
      departamento: new FormControl(null),
      fabricante: new FormControl(null),
      status: new FormControl(null)
    });

    this.editarForm = new FormGroup({
      idEquipamento: new FormControl(null),
      idFabricante: new FormControl(null),
      idDepartamento: new FormControl(null),
      idEstoque: new FormControl(null),
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

    this.dropdownListStatus = this.listaStatus;
  }

  pesquisar() {

    this.spinner.show();
    let formulario = this.buscarForm.value;

    this.consultaService.pesquisarEquipamento(
      formulario.nome,
      formulario.status,
      formulario.fabricante, formulario.departamento, 1, 'idEquipamento', 'desc').subscribe(
        res => {
          this.equipamentos = res.body
          this.spinner.hide();
        },error=>{
          console.log(error);
          this.spinner.hide();
        }
      );
      this.spinner.hide();

  }

  detalhar(equipamento:EquipamentoVO){
    this.equipamentoVO = equipamento;
    $('#modalDetalhes').modal('show');
  }

  selecionar(idEquipamento:number){
    this.spinner.show();
    let equipamento = {} as EquipamentoModel;
    this.consultaService.detalharEquipamento(idEquipamento).subscribe(
      res=>{
        equipamento = res;
        this.toFormEquipamento(equipamento);
        this.spinner.hide();
        $('#modalEditar').modal('show');
      }, error=>{
        console.log(error);
        this.spinner.hide();
      }
    );
  }

  onEditar(){

    this.spinner.show();
    
    if (this.editarForm.invalid) {
      window.alert('Preencha todos os campos obrigatórios.')
      AppUtils.validarForm(['nome', 'modelo', 'numeroSerie', 'patrimonio', 
      'cor', 'status','departamento','fabricante','estado','cidade','uf', 'dataEntrada'], 
      this.editarForm);
      this.spinner.hide();
      return;
    }

    let estoque = {} as EstoqueDTO;
    let equipamento = {} as EquipamentoDTO;
    let cidade = {} as CidadeDTO;
    let departamento = {} as DepartamentoDTO;
    let fabricante =  {} as FabricanteDTO;
    //Estoque
    estoque.dataEntradaEstoque = this.editarForm.controls.dataEntrada.value;
    //cidade
    cidade.cidade = this.editarForm.controls.cidade.value;
    cidade.estado = this.editarForm.controls.estado.value;
    cidade.uf = this.editarForm.controls.uf.value;
    // Departamento
    departamento.nomeDepartamento = this.editarForm.controls.departamento.value;
    departamento.cidade = cidade;
  
  //  fabricante
    fabricante.nome = this.editarForm.controls.fabricante.value;

    //Equipamento
    equipamento.cor = this.editarForm.controls.cor.value;
    equipamento.modelo = this.editarForm.controls.modelo.value;
    equipamento.nome = this.editarForm.controls.nome.value;
    equipamento.numeroSerie = this.editarForm.controls.numeroSerie.value;
    equipamento.patrimonio = this.editarForm.controls.patrimonio.value;
    equipamento.statusEquipamento = this.editarForm.controls.status.value;
    equipamento.departamento = departamento;
    equipamento.departamento.cidade = cidade;
    equipamento.fabricante = fabricante;
    
  //estoque e equipamento
    estoque.equipamento = equipamento;

   this.spinner.hide();
  }
  getStatus(status:number):string{
    return this.listaStatus.find(x=> x.value === status).texto;
    }
  toFormEquipamento(e:EquipamentoModel){
    this.editarForm.get('idEquipamento').setValue(e.idEquipamento);
    this.editarForm.get('idFabricante').setValue(e.idFabricante);
    this.editarForm.get('idDepartamento').setValue(e.idDepartamento);
    this.editarForm.get('idEstoque').setValue(e.idEstoque);
    this.editarForm.get('nome').setValue(e.nome);
    this.editarForm.get('modelo').setValue(e.modelo);
    this.editarForm.get('numeroSerie').setValue(e.numeroSerie);
    this.editarForm.get('patrimonio').setValue(e.patrimonio);
    this.editarForm.get('cor').setValue(e.cor);
    this.editarForm.get('status').setValue(e.statusEquipamento);
    this.editarForm.get('fabricante').setValue(e.fabricante.nomeFabricante);
    this.editarForm.get('departamento').setValue(e.departamento.nomeDepartamento);
    this.editarForm.get('cidade').setValue(e.departamento.cidade.cidade);
    this.editarForm.get('estado').setValue(e.departamento.cidade.estado);
    this.editarForm.get('uf').setValue(e.departamento.cidade.uf);
    this.editarForm.get('dataEntrada').setValue(e.estoque.dataEntrada ? new Date(e.estoque.dataEntrada).toISOString().substring(0,10) : null);
  }

  selectDepartamento(){
    let departamento = 
    this.params.departamentos.find(x=> x.idDepartamento == this.editarForm.get('idDepartamento').value);
    this.editarForm.get('cidade').setValue(departamento.cidade.cidade);
    this.editarForm.get('estado').setValue(departamento.cidade.estado);
    this.editarForm.get('uf').setValue(departamento.cidade.uf);

  }

}
