import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../services/employee.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-leave-page',
  templateUrl: './leave-page.component.html',
  styleUrls: ['./leave-page.component.css'] ,
  providers : [MessageService]
})
export class LeavePageComponent implements OnInit {

  isSidePanelOpen : boolean = false;
  leavesArray : any []=[];
  employeeArray : any []=[];
  leavesObj : any = {
    "empName": "",
      "empContactNo": "",
      "employeeId": 0,
      "leaveDate": "",
      "leaveId": 0,
      "leaveReason": "",
      "noOfFullDayLeaves": 0,
      "noOfHalfDayLeaves": 0,
  }


  constructor( private http : HttpClient , private leavesSrv : EmployeeService , private messageService :MessageService ){

  }
  ngOnInit(): void {
    this.getAllLeaves();
    this.getAllEmployees();
  }
  getAllLeaves(){
    this.http.get("http://onlinetestapi.gerasim.in/api/TeamSync/GetAllLeaves").subscribe((res:any)=>{
      this.leavesArray = res.data;
    })
  }
  getAllEmployees(){
    this.leavesSrv.getAllEmployee().subscribe((res:any)=>{
      this.employeeArray = res.data;
    })
  }
  saveLeaves(){
    this.http.post("http://onlinetestapi.gerasim.in/api/TeamSync/AddLeave" , this.leavesObj).subscribe((res:any)=>{
      if(res.result){
        this.getAllLeaves();
        this.closeSidePanel();
        this.showSuccessMessage();
      }
      this.onReset();
    })
  }
  updateLeaves(){
    this.http.post("http://onlinetestapi.gerasim.in/api/TeamSync/UpdateLeave" , this.leavesObj).subscribe((res:any)=>{
      if(res.result){
        this.getAllLeaves();
        this.closeSidePanel();
        this.showUpdateMessage();
      }
      this.onReset();
    })
  }
  onEdit(obj:any){
    this.leavesObj = obj ;
    this.openSidePanel();
  }
  onDelete(id : number){
    this.http.get("http://onlinetestapi.gerasim.in/api/TeamSync/DeleteLeaveById?leaveid="+ id).subscribe((res : any)=>{
      this.getAllLeaves();
      this.showErrorDelete();
    })
  }

  onReset(){
    this.leavesObj  = {
      "empName": "",
        "empContactNo": "",
        "employeeId": 0,
        "leaveDate": "",
        "leaveId": 0,
        "leaveReason": "",
        "noOfFullDayLeaves": 0,
        "noOfHalfDayLeaves": 0,
    }
  }
  openSidePanel(){
    this.isSidePanelOpen =true;

  }
  closeSidePanel(){
    this.isSidePanelOpen = false;
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
