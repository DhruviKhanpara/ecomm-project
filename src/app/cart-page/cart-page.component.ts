import { Component,OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { cart, priceSummary } from '../data-type';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css']
})
export class CartPageComponent implements OnInit {
  cartData:cart[] | undefined;
  priceSummary:priceSummary={
    price:0,
    discount:0,
    tax:0,
    delivery:0,
    total:0
  }

  constructor(private product:ProductService,private router:Router){}

  ngOnInit(): void {
    this.cartInfo();
  }
  checkout(){
    this.router.navigate(['/checkout']);
  }
  cartInfo(){
    this.product.currentCart().subscribe((result)=>{
      // console.warn(result);
      this.cartData=result;
      let price=0;
      result.forEach((item)=>{
        if(item.quantity){
          price=price + (+item.price* +item.quantity);
        }
      })
      this.priceSummary.price=price;
      this.priceSummary.discount=price*5/10;
      this.priceSummary.tax=price/10;
      this.priceSummary.delivery=300;
      this.priceSummary.total=price+(price/10)+300-(price/10);
    })
  }
  removeToCart(cartId:number | undefined){
    cartId && this.product.removeToCart(cartId).subscribe((result)=>{
      if(result){
        this.cartInfo();
      }
    })
  }
}
