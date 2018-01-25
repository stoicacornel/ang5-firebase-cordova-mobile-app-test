import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from "angularfire2/database";
import { Observable } from "rxjs/Observable";

@Injectable()
export class ListDetailServiceService {
  listRef: AngularFireObject<any>;
  list: Observable<any[]>;

  constructor(
    private afDb:  AngularFireDatabase
  ) {}

  getListById(id) {
    this.listRef = this.afDb.object('lists/' + id);

    return this.list = this.listRef.valueChanges();
  }

  addListProperty(value) {
    if (value !== 'id') {
      this.listRef.update({ [value]: true });
    } else {
      console.log('Cannot use id as a task, work in progress');
    }
  }

  modifyListProperty(newValue, oldValue) {
    if (newValue !== 'id') {
      this.listRef.update({ [newValue]: true });
      this.listRef.update({ [oldValue]: false });

    } else {
      console.log('Cannot use id as a task, work in progress');
    }
  }

  deleteListProperty(property: string) {
    this.listRef.update({ [property]: false });
  }
}
