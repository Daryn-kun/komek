import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FundraisingService } from '../service/fundraising.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  fundraisings:any = []
  constructor(private _fundraisingService: FundraisingService,
              private _router: Router) { }

  ngOnInit(){
    this._fundraisingService.getFundraisings()
      .subscribe(
        res => this.fundraisings = res,
        err => console.log(err)
      )
  }
  onSelect(id: String){
    this._router.navigate(['/fundraising', id]);
    console.log("Passed id: " + id);
  }

  getAmount(value){
    return this._fundraisingService.getAmountShort(value);
  }

}
