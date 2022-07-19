import { Injectable, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { catchError, debounce, debounceTime, fromEvent, Observable } from 'rxjs';
import { Product } from '../models/product.model';

@Injectable({
    providedIn: 'root'
})
export class ProductService {
    productsArray: Product[] = [];
    dataInDataBase: any;

    constructor(private angularFireBase: AngularFireDatabase) {
    }

    setDataBase(): void {
        this.angularFireBase.object('products/').update(this.productsArray);
    }

    updateDataBase(): void {
        this.angularFireBase.object('products/').remove();
        this.angularFireBase.object('products/').update(this.productsArray);
    }

    getDataBase(): void {
        this.getContacts();
    }

    getContacts() {
        return new Promise((resolve, reject) => {
            this.dataInDataBase = this.angularFireBase.object('products/').snapshotChanges();

            this.dataInDataBase.pipe(
                catchError(async (error) => reject(this.message))
            ).subscribe((action: { payload: { val: () => Product[]; }; }) => {
                resolve(this.productsArray = action.payload.val());
            });
        });
    }

    setNewProduct(newProduct: Product): void {
        if (this.productsArray == null)
        {
            this.productsArray = [];
        }

        this.productsArray.push(newProduct);
        this.setDataBase();
    }

    deleteProduct(product: Product): void {
        var index = this.productsArray.indexOf(product);
        this.productsArray.splice(index, 1);
        this.updateDataBase();
    }

    message(message: any): void | PromiseLike<void> {
        throw new Error('Function not implemented.');
    }
}