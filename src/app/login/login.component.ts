import {  HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers:[MessageService]

})
export class LoginComponent  {
  hide = true;
  loginObj = {
    username : '',
    password : '',
  }
  constructor ( private http : HttpClient , private router : Router, private loginservice : MessageService ){

   }
   Login(){
    if(this.loginObj.username == 'admin' && this.loginObj.password == '1234'){
      this.router.navigateByUrl('dashboard')
    } else{
      this.showErrorDelete()
    }
   }

   showMessage(severity: string, summary: string, detail: string): void {
    this.loginservice.add({ severity, summary, detail });
  }
   showErrorDelete(): void {
    this.showMessage('error', '', 'Invalid User ID or Password.');
  }









}
