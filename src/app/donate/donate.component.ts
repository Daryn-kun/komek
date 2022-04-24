import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { DonationService } from '../service/donation.service';
import { FundraisingService } from '../service/fundraising.service';

@Component({
  selector: 'app-donate',
  templateUrl: './donate.component.html',
  styleUrls: ['./donate.component.css']
})
export class DonateComponent implements OnInit {

  id = this._route.snapshot.params['id'];
  fundraising:any = []
  fundraiserUser: any = []
  donater:any = []
  range = 5;
  checkout:any = 
    {
      donation : 0,
      total    : 0,
      tip      : 0,
    }
  

  constructor(private _fundraisingService: FundraisingService,
              private _authService: AuthService,
              private _route: ActivatedRoute,
              private _donationService: DonationService,
              private _router: Router) { }

  ngOnInit(): void {
    // Getting fundraising data from db
    this._fundraisingService.getFundraisingById(this.id)
      .subscribe(
        res => {
          // get user data from db
          this._authService.getUserById(res.userid)
            .subscribe(
              user => {
                this.fundraiserUser = user
                this.fundraising    = res
                console.log(res.userid)
              }
            );
        },
        err => console.log(err)
      )
    
    this._authService.getUserById(this._authService.getLoggedUser())
      .subscribe(
        res => this.donater = res,
        err => console.log(err)
      )
  }

  onChangeRange(newvalue){
    this.range = newvalue.target.value
    this.checkout.tip = this.checkout.donation * (this.range / 100)
    this.checkout.total = +this.checkout.donation + +this.checkout.tip
    console.log('range ' + this.range)
  }

  onChangeDonation(newvalue){
    this.checkout.donation = newvalue.target.value
    this.checkout.tip = this.checkout.donation * (this.range / 100)
    this.checkout.total = +this.checkout.donation + +this.checkout.tip
    console.log('donation ' + this.checkout.donation)
  }
  makeDonation(){
    this.checkout.userid = this.donater._id
    this.checkout.fundraisingid = this.id
    this._donationService.createDonation(this.checkout)
    .subscribe(
      res => { 
        console.log(res)
        this._router.navigate(['/fundraising/' + this.id])
      },
      err => console.log(err)
    )
  }

}
