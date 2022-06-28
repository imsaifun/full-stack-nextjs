import { createSlice } from "@reduxjs/toolkit";
import { toast } from 'react-toastify';
import Cookies from 'js-cookie';
const cartSlice = createSlice({
  name: "cart",
  initialState: {
    products: Cookies.get('products')
		? JSON.parse(Cookies.get('products'))
		: [],
    quantity: 0,
    total: 0,
  },
  reducers: {
    addToCart: (state, action) => {
      const itemIndex = state.products.findIndex(
        (item) => item._id === action.payload._id
      );
      if (itemIndex >= 0) {
        state.products[itemIndex].quantity += 1;
        toast.info(
          `Increased ${state.products[itemIndex].title} cart quantity`,
          {
            position: 'bottom-right',
          }
        );
      } else {
        const tempProduct = { ...action.payload, quantity: 1 };
        state.products.push(tempProduct);
        toast.success(`${action.payload.title} added to cart`, {
          position: 'bottom-right',
        });
      }

      // console.log(action.payload._id);
      Cookies.set('products', JSON.stringify(state.products));

      // state.products.push(action.payload);
      // state.quantity += 1;
      // state.total += action.payload.price * action.payload.quantity;
    },
    decreaseCart(state, action) {
      const itemIndex = state.products.findIndex(
				(item) => item._id === action.payload._id
			);
      if (state.products[itemIndex].quantity > 1) {
				state.products[itemIndex].quantity -= 1;

				toast.info(`Decreased ${action.payload.title} cart quantity`, {
					position: 'bottom-left',
				});
			}  else if (state.products[itemIndex].quantity === 1) {
				const nextProducts = state.products.filter(
					(item) => item._id !== action.payload._id
				);

				state.products = nextProducts;

				toast.error(`${action.payload.title} removed from cart`, {
					position: 'bottom-left',
				});
			}

    },
    reset: (state) => {
      state.products = [];
      state.quantity = 0;
      state.total = 0;
    },
  },
});

export const { addToCart, decreaseCart, reset } = cartSlice.actions;
export default cartSlice.reducer;