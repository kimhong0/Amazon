import { cart } from '../data/cart.js';
import {products} from '../data/products.js';
import { DeliveryOption } from '../data/delivery.js';
export function getProductPrice(){
   let totalPrice = 0;
   let shippingPrice = 0;
   cart.forEach(cartItem => {
    let matchingProducts;   
    products.forEach((product)=>{
      if(product.id === cartItem.id){
        matchingProducts = product;
        const price = (product.priceCents * cartItem.quantity);
        totalPrice += price; 
             
      }
    let matchingOption;  
    
    
    })

    const selectedOption = DeliveryOption.find(option=>
      option.id === cartItem.deliveryId
    )
   shippingPrice += selectedOption.priceCents;
   
  });
   console.log(shippingPrice);
   const totalBeforeTax = totalPrice + shippingPrice;
   const totalAfterTax = Math.round(totalBeforeTax * 110 / 100);
   const tax = (totalBeforeTax * 10) / 100;
   console.log(totalAfterTax) 
 return { totalPrice, shippingPrice, totalBeforeTax, totalAfterTax };
}