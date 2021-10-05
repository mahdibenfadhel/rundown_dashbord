import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js';

// core components
import {
  chartOptions,
  parseOptions,
  chartExample1,
  chartExample2
} from '../../variables/charts';
import {UsersService} from '../../services/users.service';
import {OrdersService} from '../../services/orders.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  constructor(private userService: UsersService,
              private orderService: OrdersService) {  }
  public datasets: any;
  public users: any = [];
  public chartFilters: any = [];
  public chartValues: any = [];
  public orders: any = [];
  public ordersSinceYesterday: any = [];
  public usersSinceLastWeek: any = 0;
  public data: any;
  public ordersChart: any = [];
  public userOrders: any = [];
  public salesChart;
  public clicked = true;
  public showOrders = false;
  public showAlarms = false;

  ngOnInit() {
this.userService.getUsers().subscribe(res => {
  this.users = res;
});
 this.userService.getUsersSinceLastWeek().subscribe(res => {
  this.usersSinceLastWeek = res;
});
    this.orderService.getOrders().subscribe(res => {
  this.orders = res.data;
  const currencies = [];
  this.orders.forEach(o => {
    currencies.push(o.auction.currency);
  });
      const counts = {};
      for (const i of currencies) {
        counts[i] = counts[i] ? counts[i] + 1 : 1;
      }
      this.chartFilters = currencies.filter(this.onlyUnique);
      this.chartFilters.forEach(c => {
        this.chartValues.push(counts[c]);
      });
      this.ordersChart = res;
      this.data = {
        labels: this.chartFilters,
        datasets: [
          {
            label: 'Sales',
            data: this.chartValues
          }
        ]
      };
      const chartOrders = document.getElementById('chart-orders');
      parseOptions(Chart, chartOptions());

      const ordersChart = new Chart(chartOrders, {
        type: 'bar',
        options: chartExample2.options,
        data: this.data
      });
});
    this.orderService.getOrdersSinceYesterday().subscribe(res => {
  this.ordersSinceYesterday = res;
});
 this.orderService.getOrdersChart().subscribe(res => {

});
    this.datasets = [
      this.ordersChart,
      this.ordersChart
    ];

  }


  public updateOptions() {
    this.salesChart.data.datasets[0].data = this.data;
    this.salesChart.update();
  }

  getOrders(id, type) {
    this.orderService.getOrdersById(id).subscribe( res => {
      this.userOrders = res;
    });
    this.showAlarms = !type;
    this.showOrders = type;
  }
  onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
  }
  deleteUser(id) {
this.userService.deleteUser(id).subscribe(res => {
  this.ngOnInit();
});
  }
  deleteOrder(id) {
this.orderService.delete0rder(id).subscribe(res => {
window.location.reload();
});
  }
}
