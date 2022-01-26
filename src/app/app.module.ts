import { BrowserModule } from '@angular/platform-browser';
import { LOCALE_ID, NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgxMaskModule, IConfig } from 'ngx-mask'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './usuario/login/login.component';
import { EsqueciMinhaSenhaComponent } from './usuario/login/esqueci-minha-senha/esqueci-minha-senha.component';
import { CriarContaComponent } from './usuario/login/criar-conta/criar-conta.component';
import { UsuarioService } from './usuario/usuario.service';
import { EquipamentoComponent } from './cadastro/equipamento/equipamento.component';
import { SaidaComponent } from './cadastro/saida/saida.component';
import { CadastroComponent } from './cadastro/cadastro.component';
import { NgxSpinnerModule } from "ngx-spinner";
import { EquipamentoService } from './cadastro/equipamento/equipamento.service';
import { JwtHelperService, JWT_OPTIONS  } from '@auth0/angular-jwt';
import { AuthGuardService } from './guards/auth-guard.service';
import localetBR from '@angular/common/locales/br';
import { registerLocaleData } from '@angular/common';
import { DashboardService } from './home/dashboard.service';

registerLocaleData(localetBR);

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    HomeComponent,
    HeaderComponent,
    LoginComponent,
    EsqueciMinhaSenhaComponent,
    CriarContaComponent,
    EquipamentoComponent,
    SaidaComponent,
    CadastroComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    NgxMaskModule.forRoot(),
    NgxSpinnerModule
  ],
  providers: [
  UsuarioService,
  EquipamentoService,
  JwtHelperService,
  AuthGuardService,
  DashboardService,
  { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
  {provide: LOCALE_ID, useValue:'pt-br'}
  
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
