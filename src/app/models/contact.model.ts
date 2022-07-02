import { Product } from "./product.model";

export class Contact {

    public name: string = "";
    public phoneNumber: string = "";
    public productsOwned: Product[] = [];
    public totalToPay = 0;

    constructor(setName: string, setPhoneNumber: string) {

        this.name = setName;
        this.phoneNumber = setPhoneNumber;
    }

    setProducts(setProductsOwned: Product[]): void {
        this.productsOwned = setProductsOwned;
    }
    setTotalToPay(setTotalToPay: number): void {
        this.totalToPay = setTotalToPay;
    }
}