import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-mypage',
  templateUrl: './mypage.component.html',
  styleUrls: ['./mypage.component.css']
})
export class MypageComponent implements OnInit {
  userData: any = []
  userID: string;

  constructor(private _authService: AuthService,
              private _router: Router,
              private _route: ActivatedRoute) { }

  ngOnInit(): void {
    this.userID = this._authService.getLoggedUser();
    this._authService.getUserById(this.userID).subscribe(
      user => {
        this.userData = user
        console.log(this.userID)
      }
    )
  }

  onEdit() {
    this.userID = this._authService.getLoggedUser();
    this._router.navigate(['/editpage', this.userID]);
    console.log("Passed id: " + this.userID);
  }

  onChangePass() {
    this.userID = this._authService.getLoggedUser();
    this._router.navigate(['/changepass', this.userID]);
    console.log("Passed id: " + this.userID);
  }

  onDonations() {
    this.userID = this._authService.getLoggedUser();
    this._router.navigate(['/mydonations', this.userID]);
    console.log("Passed id: " + this.userID);
  }
}
