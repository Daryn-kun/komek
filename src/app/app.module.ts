import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HomeComponent } from './home/home.component';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { AuthService } from './service/auth.service';
import { FundraisingService } from './service/fundraising.service';
import { AuthGuard } from './guards/auth.guard';
import { TokenInterceptorService} from './service/token-interceptor.service';
import { FundraisingComponent } from './fundraising/fundraising.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { DonateComponent } from './donate/donate.component';
import { FundraiserComponent } from './fundraiser/fundraiser.component';
import { CategoryService } from './service/category.service';
import { DonationService } from './service/donation.service';
import { MypageComponent } from './myprofile/mypage/mypage.component';
import { EditpageComponent } from './myprofile/editpage/editpage.component';
import { MydonationsComponent } from './myprofile/mydonations/mydonations.component';
import { ChangepassComponent } from './myprofile/changepass/changepass.component';
import { AboutComponent } from './about/about.component';
import { CategoryComponent } from './category/category.component';
import { AdminModule } from './admin/admin.module';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SigninComponent,
    SignupComponent,
    FundraisingComponent,
    HeaderComponent,
    FooterComponent,
    DonateComponent,
    FundraiserComponent,
    MypageComponent,
    EditpageComponent,
    MydonationsComponent,
    ChangepassComponent,
    AboutComponent,
    CategoryComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    NgbModule,
    AdminModule
  ],
  providers: [
    AuthService,
    AuthGuard, 
    FundraisingService, 
    CategoryService,
    DonationService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
