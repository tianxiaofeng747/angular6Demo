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
    }).then(result => {
      let data = result.data;
      sessionStorage.setItem('token', data.token);
      sessionStorage.setItem('clientId', data.clientId);
      this.User = data;
    });
  }
  login (form){
    return new Promise((resolve, reject) =>{      
      this.api.post('login',form).then(result =>{
        let data = result.data;
        if(data){
          Object.assign(this.User, data);
          resolve(data);
        }else{
          reject(result);
        }
        
      });
    })
  
  }
}
