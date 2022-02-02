import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CadastroComponent } from './cadastro/cadastro.component';
import { EquipamentoComponent } from './cadastro/equipamento/equipamento.component';
import { HomeComponent } from './home/home.component';
import { CriarContaComponent } from './usuario/login/criar-conta/criar-conta.component';
import { EsqueciMinhaSenhaComponent } from './usuario/login/esqueci-minha-senha/esqueci-minha-senha.component';
import { LoginComponent } from './usuario/login/login.component';
import { AuthGuardService as AuthGuard } from './guards/auth-guard.service';
import { SaidaComponent } from './cadastro/saida/saida.component';
import { EquipamentoConsultaComponent } from './consulta/equipamento-consulta/equipamento-consulta.component';
import { ConsultaComponent } from './consulta/consulta.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'esqueci-minha-senha', component: EsqueciMinhaSenhaComponent },
  { path: 'criar-conta', component: CriarContaComponent },
  { path: 'home', canActivate: [AuthGuard], component: HomeComponent },
  {
    path: 'estoque', canActivate: [AuthGuard], component: CadastroComponent,
    children: [
      { path: '', redirectTo: 'equipamento', pathMatch: 'full' },
      { path: 'equipamento', canActivate: [AuthGuard], component: EquipamentoComponent },
      { path: 'saida', canActivate: [AuthGuard], component: SaidaComponent }
    ]
  },
  {path:'consulta',canActivate: [AuthGuard],  component:ConsultaComponent, children:[
    {path:'', redirectTo:'equipamento', pathMatch:'full'},
    {path:'equipamento/:id', canActivate: [AuthGuard], component:EquipamentoConsultaComponent},
    {path:'equipamento', canActivate: [AuthGuard], component:EquipamentoConsultaComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
