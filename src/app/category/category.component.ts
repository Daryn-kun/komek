import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from '../service/category.service';
import { DonationService } from '../service/donation.service';
import { FundraisingService } from '../service/fundraising.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  id = this._route.snapshot.params['id'];
  category:any = [];
  fundraisings:any = [];
  donations:any = [];

  constructor(private _route: ActivatedRoute,
              public _categoryService: CategoryService,
              public _fundraisingService: FundraisingService,
              public _donationService: DonationService,
              private _router: Router) { }

  ngOnInit(): void {
    this._fundraisingService.getFundraisingByCategory(this.id)
    .subscribe(
      res => this.fundraisings = res,
      err => console.log(err)
    );
    this._categoryService.getCategoryById(this.id)
      .subscribe(
        res => this.category = res,
        err => console.log(err)
      );
    this._donationService.getDonations()
      .subscribe(
        res => this.donations = res,
        err => console.log(err)
      )
    console.log(this.category)
  }

  getAmount(value){
    return this._fundraisingService.getAmountShort(value);
  }

  getDonationSum(id: String){
    console.log("get donation of " + id)
    let sortedDonations = this.donations.filter(x => x.fundraisingid == id);
    return this._fundraisingService.getAmountShort(this._fundraisingService.getTotal(sortedDonations))
  }

  getLastDonationDate(id: String){
    let sortedDonations = this.donations.filter(x => x.fundraisingid == id);
    if (sortedDonations.length > 0) {
      let lastDonation    = this._donationService.getSortedByDateDonations(sortedDonations).pop();
      return this._fundraisingService.getDateMess(lastDonation.date);
    } else {
      return "-"
    }
  }

  getTotalPercent(id: String, amount_goal: String){
    let sortedDonations = this.donations.filter(x => x.fundraisingid == id);
    let total = this._fundraisingService.getTotal(sortedDonations)
    let range = (Number(total) * 100) / Number(amount_goal);
    console.log('range ' + range)
    return range;
  }

}
