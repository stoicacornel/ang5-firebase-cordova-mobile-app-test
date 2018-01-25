import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { ListDetailServiceService } from "../../services/list-detail-service/list-detail-service.service";
import { Observable } from "rxjs/Observable";
import { Subscription } from "rxjs/Subscription";

@Component({
  selector: 'app-list-detail',
  templateUrl: './list-detail.component.html',
  styleUrls: ['./list-detail.component.css']
})
export class ListDetailComponent implements OnInit, OnDestroy {
  list: any = {};
  subscription: Subscription = new Subscription();
  id: string = '';
  tasks: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private listDetailService: ListDetailServiceService
  ) {
    this.subscription.add(this.route.queryParams.subscribe(
      params => {
        this.id = params['id'];
      }));
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  enableInput(index, task) {
    // Set temp value
    document.getElementById('hiddenInput' + index)['value'] = task;

    document.getElementById('input' + index)['disabled'] = false;

    document.getElementById('btnEdit' + index)['hidden'] = true;
    document.getElementById('btnSave' + index)['hidden'] = false;
    document.getElementById('btnCancel' + index)['hidden'] = false;
  }

  getBackupValue(index) {
    document.getElementById('input' + index)['value'] = document.getElementById('hiddenInput' + index)['value'];
  }

  disableInput(index) {
    document.getElementById('input' + index)['disabled'] = true;

    document.getElementById('btnEdit' + index)['hidden'] = false;
    document.getElementById('btnSave' + index)['hidden'] = true;
    document.getElementById('btnCancel' + index)['hidden'] = true;
  }

  ngOnInit() {
    if (this.id) {
      this.subscription.add(this.listDetailService.getListById(this.id).subscribe(
        list => {
          this.list = [];
          this.list = list;
          this.getAllTasks(list);
        }
      ));
    }
  }

  getAllTasks(list) {
    this.tasks = [];
    for(let task in list) {
      if (list.hasOwnProperty(task)) {
        // We ignore the 'id' property and the properties that has a value of false in the database
        if (task !== 'id' && list[task]) {
          this.tasks.push(task);
        }
      }
    }
  }

  addTask(value) {
    if (value) {
      this.listDetailService.addListProperty(value);
      document.getElementById('listId')['value'] = '';
    }
  }

  modifyProperty(index) {
    let oldValue = document.getElementById('hiddenInput' + index)['value'];
    let newValue = document.getElementById('input' + index)['value'];

    this.listDetailService.modifyListProperty(newValue, oldValue);

    this.disableInput(index);
  }

  deleteTasks() {
    for (let task of this.tasks) {
      if (document.getElementById(this.tasks.indexOf(task).toString())['checked']) {
        this.listDetailService.deleteListProperty(task)
      }
    }
  }
}
