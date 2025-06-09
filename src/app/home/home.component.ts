import { Component,OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { product } from '../data-type';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  popularProducts:product[] | undefined;
  trendyProduct:product[] | undefined;

  constructor(private product:ProductService){}

  ngOnInit(): void {
    this.product.popularProducts().subscribe((result)=>{
      this.popularProducts=result;
    });
    this.product.trendyProduct().subscribe((result)=>{
      this.trendyProduct=result;
    });
  }
}
