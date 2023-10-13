import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EmployeeComponent } from './employee/employee.component';
import { AttendancePageComponent } from './attendance-page/attendance-page.component';
import { SalaryAdvanceComponent } from './salary-advance/salary-advance.component';
import { LeavePageComponent } from './leave-page/leave-page.component';
import { SalaryRecordComponent } from './salary-record/salary-record.component';
import { LoginComponent } from './login/login.component';
import { LayoutComponent } from './layout/layout.component';
import { FormsModule } from '@angular/forms';
import { SidebarModule } from 'primeng/sidebar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatDialogModule} from '@angular/material/dialog';
import {MatInputModule} from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';
import {MatPaginatorModule} from '@angular/material/paginator';
import { InputTextModule } from 'primeng/inputtext';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { ScrollerModule } from 'primeng/scroller';
import { DividerModule } from 'primeng/divider';
import { ToastModule } from 'primeng/toast';
import {MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldModule} from '@angular/material/form-field';
import {MatDatepickerModule} from '@angular/material/datepicker';

import {MatSelectModule} from '@angular/material/select';
import {ReactiveFormsModule} from '@angular/forms';
import {ThemePalette} from '@angular/material/core';
import { TreeSelectModule } from 'primeng/treeselect';
import {MatNativeDateModule} from '@angular/material/core';
import { DropdownModule } from 'primeng/dropdown';
import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';
import { CheckboxModule } from 'primeng/checkbox';
import {MatCheckboxModule} from '@angular/material/checkbox';



@NgModule({

  declarations: [
    AppComponent,
    DashboardComponent,
    EmployeeComponent,
    AttendancePageComponent,
    SalaryAdvanceComponent,
    LeavePageComponent,
    SalaryRecordComponent,
    LoginComponent,
    LayoutComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    SidebarModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatDialogModule,
    MatInputModule,
    MatCardModule,
    MatPaginatorModule,
    ButtonModule,
    InputTextModule,
    DialogModule,
    TableModule,
    ScrollerModule,
    DividerModule,
    ToastModule,
    MatFormFieldModule,
    MatSelectModule,
    MatDatepickerModule,
    ReactiveFormsModule,
    MatNativeDateModule,
    DropdownModule,
    TreeSelectModule,
    NgxMaterialTimepickerModule,
    CheckboxModule,
    MatCheckboxModule,

  ],
  providers: [
    {provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: {appearance: 'outline'}}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
