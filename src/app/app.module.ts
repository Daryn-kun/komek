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
    FundraiserComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    NgbModule
  ],
  providers: [
    AuthService,
    AuthGuard, 
    FundraisingService, 
    CategoryService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
