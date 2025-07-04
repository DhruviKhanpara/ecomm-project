import { Component,OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { order } from '../data-type';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent implements OnInit {
  orderData:order[] | undefined;

  constructor(private product:ProductService){}

  ngOnInit(): void {
    this.getOrderList();
  }
  cancleOrder(orderId:number | undefined){
    orderId && this.product.deleteOrder(orderId).subscribe((result)=>{
      this.getOrderList();
    })
  }
  getOrderList(){
    this.product.orderList().subscribe((result)=>{
      this.orderData=result;
    })
  }
}
