import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  loginUserData:any = {}
  constructor(private _auth: AuthService,
              private _router: Router) { }

  ngOnInit(): void {
  }

  loginUser(){
    this._auth.loginUser(this.loginUserData)
      .subscribe(
        res => { 
          console.log("USERROLE " + res.userRole),
          localStorage.setItem('token', res.token),
          localStorage.setItem('user_id', res.user_id)
          if(res.userRole === 1){
            this._router.navigate(['/admin'])
              .then(() => {
                window.location.reload();
              })
          } else{
            this._router.navigate([''])
              .then(() => {
                window.location.reload();
              })
          }
        },
        err => console.log(err)
      )
  }

}
