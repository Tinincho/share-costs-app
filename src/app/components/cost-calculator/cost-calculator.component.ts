import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule , FormGroup } from '@angular/forms';
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
    } else {

      this.contactProducts.splice(this.contactProducts.indexOf(getProduct), 1);
    }
  }

  createContact(getContactString: string): void {

    this.productService.productsArray.forEach(element => {

      if (this.contactProducts.includes(element)) {

        element.cantityOfOwners++;
      }
    });

    var newContact = new Contact(getContactString.split(".")[0], getContactString.split(".")[1]);

    newContact.setProducts(this.contactProducts);

    this.contactsList.push(newContact);

    console.log(this.productService.productsArray);
    console.log(this.contactProducts);
    console.log(this.contactsList);
  }

  calculateCosts(): void {
    this.contactsList.forEach(contactIterator => {

      console.log(contactIterator.productsOwned);
      contactIterator.productsOwned.forEach(element => {

        contactIterator.totalToPay += element.price / element.cantityOfOwners;
      });
    });

    console.log(this.productService.productsArray);
    console.log(this.contactProducts);
    console.log(this.contactsList);
  }
  sendMessage(contact: Contact): void {

    window.open(`https://web.whatsapp.com/send?phone=${contact.phoneNumber}&text=${contact.name} tiene que pagar $${contact.totalToPay}`, '_blank');
    // window.open(`https://wa.me/${contact.phoneNumber}?text=${contact.name}tienequepagar$${contact.totalToPay}`, '_blank');
    const keyEvent = new KeyboardEvent("keydown", { key: "Enter" });

    //Trigger Eneter + Shift key Press
    // const keyEvent = new KeyboardEvent("keydown", { key: "Enter", shiftKey: true });
    document.body.dispatchEvent(keyEvent);
  }

  check(event: Event): void {

    event.preventDefault();
  }
}
