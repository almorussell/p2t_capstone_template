import {useCartStore} from '../store/CartStore';
import { checkoutCart } from '../services/PaymentService';

const Cart = () => {
  const { items } = useCartStore();
  async function handleCheckout() {
    try {
        const data = await checkoutCart(items);
        if(data.url){ // check if session was successfully created
           window.location.href = data.url; // reroute user to checkout page

        }
    } catch (error) {
        console.log(error);
    }
  }
    return (
    <div>
      <h2>Your Cart</h2>
      {items.length > 0 ? (
     <>
     {items.map((item) => (
        <div>
            <p>{item.name}</p>
            <p>Price: {item.price}</p>
        </div>
     ))}
     <button type="button" onClick={handleCheckout}>Checkout</button>
     </>
      ): (
        <>
        <p>No items in cart. Please add items to cart</p>
        </ >
      )}
      
    </div>
  )
}

export default Cart
