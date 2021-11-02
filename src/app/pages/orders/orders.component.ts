import { Component, OnInit } from '@angular/core';
import {UsersService} from '../../services/users.service';
import {AuctionService} from '../../services/auction.service';
import {OrdersService} from '../../services/orders.service';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  constructor(private userService: UsersService,
              private modalService: NgbModal,
              private orderService: OrdersService) {  }
  public auctions: any = [];
  closeResult = '';
  ngOnInit() {
    this.orderService.getOrders().subscribe(res => {
      this.auctions = res.data;
      this.auctions.forEach(a => {
        a.auction.auction_cutoff = a.auction_cutoff.substring(0, a.auction_cutoff.length - 1);
      });
    });
  }

  deleteAuction(id) {
    this.orderService.delete0rder(id).subscribe(res => {
      this.ngOnInit();
    });
  }
  open(content, id) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason, id)}`;
    });
  }

  private getDismissReason(reason: any, id): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      this.deleteAuction(id)
    }
  }
}
