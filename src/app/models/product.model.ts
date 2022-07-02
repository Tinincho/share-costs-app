export class Product {

    public name: string;
    public price: number = 0;
    public cantityOfOwners: number = 0;

    constructor(setName: string, setPrice: number) {

        this.name = setName;
        this.price = setPrice;
    }
}