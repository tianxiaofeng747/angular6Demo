import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  private User: Object;
  constructor(private api: ApiService) {

  }
  getCurrentUser() {
  
    this.api.post('currentUser', {
      token: sessionStorage.getItem('token')
    }).subscribe(result => {
      let data = result.data;
      sessionStorage.setItem('token', data.token);
      this.User = data;
    });
  }
  login (form){
    return new Promise((resolve, reject) =>{      
      this.api.post('login',form).subscribe(result =>{
        let data = result.data;
        Object.assign(this.User, data);
        resolve(data);
      });
    })
  
  }
}
