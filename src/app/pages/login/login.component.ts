import { Component, OnInit } from '@angular/core';
import Tools from '@/app/utils/global.common.ts';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import {Router} from '@angular/router';
import {UserService} from '../../service/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  validateForm: FormGroup;
  
  constructor( private router: Router, private fb: FormBuilder, private user : UserService) { }
  doLogin(){
    
  }
  
  submitForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[ i ].markAsDirty();
      this.validateForm.controls[ i ].updateValueAndValidity();
    }
    let token = sessionStorage.getItem('token');
    let clientId = sessionStorage.getItem('clientId');
    let obj = {
      userName: this.validateForm.value.userName,
      password: Tools.encryption(this.validateForm.value.password, clientId, token)
    }
    
    this.user.login(obj).then(data =>{
      //console.log(data);
      this.router.navigate(['./list']);
    }).catch(err =>{

    });
  }
  ngOnInit():void {
    this.user.getCurrentUser();
    this.validateForm = this.fb.group({
      userName: [ 'yosemite', [ Validators.required ] ],
      password: [ '123456', [ Validators.required ] ],
      remember: [ true ]
    });
    //this.doLogin();
  }

}
