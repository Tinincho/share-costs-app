import { Component, OnInit } from '@angular/core';
import { Contact } from 'src/app/models/contact.model';
import { Product } from 'src/app/models/product.model';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-upload-products',
  templateUrl: './upload-products.component.html',
  styleUrls: ['./upload-products.component.css']
})
export class UploadProductsComponent implements OnInit {

  constructor(public productService: ProductService) {
    this.productService.getDataBase();
  }

  ngOnInit(): void {
  }

  uploadToFirebase(setProductName: string, setProductPrice: string) {
    this.productService.setNewProduct(new Product(setProductName, Number(setProductPrice)));
  }
}
