export interface SignUp{
    name:string,
    password:string,
    email:string
}

export interface login{
    email:String,
    password:String
}

export interface product{
    name:string,
    price:number,
    category:string,
    color:string,
    discription:string,
    image:string,
    id:number,
    quantity:number | undefined,
    productId:number | undefined
}

export interface cart{
    name:string,
    price:number,
    category:string,
    color:string,
    discription:string,
    image:string,
    id:number | undefined,
    quantity:number | undefined,
    userId:number,
    productId:number 
}

export interface priceSummary{
    price:number,
    discount:number,
    tax:number,
    delivery:number,
    total:number
}

export interface order{
    email:string,
    address:string,
    contect:string,
    userId:number,
    totalPrice:number,
    id:number|undefined
}