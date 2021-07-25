import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js';

// core components
import {
  chartOptions,
  parseOptions,
  chartExample1,
  chartExample2
} from "../../variables/charts";
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
  public orders: any = [];
  public ordersSinceYesterday: any = [];
  public usersSinceLastWeek: any = 0;
  public data: any;
  public ordersChart: any = [];
  public salesChart;
  public clicked = true;
  public clicked1 = false;

  ngOnInit() {
this.userService.getUsers().subscribe(res => {
  this.users = res;
});
 this.userService.getUsersSinceLastWeek().subscribe(res => {
  this.usersSinceLastWeek = res;
});
    this.orderService.getOrders().subscribe(res => {
  this.orders = res.data;
});
    this.orderService.getOrdersSinceYesterday().subscribe(res => {
  this.ordersSinceYesterday = res;
});
 this.orderService.getOrdersChart().subscribe(res => {
  this.ordersChart = res;
});
    this.datasets = [
      this.ordersChart,
      this.ordersChart
    ];
    this.data = this.datasets[0];


    var chartOrders = document.getElementById('chart-orders');

    parseOptions(Chart, chartOptions());


    var ordersChart = new Chart(chartOrders, {
      type: 'bar',
      options: chartExample2.options,
      data: chartExample2.data
    });

    var chartSales = document.getElementById('chart-sales');

    this.salesChart = new Chart(chartSales, {
			type: 'line',
			options: chartExample1.options,
			data: chartExample1.data
		});
  }


  public updateOptions() {
    this.salesChart.data.datasets[0].data = this.data;
    this.salesChart.update();
  }

}
