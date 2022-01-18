import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AccountAuthentication } from '../model/login.model.dto';
import { UsuarioService } from '../usuario.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usuarioForm: FormGroup

  constructor(private usuarioService: UsuarioService) { }

  ngOnInit() {
    this.usuarioForm = new FormGroup({
      email: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required])
    });
  }

  onSubmit() {
    if (this.usuarioForm.invalid) {
      window.alert('Preencha os campos obrigatórios!');
      this.usuarioForm.get('email').value == null ? this.usuarioForm.get('email').markAsTouched() : null;
      this.usuarioForm.get('password').value == null ? this.usuarioForm.get('password').markAsTouched() : null;

    } else {
      let account: AccountAuthentication;
      account = this.usuarioForm.value;
      this.usuarioService.loginUsuario(account).subscribe(
        res => {
          console.log(res)
        }

      );

    }
  }

}
