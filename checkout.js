import { cart,DeleteFromCart } from './data/cart.js';
import { DeliveryOption } from './data/delivery.js';
import { products } from './data/products.js';
import { getProductPrice } from './Checkout/PaymentSummary.js';
function Summary() {
  let html = '';

  cart.forEach(cartItem => {
    const product = products.find(p => p.id === cartItem.id);
   
    const selectedOption = DeliveryOption.find(o => o.id === cartItem.deliveryId)
    
    
   
    html += `
      <div class="cart-item-container" data-cart-id="${cartItem.id}">
        <div class="delivery-date">
          Delivery date:${getCurrentDate(selectedOption.date)}
        </div>
        <div class="cart-item-details-grid">
          <img class="product-image" src="${product.image}">
          <div class="cart-item-details">
            <div class="product-name">${product.name}</div>
            <div class="product-price">${(product.priceCents/100)}$</div>
            <div class="item-quantity">
              <span>Quantity: <span class="quantity-label">${cartItem.quantity}</span></span>
              <span class="update-quantity-link link-primary update-button">Update</span>
              <span class="delete-quantity-link link-primary js-delete">Delete</span>
            </div>
          </div>
          <div class="delivery-options">
            <div class="delivery-options-title">Choose a delivery option:</div>
            ${DeliveryOptionhtml(cartItem)}
          </div>
        </div>
      </div>
    `;
  });
document.querySelector('.order-summary').innerHTML = html;

document.querySelectorAll('.js-delete').forEach((button,index)=>{
  button.addEventListener('click',()=>{
    DeleteFromCart(index);
    console.log("hi");
    Summary();

  })
;
})

document.querySelectorAll('.delivery-option-input').forEach((option) => {
  option.addEventListener('change', () => {
    const cartId = option.dataset.cartId;
    const optionId = parseInt(option.value);
    const cartItem = cart.find(item => item.id === cartId);
    cartItem.deliveryId = optionId;
    localStorage.setItem("cart", JSON.stringify(cart));
    UpdatePrice()
    Summary()
  });
})
}
Summary()   
// Add event listeners for delivery option changes



function DeliveryOptionhtml(cartItem) {
  let html = '';

  DeliveryOption.forEach(option => {
    const isChecked = option.id === cartItem.deliveryId 
    ? 'checked'
    : ''
    const Price = option.priceCents === 0
      ? 'FREE'
      : `$${(option.priceCents / 100).toFixed(2)}`;

    html += `
      <div class="delivery-option">
        <input type="radio"   
          class="delivery-option-input"
          name="delivery-option-${cartItem.id}"
          data-cart-id ="${cartItem.id}"
          value ="${option.id}"
          ${isChecked}
        >
        <div>
          <div class="delivery-option-date">
            ${getCurrentDate(option.date  )}
          </div>
          <div class="delivery-option-price">
             ${Price} - Shipping
          </div>
        </div>
      </div>
    `;
  });

  return html;
}

function getCurrentDate(DeliveryOption) {
  let date = new Date();
  date.setDate(date.getDate() + DeliveryOption);
  let options = { weekday: 'long', month: 'long', day: 'numeric' };
  let DeliveryDate = date.toLocaleDateString('en-US', options); 
 
  return DeliveryDate;
}

function UpdatePrice(){
  const { totalPrice, shippingPrice, totalBeforeTax, totalAfterTax } = getProductPrice();
  document.querySelector('.payment-summary-money').innerHTML = (totalPrice /100);
  document.querySelector(".shipping-total").innerHTML = ` $${(shippingPrice/100)}`;
  document.querySelector(".total-before-tax").innerHTML = ` $${totalBeforeTax/100}`;
  document.querySelector(".total-after-tax").innerHTML = ` $${totalAfterTax/100}`
}

document.querySelectorAll('.update-button').forEach((button,index) =>{
  button.addEventListener('click', function(){
    let updateDiv = document.querySelector(".hidden");
    updateDiv.style.display = 'flex';
    const productContainer = button.closest('.cart-item-container');
    const imgSrc = productContainer.querySelector(".product-image").src;
    document.querySelector('.img-update').src = imgSrc; 
  })
}); 

document.querySelector(".popup-cancel").addEventListener("click",()=>{
  let updateDiv = document.querySelector(".hidden");
  updateDiv.style.display = 'none';

})

