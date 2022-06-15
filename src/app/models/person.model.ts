import { Product } from "./product.model";

export class Person {

    public name:string;
    public productsOwned:Product[];
    public totalToPay = 0;

    constructor(setName:string, setProductsOwned:Product[]) {

        this.name = setName;
        this.productsOwned = setProductsOwned;
    }
}