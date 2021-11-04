import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuctionService} from '../../services/auction.service';
import {error} from 'protractor';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  auctionForm: FormGroup;
  constructor(private fb: FormBuilder, private auctionService: AuctionService) { }

  ngOnInit() {
    this.auctionForm = this.fb.group({
      currency: [null, Validators.required],
      rate_mid: [null, Validators.required],
      rate_start: [null, Validators.required],
      rate_end: [null, Validators.required],
      auction_cutoff: [null, Validators.required],
      cleared: [null, Validators.required],
      fix: [null, Validators.required],
      bank_name: [null, Validators.required],
    });
  }
  addAuction() {
    if (this.auctionForm.valid) {
      this.auctionService.addAuction({...this.auctionForm.value, fromAdmin: false}).subscribe(res => {
      }, err => {
        alert(err.error.message);
      });
    } else {
      alert('all data is required');
    }
  }
}
