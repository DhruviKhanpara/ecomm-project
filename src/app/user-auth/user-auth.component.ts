import { Component,OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { SignUp, cart, login, product } from '../data-type';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-user-auth',
  templateUrl: './user-auth.component.html',
  styleUrls: ['./user-auth.component.css']
})
export class UserAuthComponent implements OnInit {
  showLogin:boolean=true;
  authError:string="";
  constructor(private user:UserService,private product:ProductService){}

  ngOnInit(): void {
    this.user.userAuthReload();
  }
  signUp(data:SignUp){
    this.user.userSingUp(data);
  }
  login(data:login){
    this.user.userLogin(data);
    this.user.invalidUserAuth.subscribe((result)=>{
      if(result){
        this.authError="Please enter valid user details";
      }else{
        this.localCartToRemoteCart(); 
      }
    })
  }
  openSignup(){
    this.showLogin=false;
  }
  openLogin(){
    this.showLogin=true;
  }
  localCartToRemoteCart(){
    let data=localStorage.getItem('localCart');
    let user=localStorage.getItem('user');
    let userId=user && JSON.parse(user).id;
    if(data){
      let cartDetailList:product[]=JSON.parse(data);
      cartDetailList.forEach((product:product,index) => {
        let cartData:cart={
          ...product,productId:product.id,userId
        };
        delete cartData.id;
        setTimeout(()=>{
          this.product.addToCart(cartData).subscribe((result)=>{
            if(result){
              console.warn('Item stored in DB');
            }
          })
          if(cartDetailList.length===index+1){
            localStorage.removeItem('localCart');
          }
        },500);
      });
    }
    setTimeout(()=>{
      this.product.getCartList(userId);
    },2000);
  }
}
