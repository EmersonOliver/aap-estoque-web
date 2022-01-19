import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AppUtils } from 'src/app/AppUtils';
import { UsuarioModel } from '../../model/usuario.model';
import { UsuarioService } from '../../usuario.service';
// import { MustMatch } from './function/must-match.validator';

@Component({
  selector: 'app-criar-conta',
  templateUrl: './criar-conta.component.html',
  styleUrls: ['./criar-conta.component.css']
})
export class CriarContaComponent implements OnInit {

usuario = {} as UsuarioModel;
usuarioForm : FormGroup;

  constructor(private usuarioService:UsuarioService) { }

  ngOnInit() {
    this.usuarioForm = new FormGroup({
      nome: new FormControl(null,[Validators.required]),
      sobrenome: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.email, Validators.required]),
      senha: new FormControl(null, [Validators.required]),
      repitaSenha: new FormControl(null, [Validators.required]),
      telefone: new FormControl(null, [Validators.required])
    });
  }

  onSubmit(){
    if(this.usuarioForm.invalid){
      window.alert('Preencha todos os campos para efetuar o cadastro.');
      AppUtils.validarForm(['nome','sobrenome', 'email', 'senha', 'repitaSenha'], this.usuarioForm);
      return;
    }
  }
}
