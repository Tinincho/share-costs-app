import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Person } from 'src/app/models/person.model';
import { Product } from 'src/app/models/product.model';

@Component({
  selector: 'app-cost-calculator',
  templateUrl: './cost-calculator.component.html',
  styleUrls: ['./cost-calculator.component.css']
})
export class CostCalculatorComponent implements OnInit {

  public productsList:Product[] = [];

  public personsList:Person[] = [];
  public personProducts:Product[] = [];

  constructor() { }

  ngOnInit():void { }

  createProduct(getName:string, getPrice:string):void {

    var getPriceNumber = Number(getPrice)
    this.productsList.push(new Product(getName, getPriceNumber));
  }

  addProductToPerson(getProduct:Product):void {

    if (!this.personProducts.includes(getProduct)) {

      this.personProducts.push(getProduct);
    } else {

      this.personProducts.splice(this.personProducts.indexOf(getProduct), 1);
    }
  }

  createPerson(getName:string, getNumber:string,  getProducts:Product[]):void {

    var setProducts:Product[] = [];

    this.productsList.forEach(element => {

        if (getProducts.includes(element)) {

          setProducts.push(element);
          element.cantityOfOwners++;
        }
    });

    this.personsList.push(new Person(getName,getNumber, setProducts));

    console.log(this.productsList);
    console.log(getProducts);
    console.log(this.personsList);
    console.log(getNumber);
  }

  calculateCosts():void {

    this.personsList.forEach(personIterator => {

      personIterator.productsOwned.forEach(element => {

        personIterator.totalToPay += element.price / element.cantityOfOwners;
      });
    });
  }

  sendMessage():void {
    this.personsList.forEach(person => {
      window.open(`https://web.whatsapp.com/send?phone=${person.phoneNumber}&text=${person.name} tiene que pagar $${person.totalToPay}`);
      
  })
  }
  onSubmit(form:FormGroup):void {
      
      this.createProduct(form.value.productName, form.value.productPrice);
      this.createPerson(form.value.personName,form.value.personNumber, form.value.personProducts);
      this.calculateCosts();
    }

    check(e:Event):void {

      e.preventDefault();
    }


}
