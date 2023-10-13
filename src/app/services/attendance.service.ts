import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AttendanceService {

  constructor(private http : HttpClient) { }



getAllAttendance(): Observable<any>  {
  return this.http.get("http://onlinetestapi.gerasim.in/api/TeamSync/GetAllAttendance" )
}

createAttendance(obj : any):Observable<any>{
  return this.http.post("http://onlinetestapi.gerasim.in/api/TeamSync/AddAttendance",obj)
}
getAttendanceId(id:number):Observable<any>{ // Edit //
  return this.http.get("http://onlinetestapi.gerasim.in/api/TeamSync/DeleteAttendanceById?attendanceid="+ id)
}

updateAttendance(obj:any){
  return this.http.post("http://onlinetestapi.gerasim.in/api/TeamSync/UpdateAttendance",obj)
}
deleteAttendance(id:number):Observable<any>{
  return this.http.get("http://onlinetestapi.gerasim.in/api/TeamSync/DeleteAttendanceById?attendanceid="+id)
}
}


