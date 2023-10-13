import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../services/employee.service';
import { MatDialog } from '@angular/material/dialog';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css'],
  providers : [MessageService]
})
export class EmployeeComponent implements OnInit {
  visible: boolean = false;
  first = 0;

  rows = 10;
  value = '';
  sidebarVisible2: boolean = false
  employeeArray: any[] = [];

  employeeObj: any = {

    "empId": 0,
    "empName": "",
    "empContactNo": "",
    "empAltContactNo": "",
    "empEmail": "",
    "addressLine1": "",
    "addressLine2": "",
    "pincode": "",
    "city": "",
    "state": "",
    "bankName": "",
    "iFSC": "",
    "accountNo": "",
    "bankBranch": "",
    "salary": 0

  }


  constructor(private srv: EmployeeService , private dialog : MatDialog , private messageService : MessageService) { }

  ngOnInit(): void {
    this.loadAllEmployee();
  }

  loadAllEmployee() {
    this.srv.getAllEmployee().subscribe((res: any) => {
      this.employeeArray = res.data;
    })
  }





  saveEmployee() {

    this.srv.createEmployee(this.employeeObj).subscribe((res: any) => {

      if (res.result) {
        this.loadAllEmployee();
        this.showSuccessMessage()
        this.hideDialog();
      } else {
        this.showError()
      }



    })

  }
  onReset(){
    this.employeeObj ={
      "empId": 0,
    "empName": "",
    "empContactNo": "",
    "empAltContactNo": "",
    "empEmail": "",
    "addressLine1": "",
    "addressLine2": "",
    "pincode": 0,
    "city": "",
    "state": "",
    "bankName": "",
    "iFSC": "",
    "accountNo": "",
    "bankBranch": "",
    "salary": 0
    }
  }


  updateEmployees(){
    this.srv.updateEmployee(this.employeeObj).subscribe((res:any)=>{
      if(res.result){
        this.loadAllEmployee();
        this.showUpdateMessage()
        this.hideDialog();
        this.onReset();
      } else{
       this.showError()
      }


    })
  }
  onEdit(id:number){

      this.srv.getEmpId(id).subscribe((res:any)=>{
      this.employeeObj = res.data;

    });
    this.showDialog();


  }
  onDelete(empId:number){
    this.srv.deleteEmployee(empId).subscribe((res :any)=>{
      if(res.result){
        this.loadAllEmployee();
        this.showErrorDelete();
      }else{
        this.showError()
      }
    })
  }

  showDialog() {
      this.visible = true;
      this.onReset()
   }
   hideDialog(){
    this.visible = false;

   }

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


















