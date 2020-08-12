import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { OrdersRoutingModule } from './orders-routing.module';
import { OrderCreateComponent } from './order-create/order-create.component';

@NgModule({
  imports: [SharedModule, OrdersRoutingModule],
  declarations: [OrdersRoutingModule.components, OrderCreateComponent]
})
export class OrdersModule { }
