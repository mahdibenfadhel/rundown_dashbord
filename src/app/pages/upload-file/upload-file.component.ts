import { Component, OnInit } from '@angular/core';
import {AuctionService} from '../../services/auction.service';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.css']
})
export class UploadFileComponent implements OnInit {

  constructor(private auctionService: AuctionService) { }
  fileName = '';
  fileName2 = '';

  ngOnInit(): void {
    this.auctionService.me().subscribe()
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
      this.auctionService.setOrderFile(formData).subscribe(r => {
          alert('successfully ' +  r.data);
        },
        error => alert('error, check you csv format'));
    }
  }
}
