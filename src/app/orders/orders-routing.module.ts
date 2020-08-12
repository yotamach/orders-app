import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { OrdersComponent } from './orders.component';
import { OrderCreateComponent } from './order-create/order-create.component';
import { CanActivateGuard } from '../customer/guards/can-activate.guard';
import { CanDeactivateGuard } from '../customer/guards/can-deactivate.guard';

const routes: Routes = [
  { path: '', component: OrdersComponent },
  {
    path: 'create',
    component: OrderCreateComponent,
    canActivate: [CanActivateGuard],
    canDeactivate: [CanDeactivateGuard]
  }
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ],
  providers: [CanActivateGuard, CanDeactivateGuard]
})
export class OrdersRoutingModule {
  static components = [ OrdersComponent ];
}
