import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  adminDashboardArray : any []=[];
  adminDashboardObj : any={
    "totalEmployee": 0,
    "totalAdvanceRecordCount": 0,
    "totalLeavesCount": 0,
    "totalSalaryCount": 0,
    "todaysAdvanceTotalAmount": 40,
    "todaysLeaves": 0

  }
  constructor (private http : HttpClient){ }

  ngOnInit(): void {
    this.getAdminDashboard();
  }
  getAdminDashboard(){
    this.http.get("http://onlinetestapi.gerasim.in/api/TeamSync/getAdminDashboard").subscribe((res:any)=>{
    this.adminDashboardArray = res.data;
    })
  }
}
