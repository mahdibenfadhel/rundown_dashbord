import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import {UploadFileComponent} from '../../pages/upload-file/upload-file.component';
import {AuctionComponent} from '../../pages/auction/auction.component';
import {OrdersComponent} from '../../pages/orders/orders.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',      component: DashboardComponent },
    { path: 'upload',           component: UploadFileComponent },
    { path: 'auction',           component: AuctionComponent },
    { path: 'orders',           component: OrdersComponent }
];
