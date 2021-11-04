import { Component, OnInit } from '@angular/core';
import {AuctionService} from '../../services/auction.service';
import {UsersService} from '../../services/users.service';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.css']
})
export class UploadFileComponent implements OnInit {
users = [];
  userForm: FormGroup;

  constructor(private fb: FormBuilder, private auctionService: AuctionService, private userService: UsersService) { }
  fileName = '';
  fileName2 = '';

  ngOnInit(): void {
    this.userForm = this.fb.group({
      userId: [null]
    });
    this.auctionService.me().subscribe();
    this.userService.getUsers().subscribe(res => {
      this.users = res;
    });
  }
  onFileSelected(event) {

    const file: File = event.target.files[0];

    if (file) {

      this.fileName = file.name;
      const formData = new FormData();
      formData.append('file', file);
      this.auctionService.setAuctionFile(formData).subscribe(r => {
        alert('successfully ' +  r.data);
      },
        error => alert('error, check you csv format'));
    }
  }
  onFileSelected2(event) {

    const file: File = event.target.files[0];

    if (file) {

      this.fileName2 = file.name;
      const formData = new FormData();
      formData.append('file', file);
      if (this.userForm.value.userId) {
        this.auctionService.setOrderFile(formData, this.userForm.value.userId).subscribe(r => {
            alert('successfully ' + r.data);
          },
          error => alert('error, check you csv format'));
      } else {
        alert('please select a user  ' + this.userForm.value.userId);
      }
    }
  }
}
