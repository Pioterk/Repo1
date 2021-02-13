import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NavbarComponent } from './navbar/navbar.component';
import { environment } from 'src/environments/environment';
import { MaincontainerComponent } from './maincontainer/maincontainer/maincontainer.component';
import { UserService } from './services/user.service';
import { ReportService } from './services/report.service';
import { StrategyService } from './services/strategy.service';
import { NotificationService } from './services/notification.service';
import { MessageService } from './services/messages.service';
import { UploadFilesService } from './services/upload-files.service';
import { GenertedReportService } from './services/generted-report.service';
import { LoginComponent } from './login/login.component'
import { UploadFilesComponent } from './components/upload-files/upload-files.component';
import { CommonutlisModule} from './commonutlis/commonutlis.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { JwtModule, JWT_OPTIONS } from '@auth0/angular-jwt';
import { WebsocketService} from './services/websocket.service'

export function tokenGetter() {
  return localStorage.getItem('id_token');
}


@NgModule({
  declarations: [
    AppComponent,
    UploadFilesComponent,
    NavbarComponent,
    MaincontainerComponent,
    LoginComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    CommonutlisModule,
    NgbModule,
    JwtModule.forRoot({
      config: {
        tokenGetter : tokenGetter,
        allowedDomains: ["localhost:8080"],
      }
    }),



  ],
  providers: [UserService, MessageService,  GenertedReportService, NotificationService, ReportService, StrategyService, UploadFilesService, WebsocketService],
  bootstrap: [AppComponent]
})
export class AppModule { }