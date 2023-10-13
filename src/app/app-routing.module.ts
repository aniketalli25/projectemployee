import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { LayoutComponent } from './layout/layout.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AttendancePageComponent } from './attendance-page/attendance-page.component';
import { EmployeeComponent } from './employee/employee.component';
import { LeavePageComponent } from './leave-page/leave-page.component';
import { SalaryAdvanceComponent } from './salary-advance/salary-advance.component';
import { SalaryRecordComponent } from './salary-record/salary-record.component';


const routes: Routes = [

  { path:'', redirectTo : '/login' , pathMatch : 'full', },
  { path:'login', component : LoginComponent ,},
  {
    path : 'login',
    component:LoginComponent,

  },
  {
    path : '',
    component : LayoutComponent,
    children:[
      { path : 'dashboard', component:DashboardComponent, },
      {path:'attendance', component:AttendancePageComponent,},
      {path:'employee', component:EmployeeComponent,},
      { path:'leavePage', component:LeavePageComponent,},
      {path:'salaryAdvance', component:SalaryAdvanceComponent,},
      {path:'salaryRecord', component:SalaryRecordComponent,},

    ]
  }




];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
