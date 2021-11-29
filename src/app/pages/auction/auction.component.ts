import { Component, OnInit } from '@angular/core';
import {UsersService} from '../../services/users.service';
import {OrdersService} from '../../services/orders.service';
import {chartExample2, chartOptions, parseOptions} from '../../variables/charts';
import {AuctionService} from '../../services/auction.service';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-auction',
  templateUrl: './auction.component.html',
  styleUrls: ['./auction.component.css']
})
export class AuctionComponent implements OnInit {
  constructor(private userService: UsersService,
    private modalService: NgbModal,
    private auctionService: AuctionService) {  }
public auctions: any = [];
closeResult = '';
  ngOnInit() {
this.auctionService.getAllAuctions().subscribe(res => {
  this.auctions = res.filter(a => a.fromAdmin === false);
  this.auctions.forEach(a => {
    a.auction_cutoff = a.auction_cutoff.substring(0, a.auction_cutoff.length - 1);
  });
});
  }

  deleteAuction(id) {
    this.auctionService.deleteAuction(id).subscribe(res => {
      this.ngOnInit();
    });
  }
  editAuction(auction, text, element) {
      auction[element] = text;
      console.log(auction);
  }
  saveAuction(auction) {
 this.auctionService.editAuction(auction.id, auction).subscribe(res => {
   alert('changed successfully');
 },
   error => alert('Error!! check your values'));
  }
  open(content, id) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason, id)}`;
    });
  }
  addA(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      // this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any, id): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      this.deleteAuction(id);
    }
  }
}
