export interface Iattendance {
  empName: string
  empContactNo:string
  attendanceId: number
  employeeId: number
  attendanceDate:string
  inTime: string
  outTime: string
  isFullDay: boolean
}
export class attendance {
  attendanceId: number;
  employeeId: number;
  attendanceDate ?:Date;
  inTime?: Date;
  outTime?: Date;
  isFullDay: boolean;

  constructor(){
    this.attendanceDate = undefined ;
    this.attendanceId = 0;
    this.employeeId=0;
    this.inTime = undefined;
    this.outTime=undefined;
    this.isFullDay = false;

  }
}
