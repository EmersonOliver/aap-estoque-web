import { Component, OnInit } from '@angular/core';
import { DashboardService } from './dashboard.service';
import { Dashboard } from './models/dashboard.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  dashboard = {} as Dashboard;
  constructor(public dashboardService:DashboardService) { }

  ngOnInit() {
    this.dashboardService.dashboard().subscribe(
      res=>{
        this.dashboard = res;
      },
      error=>{
        console.log(error)
      }
    );
  }

}
