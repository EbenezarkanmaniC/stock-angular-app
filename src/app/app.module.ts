import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { NgbActiveModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppComponent } from './app.component';
import { LoginComponent, LoginFailedDialog } from './login/login.component';
import { AuthService } from './service/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AllCompanyComponent } from './all-company/all-company.component';
import { AddCompanyComponent } from './add-company/add-company.component';
import { AboutComponent } from './about/about.component';
import { CompanyFormComponent } from './company-form/company-form.component';
import { NavbarComponent } from './navbar/navbar.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent } ,
  { path: 'all-company', component: AllCompanyComponent },
  { path: 'add-company', component: AddCompanyComponent },
  { path: 'about', component: AboutComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LoginFailedDialog,
    AllCompanyComponent,
    AddCompanyComponent,
    AboutComponent,
    CompanyFormComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    NgbModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [AuthService,NgbActiveModal],
  bootstrap: [AppComponent]
})
export class AppModule { }
