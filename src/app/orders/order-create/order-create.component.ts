import { Component, OnInit, ViewChild } from '@angular/core';
import { ICustomer, IState } from '../../shared/interfaces';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { DataService } from '../../core/services/data.service';
import { GrowlerService, GrowlerMessageType } from '../../core/growler/growler.service';
import { ModalService, IModalContent } from '../../core/modal/modal.service';
import { LoggerService } from '../../core/services/logger.service';
import { IOrder } from 'src/app/shared/interfaces';

@Component({
  selector: 'cm-order-create',
  templateUrl: './order-create.component.html',
  styleUrls: ['./order-create.component.css']
})
export class OrderCreateComponent implements OnInit {

  customer: ICustomer =
    {
      id: 0,
      firstName: '',
      lastName: '',
      gender: '',
      address: '',
      city: '',
      state: {
        abbreviation: '',
        name: ''
      }
    };
  customerId: number;
  customers: ICustomer[]; 
  order: IOrder = {
    productName: '',
    itemCost: 0
  };
  orders: IOrder[];
  total: number;
  initialOrders: IOrder[];
  errorMessage: string;
  deleteMessageEnabled: boolean;
  operationText = 'Insert';
  @ViewChild('orderForm', { static: true }) orderForm: NgForm;

  constructor(private router: Router,
    private route: ActivatedRoute,
    private dataService: DataService,
    private growler: GrowlerService,
    private modalService: ModalService,
    private logger: LoggerService) { }

  ngOnInit() {
    this.dataService.getCustomers().subscribe((customers: ICustomer[]) => {
      this.customers = customers;
    });
  }

  addOrder() {
    this.customer.orders.push(this.order);
    this.total += this.order.itemCost;
    this.order =  {
      productName: '',
      itemCost: null
    };
    this.orderForm.controls['productName'].reset();
    this.orderForm.controls['itemCost'].reset();
  }

  submit() {
    if (this.customer && this.orders.length > 0) {
      this.customer.orders = [...this.customer.orders,...this.orders];
      console.log('Orders: ',this.orders.length);
      this.dataService.updateOrders(this.customer.id,this.orders)
        .subscribe((status: boolean) => {
          if (status) {
            // Mark form as pristine so that CanDeactivateGuard won't prompt before navigation
            this.orderForm.form.markAsPristine();
            this.growler.growl('Operation performed successfully.', GrowlerMessageType.Success);
            this.router.navigate(['/orders']);
          } else {
            const msg = 'Unable to update customer';
            this.growler.growl(msg, GrowlerMessageType.Danger);
            this.errorMessage = msg;
          }
        },
          (err: any) => this.logger.log(err));
    } else {
      alert("error");
    }
  }

  cancel(event: Event) {
    event.preventDefault();
    // Route guard will take care of showing modal dialog service if data is dirty
    this.router.navigate(['/orders']);
  }

  onChangeCustomer() {
    this.dataService.getCustomer(this.customerId).subscribe(
        customer => {this.customer = customer
        this.orders = customer.orders;
        this.initialOrders = customer.orders;
        this.total = customer.orders.map(item => item.itemCost).reduce((prev, curr) => prev + curr, 0);
      });
  }

  canDeactivate(): Promise<boolean> | boolean {
    if (!this.orderForm.dirty) {
      return true;
    }

    // Dirty show display modal dialog to user to confirm leaving
    const modalContent: IModalContent = {
      header: 'Lose Unsaved Changes?',
      body: 'You have unsaved changes! Would you like to leave the page and lose them?',
      cancelButtonText: 'Cancel',
      OKButtonText: 'Leave'
    };
    return this.modalService.show(modalContent);
  }

}
