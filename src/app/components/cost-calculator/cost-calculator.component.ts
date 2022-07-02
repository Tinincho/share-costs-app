import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Contact } from 'src/app/models/contact.model';
import { Person } from 'src/app/models/person.model';
import { Product } from 'src/app/models/product.model';
import { ContactService } from 'src/app/services/contact.service';

@Component({
  selector: 'app-cost-calculator',
  templateUrl: './cost-calculator.component.html',
  styleUrls: ['./cost-calculator.component.css']
})
export class CostCalculatorComponent implements OnInit {

  public productsList:Product[] = [];
  public personProducts:Product[] = [];
  
  public personsList:Person[] = [];
  public setPersonName:string = "";
  public setPersonNumber:string = "";

  constructor(public contact_service: ContactService) {
    //this.contact_service.contacts_array;
  }

  ngOnInit():void { }

  createProduct(getName:string, getPrice:string):void {

    var getPriceNumber = Number(getPrice)
    this.productsList.push(new Product(getName, getPriceNumber));
  }

  setContactToPerson(getContact:Contact):void {
    
    this.setPersonName = getContact.name;
    this.setPersonNumber = getContact.phoneNumber;
  }

  addProductToPerson(getProduct:Product):void {

    if (!this.personProducts.includes(getProduct)) {

      this.personProducts.push(getProduct);
    } else {

      this.personProducts.splice(this.personProducts.indexOf(getProduct), 1);
    }
  }

  createPerson(getProducts:Product[]):void {

    var setProducts:Product[] = [];

    this.productsList.forEach(element => {

        if (getProducts.includes(element)) {

          setProducts.push(element);
          element.cantityOfOwners++;
        }
    });

    this.personsList.push(new Person(this.setPersonName, this.setPersonNumber, setProducts));

    console.log(this.productsList);
    console.log(getProducts);
    console.log(this.personsList);
    //console.log(getNumber);
  }

  calculateCosts():void {

    this.personsList.forEach(personIterator => {

      personIterator.productsOwned.forEach(element => {

        personIterator.totalToPay += element.price / element.cantityOfOwners;
      });
    });
  }

  sendMessage(person: Person):void {
   
       window.open(`https://web.whatsapp.com/send?phone=${person.phoneNumber}&text=${person.name} tiene que pagar $${person.totalToPay}`, '_blank');
      // window.open(`https://wa.me/${person.phoneNumber}?text=${person.name}tienequepagar$${person.totalToPay}`, '_blank');
      const keyEvent = new KeyboardEvent("keydown", { key: "Enter"});
  
      //Trigger Eneter + Shift key Press
      // const keyEvent = new KeyboardEvent("keydown", { key: "Enter", shiftKey: true });
      document.body.dispatchEvent(keyEvent);
 
  }
  onSubmit(form:FormGroup):void {
      
      this.createProduct(form.value.productName, form.value.productPrice);
      this.createPerson(form.value.personProducts);
      this.calculateCosts();
    }

    check(e:Event):void {

      e.preventDefault();
    }


}
