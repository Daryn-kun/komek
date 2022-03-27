import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { CategoryService } from '../service/category.service';
import { FundraisingService } from '../service/fundraising.service';

@Component({
  selector: 'app-fundraising',
  templateUrl: './fundraising.component.html',
  styleUrls: ['./fundraising.component.css']
})
export class FundraisingComponent implements OnInit {
  id = this._route.snapshot.params['id'];
  fundraising:any = []
  firstName: String;
  lastName: String;
  category: String;

  constructor(private _fundraisingService: FundraisingService,
              private _router: Router,
              private _route: ActivatedRoute,
              private _authService: AuthService,
              private _categoryService: CategoryService) { }

  ngOnInit(){
    // Getting fundraising data from db
    this._fundraisingService.getFundraisingById(this.id)
      .subscribe(
        res => {
          // get user data from db
          this._authService.getUserById(res.userid)
            .subscribe(
              user => {
                this.firstName = user.firstname;
                this.lastName  = user.lastname;
                console.log(res.userid)
              }
            );
          // get category data from db
          this._categoryService.getCategoryById(res.categoryid)
            .subscribe(
              categ => {
                this.category = categ.name;
                console.log(categ.name);
              }
            );
          this.fundraising = res; 
        },
        err => console.log(err)
      )
  }


  getAmount(value){
    return this._fundraisingService.getAmountShort(value);
  }

  getDateAgo(value){
    return this._fundraisingService.getDateMess(value);
  }

  onDonate(id: String){
    this._router.navigate(['/donate', id]);
    console.log("Passed id: " + id);
  }

}
