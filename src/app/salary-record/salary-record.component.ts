import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { EmployeeService } from '../services/employee.service';

@Component({
  selector: 'app-salary-record',
  templateUrl: './salary-record.component.html',
  styleUrls: ['./salary-record.component.css'] ,
  providers:[MessageService],
})
export class SalaryRecordComponent implements OnInit {
  isSidePanelOpen: boolean = false;
  salaryRecordArray : any []=[];
  employeeArray : any []=[];
  totalAdvanceAmout : number = 0;
  totalLeaves : number = 0;
  salarayRecordObj: any = {
    "empName": "",
    "empContactNo": "",
    "employeeId":0,
    "salaryDate": "",
    "presentDays": 0,
    "salaryAmount": 0,
    "salaryId": 0,
    "totalAdvance": 0,
  }
  constructor(private http: HttpClient , private srv :EmployeeService , private messageService : MessageService) { }

  ngOnInit(): void {
    this.getAllSalaryRecord();
    this.getAllEmployee();
  }

  getAllEmployee(){
    this.srv.getAllEmployee().subscribe((res:any)=>{
      this.employeeArray = res.data;
    })
  }
  getAllSalaryRecord(){
    this.http.get("http://onlinetestapi.gerasim.in/api/TeamSync/GetAllSalary").subscribe((res:any)=>{
      this.salaryRecordArray = res.data;
    })
  }

  getEmpData(){
    this.getAllAdvance();
    this.getAllLeaves();
  }
  getAllAdvance(){
    debugger
    this.http.get("http://onlinetestapi.gerasim.in/api/TeamSync/GetAllAdvance").subscribe((res:any)=>{
    const data = res.data.filter((m:any)=> m.employeeId == this.salarayRecordObj.employeeId);
    data.forEach((element:any) => {
      this.totalAdvanceAmout = this.totalAdvanceAmout + element.advanceAmount;
    });
    debugger
    this.salarayRecordObj.totalAdvance = this.totalAdvanceAmout;
    })
  }
  getAllLeaves(){
    debugger
    this.http.get("http://onlinetestapi.gerasim.in/api/TeamSync/GetAllLeaves").subscribe((res:any)=>{
      debugger
      this.totalLeaves = res.data.filter((m:any)=> m.employeeId == this.salarayRecordObj.employeeId).length;
      this.salarayRecordObj.presentDays = 30 - this.totalLeaves;
    })
  }
  saveSalary(){
    this.http.post("http://onlinetestapi.gerasim.in/api/TeamSync/AddSalary",this.salarayRecordObj).subscribe((res:any)=>{
      if(res.result){
        this.getAllSalaryRecord();
        this.closeSidePanel();
        this.showSuccessMessage();

      }
    })
  }
  updateSalary(){
    this.http.post("http://onlinetestapi.gerasim.in/api/TeamSync/UpdateSalary",this.salarayRecordObj).subscribe((res:any)=>{
      if(res.result){
        this.getAllSalaryRecord();
        this.closeSidePanel();
        this.showUpdateMessage();
      }
    })
  }
  onReset(){
    this. salarayRecordObj = {
      "empName": "",
      "empContactNo": "",
      "employeeId":0,
      "salaryDate": "",
      "presentDays": 0,
      "salaryAmount": 0,
      "salaryId": 0,
      "totalAdvance": 0,
    }
  }
  onEdit(obj : any){
    this.salarayRecordObj = obj;
    this.openSidePanel();
  }
  onDelete(id : number){
    this.http.get("http://onlinetestapi.gerasim.in/api/TeamSync/DeleteSalaryById?salaryid="+id).subscribe((res:any)=>{
      this.getAllSalaryRecord();
      this.showErrorDelete();
    })
  }
  openSidePanel(){
    this.isSidePanelOpen = true;

  }
  closeSidePanel(){
    this.isSidePanelOpen=false;
    this.onReset();
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
