import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  registerUserData:any = {}
  constructor(private _auth: AuthService,
              private _router: Router) { }

  ngOnInit(): void {
  }

  registerUser(){
    this._auth.registerUser(this.registerUserData)
      .subscribe(
        res => { 
          console.log(res.user_id),
          localStorage.setItem('token', res.token),
          localStorage.setItem('user_id', res.user_id),
          this._auth.redirectTo('/')
        },
        err => console.log(err)
      )
  }

}
