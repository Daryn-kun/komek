import { DepFlags } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { CategoryService } from '../service/category.service';
import { FundraisingService } from '../service/fundraising.service';

@Component({
  selector: 'app-fundraiser',
  templateUrl: './fundraiser.component.html',
  styleUrls: ['./fundraiser.component.css']
})
export class FundraiserComponent implements OnInit {
  fundraiser:any = {};
  selectedObject:any = {};
  categories:any = [];
  image: File = null;
  selectedValue = null;
  constructor(private _fundraisingService: FundraisingService,
              private _categoryService: CategoryService,
              private _authService: AuthService,
              private _router: Router) { }

  ngOnInit(): void {
    this._categoryService.getCategories()
      .subscribe(
        res => this.categories = res,
        err => console.log(err)
      );
  }

  selectImage(event) {
    if (event.target.files.length > 0) {
      this.image = <File>event.target.files[0];
    }
  }

  onChangeSelect(newvalue){
    this.fundraiser.categoryid = newvalue.target.value
    console.log("new val " + newvalue.target.value)
  }

  createFundraising() {
    const fd = new FormData();
    fd.append('imagePath', this.image, this.image.name)
    fd.append('userid', this._authService.getLoggedUser())
    fd.append('title', this.fundraiser.title)
    fd.append('details', this.fundraiser.details)
    fd.append('categoryid', this.fundraiser.categoryid)
    fd.append('city', this.fundraiser.city)
    fd.append('amount_goal', this.fundraiser.amount_goal)
    fd.append('card_num', this.fundraiser.card_num)
    this._fundraisingService.createFundraising(fd)
    .subscribe(
      res => { 
        console.log(res)
        this._router.navigate(['/fundraising/' + res._id])
      },
      err => console.log(err)
    )
  }
}