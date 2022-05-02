import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../service/auth.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-editpage',
  templateUrl: './editpage.component.html',
  styleUrls: ['./editpage.component.css']
})
export class EditpageComponent implements OnInit {
  id = this._route.snapshot.params['id'];

  user: any = {};
  userEdit: any = {};
  selectedValue = null;
  numGender: string;
  image: File = null;

  constructor(private _authService: AuthService,
              private _router: Router,
              private _route: ActivatedRoute) { }

  ngOnInit(): void {
    if (this.id !== undefined) {
      this._authService.getUserById(this.id).subscribe(
        user => {
          this.user = user
          console.log(this.id)
        }
      );
    }
  }

  onSelectProfile() {
    this._router.navigate(['/myprofile', this.id]);
    console.log("Passed id: " + this.id);
  }

  onChangeSelect(newvalue){
    this.numGender = newvalue.target.value;
    if (this.numGender == '1') {
      this.user.gender = 'Male';
      console.log('gender is ' + this.user.gender);
    }
    if (this.numGender == '2') {
      this.user.gender = 'Female';
      console.log('gender is ' + this.user.gender);
    }
  }

  updateProfileData() {
    const fd = new FormData();
    fd.append('imagePath', this.image, this.image.name)
    fd.append('firstname', this.user.firstname)
    fd.append('lastname',  this.user.lastname)
    fd.append('birthday',  this.user.birthday)
    fd.append('gender',    this.user.gender)
    this._authService.putUserById(this.id, fd)
      .subscribe(
        res => {
          console.log(res)
          this._router.navigate(['/myprofile', this.id]);
        },
        err => console.log(err)
      )
  }

  createUser() {
    const fd = new FormData();
    fd.append('imagePath', this.image, this.image.name)
    fd.append('email', this.user.email)
    fd.append('password', this.user.password)
    fd.append('firstname', this.user.firstname)
    fd.append('lastname',  this.user.lastname)
    fd.append('birthday',  this.user.birthday)
    fd.append('gender',    this.user.gender)
    this._authService.createUser(fd)
      .subscribe(
        res => {
          console.log(res)
          this._router.navigate(['/myprofile', res._id]);
        },
        err => console.log(err)
      )
  }

  selectImage(event) {
    if (event.target.files.length > 0) {
      this.image = <File>event.target.files[0];
    }
  }

}