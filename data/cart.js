

export let cart = JSON.parse(localStorage.getItem("cart")) || [];;

export function addtocart(productId,selectedQuantity){ 
  const existingitem = cart.find(item =>item.id === productId);
  
  if(existingitem){
    existingitem.quantity += selectedQuantity;
  }
  else{
    let cartItem = {
      id: productId,
      quantity : selectedQuantity,
      deliveryId : 1,
    };
    
  cart.push(cartItem);
  
  }
 
  // Create cart item

  console.log(cart);
  localStorage.setItem("cart", JSON.stringify(cart));
  
}
export function DeleteFromCart(index){
  cart.splice(index,1);
  localStorage.setItem("cart",JSON.stringify(cart));
  
}
