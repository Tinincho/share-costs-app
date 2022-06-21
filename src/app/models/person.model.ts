import { Product } from "./product.model";

export class Person {

    public name:string;
    public productsOwned:Product[];
    public totalToPay = 0;
    public phoneNumber:string = '';

    constructor(setName:string,setNumber:string, setProductsOwned:Product[]) {

        this.name = setName;
        this.productsOwned = setProductsOwned;
        this.phoneNumber = setNumber;
    }
}