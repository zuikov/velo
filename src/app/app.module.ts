import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'; // <-- NgModel lives here
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap'; // import the NgbModule coming from Ng-bootstra1
import { NgbdModalBasic } from '../modal-basic';
import {NgbCarouselConfig} from '@ng-bootstrap/ng-bootstrap';
// import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { Angular2FontawesomeModule } from 'angular2-fontawesome/angular2-fontawesome'

import { CartService } from './cart/cart.service';



import { AppComponent } from './app.component';
import { AppRoutingModule } from './/app-routing.module';
import { IntroComponent } from './intro/intro.component';
import { WingsComponent } from './wings/wings.component';
import { CasesComponent } from './cases/cases.component';
import { CartComponent } from './cart/cart.component';
import { DeliveryComponent } from './delivery/delivery.component';
import { AboutComponent } from './about/about.component';
import { ConfigComponent } from './config/config.component';
import { InstructionsComponent } from './instructions/instructions.component';
import { InformationComponent } from './information/information.component';

const appRoutes: Routes = [
  { path: 'intro', component: IntroComponent },
  { path: 'wings', component: WingsComponent },
  {
    path: 'cases',
    component: CasesComponent
    // data: { title: 'FriendlyNumbers base' }
  },
  { path: 'delivery', component: DeliveryComponent },
  { path: 'instructions', component: InstructionsComponent },
  { path: 'information', component: InformationComponent },
  { path: 'cart', component: CartComponent },
  { path: '',
    redirectTo: 'intro',
    pathMatch: 'full'
  },
  { path: '**', redirectTo: '/' }
  // { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    NgbdModalBasic,
    IntroComponent,
    WingsComponent,
    CasesComponent,
    CartComponent,
    DeliveryComponent,
    AboutComponent,
    ConfigComponent,
    InstructionsComponent,
    InformationComponent
  ],
  imports: [
    RouterModule.forRoot(appRoutes, { useHash: true }),
    // RouterModule.forRoot(
    //   appRoutes,
    //   // <-- debugging purposes only
    //   { enableTracing: true } 
    // ),
    BrowserModule,
    // import HttpClientModule after BrowserModule.
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    // Add Bootstrap module here.
    NgbModule.forRoot(),
    // AngularFontAwesomeModule
    Angular2FontawesomeModule
  ],
  providers: [CartService],
  bootstrap: [AppComponent]
})
export class AppModule { }







