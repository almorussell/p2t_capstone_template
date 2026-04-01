import {useState, useEffect} from "react"
import { useSearchParams } from "react-router" // allows us to grab the url from the session id
import { createOrder } from "../services/PaymentService"
import { useUserStore } from "../store/UserStore"

const Success = () => {
  const { userId } = useUserStore();
  const [searchParam] = useSearchParams();
  const [orderDetails, setOrderDetails] = useState(null);
  const sessionId = searchParam.get("session_id"); // grab the stripe session id from the query
  useEffect(() => {
    async function handleCreateOrder(id) {
        try {
            const data = await createOrder(id, userId);
            setOrderDetails(data);
        } catch (error) {
            console.log(error);
        }
    }
    if(sessionId) {
        handleCreateOrder(sessionId);
    }
  }, [sessionId, userId]);
  return (
    <div>
      {orderDetails && (
        <>
        <h2>Payment was successful</h2>
        <p>Here are the order details:</p>
        <p>{orderDetails.orderNumber}</p>
        <p>Total Price: {orderDetails.totalPrice}</p>
        </>
      )}
    </div>
  )
}

export default Success
