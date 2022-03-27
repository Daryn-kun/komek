import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Router } from '@angular/router';

@Injectable()
export class AuthService {
  private _profilesUrl = "http://localhost:3000/profiles/"

  constructor(private http: HttpClient,
              private _router: Router) { }

  registerUser(user) {
    return this.http.post<any>(this._profilesUrl + 'register', user)
  }
  
  loginUser(user) {
    return this.http.post<any>(this._profilesUrl + 'login', user)
  }

  loggedIn() {
    return !!localStorage.getItem('token')
  }

  logoutUser() {
    localStorage.removeItem('token')
    localStorage.removeItem('user_id')
    this._router.navigate(['/signin'])
  }

  getToken() {
    return localStorage.getItem('token')
  }

  getLoggedUser(){
    return localStorage.getItem('user_id')
  }

  getUserById(id: String){
    console.log('userid passed ' + this._profilesUrl + id)
    return this.http.get<any>(this._profilesUrl + id)
  }
}
