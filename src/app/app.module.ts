import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { ServiceWorkerModule } from '@angular/service-worker';
import { AppComponent } from './app.component';

import { AppRoutingModule }     from './app-routing.module';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from "angularfire2/database";
// import { AngularFirestoreModule } from "angularfire2/firestore";
import { environment } from '../environments/environment';


import { HomeComponent } from './components/home/home.component';
import { ListService } from "./services/lists/lists.service";
import { ListDetailComponent } from './components/list-detail/list-detail.component';
import {ListDetailServiceService} from "./services/list-detail-service/list-detail-service.service";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ListDetailComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    // For offline capabilities of Firestore
    // AngularFirestoreModule.enablePersistence(),
    AppRoutingModule
  ],
  providers: [
    ListService,
    ListDetailServiceService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
