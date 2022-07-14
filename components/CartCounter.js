import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getTotals } from "../redux2/cartSlice";


export default function CartCounter() {
  // const cart = useSelector((state) => state.cart);
  // const dispatch = useDispatch();

  // useEffect(() => { 
	// 	dispatch(getTotals());
	// }, [cart, dispatch]);
  return (
    <>
          <div>
            {/* {cart.quantity} */}
          </div>
    </>
  );
}

