import { Component, OnInit } from '@angular/core';
import { Contact } from 'src/app/models/contact.model';
import { ContactService } from 'src/app/services/contact.service';

@Component({
  selector: 'app-upload-contacts',
  templateUrl: './upload-contacts.component.html',
  styleUrls: ['./upload-contacts.component.css']
})
export class UploadContactsComponent implements OnInit {

  constructor(public contactService: ContactService) {
    this.contactService.getDataBase();
  }

  ngOnInit(): void {
  }

  uploadToFirebase(setContactName: string, setContactPhoneNumber: string) {
    this.contactService.setNewContact(new Contact(setContactName, setContactPhoneNumber));
  }
}
