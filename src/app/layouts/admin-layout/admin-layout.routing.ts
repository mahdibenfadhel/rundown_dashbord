import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import {UploadFileComponent} from '../../pages/upload-file/upload-file.component';
import {AuctionComponent} from '../../pages/auction/auction.component';
import {OrdersComponent} from '../../pages/orders/orders.component';
import {RegisterComponent} from '../../pages/register/register.component';
import {UserProfileComponent} from '../../pages/user-profile/user-profile.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',      component: DashboardComponent },
    { path: 'upload',           component: UploadFileComponent },
    { path: 'auction',           component: AuctionComponent },
    { path: 'trades',           component: OrdersComponent },
    { path: 'addAuction',           component: UserProfileComponent }
];
