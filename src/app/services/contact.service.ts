import { Injectable, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { catchError, debounce, debounceTime, fromEvent, Observable } from 'rxjs';
import { Contact } from '../models/contact.model';

@Injectable({
    providedIn: 'root'
})
export class ContactService {
    contacts_array: Contact[];
    dataInDataBase: any;

    constructor(private angularFireBase: AngularFireDatabase) {
        this.contacts_array = [];
    }

    setDataBase() {
        this.angularFireBase.object('contacts/').update(this.contacts_array);
    }

    getDataBase() {
        return new Promise((resolve, reject) => {
            this.dataInDataBase = this.angularFireBase.object('contacts/').snapshotChanges();

            this.dataInDataBase.pipe(
                catchError(async (error) => reject(this.message))
            ).subscribe((action: { payload: { val: () => Contact[]; }; }) => {
                resolve(this.contacts_array = action.payload.val());
            });
        });
    }

    setNewContact(new_contact: Contact): void {
        this.contacts_array.push(new_contact);
        this.setDataBase();
    }

    message(message: any): void | PromiseLike<void> {
        throw new Error('Function not implemented.');
    }
}