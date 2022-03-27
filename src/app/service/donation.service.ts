import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DonationService {

  private _donationUrl = "http://localhost:3000/donation/";

  constructor(private http: HttpClient) { }

  createDonation(donation){
    console.log('passed donation ' + donation)
    return this.http.post<any>(this._donationUrl + 'donate', donation)
  }
}
