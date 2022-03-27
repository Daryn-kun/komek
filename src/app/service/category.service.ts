import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private _categoryUrl = "http://localhost:3000/category/";
  constructor(private http: HttpClient) { }

  getCategories() {
    return this.http.get<any>(this._categoryUrl)
  }

  getCategoryById(id: String){
    console.log('id passed ' + this._categoryUrl + id)
    return this.http.get<any>(this._categoryUrl + id)
  }
}
