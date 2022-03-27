import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { FundraisingService } from '../service/fundraising.service';

@Component({
  selector: 'app-donate',
  templateUrl: './donate.component.html',
  styleUrls: ['./donate.component.css']
})
export class DonateComponent implements OnInit {

  id = this._route.snapshot.params['id'];
  fundraising:any = []
  userData: any = []

  constructor(private _fundraisingService: FundraisingService,
              private _authService: AuthService,
              private _route: ActivatedRoute) { }

  ngOnInit(): void {
    // Getting fundraising data from db
    this._fundraisingService.getFundraisingById(this.id)
      .subscribe(
        res => {
          // get user data from db
          this._authService.getUserById(res.userid)
            .subscribe(
              user => {
                this.userData    = user
                this.fundraising = res
                console.log(res.userid)
              }
            );
        },
        err => console.log(err)
      )
  }

}
