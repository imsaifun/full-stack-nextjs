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
            // localStorage.setItem("products", JSON.stringify(state.products));
            Cookies.set('products', JSON.stringify(state.products));
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
            } else if (state.products[itemIndex].quantity === 1) {
                const nextProducts = state.products.filter(
                    (item) => item._id !== action.payload._id
                );

                state.products = nextProducts;

                toast.error(`${action.payload.title} removed from cart`, {
                    position: 'bottom-left',
                });
            }
            // localStorage.setItem("products", JSON.stringify(state.products));
            Cookies.set('products', JSON.stringify(state.products));

        },
        removeFromCart(state, action) {
            state.products.map((product) => {
                if (product._id === action.payload._id) {
                    const nextProducts = state.products.filter(
                        (item) => item._id !== product._id
                    );
                    state.products = nextProducts;
                    toast.error(`${action.payload.title} removed from cart`, {
                        position: 'bottom-left',
                    });
                }
                // localStorage.setItem("products", JSON.stringify(state.products));
                Cookies.set('products', JSON.stringify(state.products));
                return state;
            });
        },
        getTotals(state, action) {
            let { total, myQ } = state.products.reduce(
                (cartTotal, cartItem) => {
                    const { price, quantity } = cartItem;
                    const itemTotal = price * quantity;
                    cartTotal.total += itemTotal;
                    cartTotal.myQ += quantity;
                    return cartTotal;
                },
                {
                    //Initial values
                    total: 0,
                    myQ: 0,
                }
            );
            state.quantity = myQ;
            state.total = total;

        },
        clearCart(state, action) {
            state.products = [];
            // localStorage.setItem("products", JSON.stringify(state.products));
            Cookies.set('products', JSON.stringify(state.products));
            toast.error('Cart cleared', { position: 'bottom-left' });
        },
        reset: (state) => {
            state.products = [];
            state.quantity = 0;
            state.total = 0;
        },
    },
});

export const { addToCart, decreaseCart, removeFromCart, getTotals, clearCart, reset } = cartSlice.actions;
export default cartSlice.reducer;