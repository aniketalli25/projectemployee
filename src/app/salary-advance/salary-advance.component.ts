import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../services/employee.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-salary-advance',
  templateUrl: './salary-advance.component.html',
  styleUrls: ['./salary-advance.component.css'],
  providers:[MessageService]
})
export class SalaryAdvanceComponent  implements OnInit {

  isSidePanelOpen : boolean = false;
  salaryAdvanceArray : any []=[];
  employeeArray : any []=[];

  salarayAdvanceObj : any ={
    "empName": "",
    "empContactNo": "",
    "employeeId": 0,
    "advanceDate": "",
    "advanceAmount": 0,
    "advanceId": 0,
    "reason": "",
  }

constructor (private http : HttpClient , private  srv : EmployeeService , private messageService : MessageService  ){ }

ngOnInit(): void {
  this.getAllSalaryAdvnace();
  this.getAllEmployees();
}


getAllSalaryAdvnace(){
  this.http.get ("http://onlinetestapi.gerasim.in/api/TeamSync/GetAllAdvance").subscribe((res:any)=>{
    this.salaryAdvanceArray = res.data;
  })
}

getAllEmployees (){
  this.srv.getAllEmployee().subscribe((res:any)=>{
    this.employeeArray = res.data;
  })
}

saveSalary(){
  this.http.post("http://onlinetestapi.gerasim.in/api/TeamSync/AddAdvance",this.salarayAdvanceObj).subscribe((res:any)=>{
    if(res.result){
      this.getAllSalaryAdvnace();
      this.closeSidePanel();
      this.showSuccessMessage();
    }
  })
}
updateSalary(){
  this.http.post("http://onlinetestapi.gerasim.in/api/TeamSync/UpdateAdvance",this.salarayAdvanceObj).subscribe((res:any)=>{
    if(res.result){
      this.getAllSalaryAdvnace();
      this.closeSidePanel();
      this.showUpdateMessage();
      this.onReset();
    }
  })
}

onEdit(obj : any){
this.salarayAdvanceObj = obj;
this.openSidePanel();
}
onDelete(id : number){
this.http.get("http://onlinetestapi.gerasim.in/api/TeamSync/DeleteAdvanceById?advanceid="+id).subscribe((res:any)=>{
  if(res.result){
    this.getAllSalaryAdvnace();
    this.showErrorDelete();
  }
});

}
onReset(){
  this.salarayAdvanceObj = {
    "empName": "",
    "empContactNo": "",
    "employeeId": 0,
    "advanceDate": "",
    "advanceAmount": 0,
    "advanceId": 0,
    "reason": "",
  }
}

  closeSidePanel() {
    this.isSidePanelOpen = false;
    this.onReset();
  }
  openSidePanel() {
    this.isSidePanelOpen = true;

  }
  myFilter = (d: Date | null): boolean => {
    const day = (d || new Date()).getDay();
    // Prevent Saturday and Sunday from being selected.
    return day !== 0 && day !== 6;
  };

  showMessage(severity: string, summary: string, detail: string): void {
    this.messageService.add({ severity, summary, detail });
  }
  showUpdateMessage(): void {
    this.showMessage('success', '', 'Update was successful.');
  }

  showSuccessMessage(): void {
    this.showMessage('success', 'Success Message', 'Saved was successful.');
  }

  showErrorDelete(): void {
    this.showMessage('error', '', 'Record Deleted.');
  }
  showError(): void {
    this.showMessage('error', '', 'Undifine');
  }







}
