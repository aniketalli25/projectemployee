import { Component, OnInit } from '@angular/core';
import { AttendanceService } from '../services/attendance.service';
import { Iattendance, attendance } from '../classes/employeeAttendance';
import { MessageService } from 'primeng/api';
import { EmployeeService } from '../services/employee.service';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-attendance-page',
  templateUrl: './attendance-page.component.html',
  styleUrls: ['./attendance-page.component.css'],
  providers: [MessageService],

})
export class AttendancePageComponent implements OnInit {

  exampleHeader: any;
  isSidePanelOpen = false;
  visible: boolean = false;

  attendanceArray: Iattendance[] = [];
  attendanceObj: attendance = new attendance();
  employeeArray: any[] = [];


  constructor(private messageService : MessageService , private srv: AttendanceService, private Srv: EmployeeService, private http: HttpClient) {

  }
  ngOnInit(): void {
    this.loadAllAttendance();
    this.getAllEmployee();
  }

  loadAllAttendance() {
    this.srv.getAllAttendance().subscribe((res: any) => {
      this.attendanceArray = res.data;
    })
  }
  getAllEmployee() {
    this.Srv.getAllEmployee().subscribe((res: any) => {
      this.employeeArray = res.data;
    })
  }

  saveAttendance() {
    this.srv.createAttendance(this.attendanceObj).subscribe((res:any)=>{
      if (res.result) {
           this.loadAllAttendance();
           this.attendanceObj = new attendance()
           this.showSuccessMessage()
           this.closeSidePanel();
         }
    })

  }
  updatedAttendance() {
    this.srv.updateAttendance(this.attendanceObj).subscribe((Res:any)=>{
      if(Res.result){
        this.loadAllAttendance();
        this.showUpdateMessage();
        this.closeSidePanel();
      }
    })

  }
  onEdit(obj:any) {
    this.attendanceObj = obj;
    //  this.srv.getAttendanceId(id).subscribe((Res:any)=>{
    //   this.attendanceObj = Res.data;

    //  })

    this.openSidePanel();
  }



  onDelete(id: number) {
    this.srv.deleteAttendance(id).subscribe((res:any)=>{
      this.loadAllAttendance();
      this.showErrorDelete();
    })
  }


  onReset() {
    this.attendanceObj = {
      "attendanceId": 0,
      "employeeId": 0,
      "attendanceDate": undefined,
      "inTime": undefined,
      "outTime": undefined,
      "isFullDay": false,
    }

  }
  closeSidePanel() {
    this.isSidePanelOpen = false;
    this.onReset();
  }
  openSidePanel() {
    this.isSidePanelOpen = true;

  }
  //   showDialog() {
  //     this.visible = true;
  //     this.onReset()
  //  }
  //  hideDialog(){
  //   this.visible = false;

  //  }

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
