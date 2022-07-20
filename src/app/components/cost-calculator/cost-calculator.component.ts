import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { Contact } from 'src/app/models/contact.model';
import { Product } from 'src/app/models/product.model';
import { ContactService } from 'src/app/services/contact.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-cost-calculator',
  templateUrl: './cost-calculator.component.html',
  styleUrls: ['./cost-calculator.component.css']
})
export class CostCalculatorComponent implements OnInit {

  public contactsList: Contact[] = [];
  public contactProducts: Product[] = [];

  constructor(public contactService: ContactService, public productService: ProductService) {
  }

  ngOnInit(): void { }

  addProductToContact(getProduct: Product): void {

    if (!this.contactProducts.includes(getProduct)) {

      this.contactProducts.push(getProduct);
      getProduct.cantityOfOwners++;
    } else {

      this.contactProducts.splice(this.contactProducts.indexOf(getProduct), 1);
      getProduct.cantityOfOwners--;
    }
  }

  createContact(getContactString: string): void {
    //console.log(this.contactsList.find(contact => contact.name ===  getContactString.split(".")[0]));

    if (!this.contactsList.find(contact => contact.name === getContactString.split(".")[0])) {

      /*
      this.productService.productsArray.forEach(element => {

        if (this.contactProducts.includes(element)) {

          element.cantityOfOwners++;
        }
      });
      */

      var newContact = new Contact(getContactString.split(".")[0], getContactString.split(".")[1]);

      newContact.setProducts(this.contactProducts.slice());

      this.contactsList.push(newContact);

      /*
      console.log(this.productService.productsArray);
      console.log(this.contactProducts);
      console.log(this.contactsList);
      */
    }
  }

  seeProducts(getContactString: string): void {
    
    var getContact = this.contactsList.find(contact => contact.name === getContactString.split(".")[0]);

    if (getContact == undefined) {

      getContact = new Contact(getContactString.split(".")[0], getContactString.split(".")[1]);
      console.log("No debería pasar");
    }

    this.contactProducts = [];
    this.contactProducts = getContact.productsOwned.slice();
    getContact.setProducts(this.contactProducts);
  }

  calculateCosts(): void {
    this.contactsList.forEach(contactIterator => {

      contactIterator.setTotalToPay(0);

      contactIterator.productsOwned.forEach(element => {

        contactIterator.totalToPay += element.price / element.cantityOfOwners;
        console.log(element.cantityOfOwners);
      });
    });

    /*
    console.log(this.productService.productsArray);
    console.log(this.contactProducts);
    console.log(this.contactsList);
    */
  }
  sendMessage(contact: Contact): void {

    window.open(`https://web.whatsapp.com/send?phone=${contact.phoneNumber}&text=${contact.name} tiene que pagar $${contact.totalToPay}`, '_blank');
    const keyEvent = new KeyboardEvent("keydown", { key: "Enter" });
    document.body.dispatchEvent(keyEvent);
  }

  check(event: Event): void {

    event.preventDefault();
  }
}
