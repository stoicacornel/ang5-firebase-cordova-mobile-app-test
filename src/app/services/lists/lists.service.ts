import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from "angularfire2/database";
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/map';

@Injectable()
export class ListService {
  toDoListsRef: AngularFireList<any>;
  toDoLists: Observable<any[]>;

  constructor(
    private afDb:  AngularFireDatabase
  ) {
    this.toDoListsRef = this.afDb.list('lists');
    // Use snapshotChanges().map() to store the key
    this.toDoLists = this.toDoListsRef.snapshotChanges().map(changes => {
      return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    });
  }

  getLists(): any {
    return this.toDoLists;
  }

  createList(name: string) {

    this.getLists().subscribe(
      items => {
        let i = 0;

        for (let list of items) {
          i++;
          if (list.key == name) {
            console.log('List with that name already exists.');
            break;
          } else {
            if (i == items.length) {
              this.updateList(name, name);
              break;
            }
          }
        }
      }
    );
    // this.toDoListsRef.push({ id: name });
  }
  updateList(key: string, id: string) {
    this.toDoListsRef.update(key, { id: id });
  }

  deleteListByKey(key: string) {
    this.toDoListsRef.remove(key);
  }
  deleteAllLists() {
    const promise = this.toDoListsRef.remove();
    promise
      .then(_ => console.log('success'))
      .catch(err => console.log(err, 'You do not have access!'));
  }
}
