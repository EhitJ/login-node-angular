import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthGuard } from './_guards/auth.guard';
import { MatButtonModule, MatIconModule,
  MatCardModule, MatInputModule, MatToolbarModule,MatTableModule } from '@angular/material';
import { RegisterComponent, LoginComponent } from './_components/auth/index';
import { NavigationComponent } from './_components/navigation/navigation.component';
import { HomeComponent } from './_components/home/home.component';
import { AnnouncementService } from './_services/announcement.service';
import { AuthenticationService } from './_services/authentication.service';
import { environment } from '../environments/environment';
@NgModule({
  declarations: [
   	AppComponent,
    LoginComponent,
    RegisterComponent,
    NavigationComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NoopAnimationsModule,
    MatButtonModule, 
    MatIconModule, 
    MatCardModule,
    MatInputModule,
    MatToolbarModule,
    MatTableModule,
    
  ],
  providers: [
  	AuthGuard,
    AuthenticationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
