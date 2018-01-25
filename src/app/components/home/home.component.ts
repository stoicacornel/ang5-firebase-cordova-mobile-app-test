import { Component, OnDestroy, OnInit } from '@angular/core';
import { ListService } from "../../services/lists/lists.service";
import { Subscription } from "rxjs/Subscription";
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/map';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  title: string = 'To Do List App';
  items: Observable<any[]>;
  subscription: Subscription = new Subscription();

  constructor(
    private listService : ListService
  ) { }

  ngOnInit() {
    this.getTDLs();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  getTDLs() {
    this.subscription.add(this.listService.getLists().subscribe(
      items => {
        this.items = items;
      }
    ));
  }

  createList(id) {
    if (id) {
      this.listService.createList(id);
    } else {
      console.log('Alert no name for the list');
    }
  }
}
