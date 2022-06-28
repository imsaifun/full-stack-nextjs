/* eslint-disable @next/next/no-img-element */
import {
    PayPalButtons, PayPalScriptProvider, usePayPalScriptReducer
} from "@paypal/react-paypal-js";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Layout from "../components/Layout";
import OrderDetail from "../components/OrderDetail";
import { addToCart, reset, decreaseCart } from "../redux/cartSlice";
import getUser from "../lib/getUser";
import dbConnect from "../lib/dbConnect";



const Cart = ({ user }) => {
    // This values are the props in the UI
    const cart = useSelector((state) => state.cart);
    const [cash, setCash] = useState(false);
    const [open, setOpen] = useState(false);
    const amount = cart.total;
    const currency = "USD";
    const style = { "layout": "vertical" };
    const dispatch = useDispatch();
    const router = useRouter();
    const contentType = 'application/json'


    const handleDecreaseCart = (product) => {
        dispatch(decreaseCart(product));
    };

    const handleIncreaseCart = (product) => {
        dispatch(addToCart(product));
    }

    const createOrder = async (data) => {
        try {
            const res = await axios.post("/api/orders", data);
            if (res.status === 201) {
                dispatch(reset());
                router.push(`/orders/${res.data.data._id}`);
            }
        } catch (err) {
            console.log(err);
        }
    };



    const ButtonWrapper = ({ currency, showSpinner }) => {
        // usePayPalScriptReducer can be use only inside children of PayPalScriptProviders
        // This is the main reason to wrap the PayPalButtons in a new component
        const [{ options, isPending }, dispatch] = usePayPalScriptReducer();

        useEffect(() => {
            dispatch({
                type: "resetOptions",
                value: {
                    ...options,
                    currency: currency,
                },
            });
        }, [currency, showSpinner]);

        return (
            <>
                {showSpinner && isPending && <div className="spinner" />}
                <PayPalButtons
                    style={style}
                    disabled={false}
                    forceReRender={[amount, currency, style]}
                    fundingSource={undefined}
                    createOrder={(data, actions) => {
                        return actions.order
                            .create({
                                purchase_units: [
                                    {
                                        amount: {
                                            currency_code: currency,
                                            value: amount,
                                        },
                                    },
                                ],
                            })
                            .then((orderId) => {
                                // Your code here after create the order
                                return orderId;
                            });
                    }}
                    onApprove={function (data, actions) {
                        return actions.order.capture().then(function (details) {
                            // console.log(details);
                            const shipping = details.purchase_units[0].shipping;
                            createOrder({
                                customer: shipping.name.full_name,
                                address: shipping.address.address_line_1,
                                total: cart.total,
                                method: 1,
                            });
                        });
                    }}
                />
            </>
        );
    };

    return (
        <>
            <Layout role={user}>


                <div>
                    <table>
                        <thead>
                            <tr>
                                <th>Product</th>
                                <th>Name</th>
                                <th>Extras</th>
                                <th>Price</th>
                                <th>Quantity</th>
                                <th>Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cart.products.map((product) => (
                                <tr key={product._id}>
                                    <td>
                                        <div>
                                            <img src="/img/pizza.png" alt="" width={100} />
                                        </div>
                                    </td>
                                    <td>
                                        <span>{product.title}</span>
                                    </td>
                                    <td>
                                        <span>
                                            {product.extras.map((extra) => (
                                                <span key={extra._id}>{extra.text}, </span>
                                            ))}
                                        </span>
                                    </td>
                                    <td>
                                        <span>${product.price}</span>
                                    </td>
                                    <td>
                                        <button onClick={() => handleDecreaseCart(product)} > - </button>
                                        <span>{product.quantity}</span>
                                        <button onClick={() => handleIncreaseCart(product)} > + </button>
                                    </td>
                                    <td>
                                        <span>
                                            ${product.price * product.quantity}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div>
                    <div>
                        <h2>CART TOTAL</h2>
                        <div>
                            <b>Subtotal:</b>${cart.total}
                        </div>
                        <div>
                            <b>Discount:</b>$0.00
                        </div>
                        <div>
                            <b>Total:</b>${cart.total}
                        </div>
                        {open ? (
                            <div>
                                <button
                                    onClick={() => setCash(true)}
                                >
                                    CASH ON DELIVERY
                                </button>
                                <PayPalScriptProvider
                                    options={{
                                        "client-id":
                                            "Aby6hHQcup215Odrwaf6VvKS2g-qAeMiQSBY9rBMxdFKoiUA0s29ovwNZ6QVLOkfmk5hL6x-vuogTnjJ",
                                        components: "buttons",
                                        currency: "USD",
                                        "disable-funding": "credit,card,p24",
                                    }}
                                >
                                    <ButtonWrapper currency={currency} showSpinner={false} />
                                </PayPalScriptProvider>
                            </div>
                        ) : (
                            <button onClick={() => setOpen(true)}>
                                CHECKOUT NOW!
                            </button>
                        )}
                    </div>
                </div>
                {cash && <OrderDetail total={cart.total} createOrder={createOrder} />}
            </Layout>
        </>
    );
};

export async function getServerSideProps({ req, res }) {
    await dbConnect();
    const user = await getUser(req, res);
    if (!user) {
        return {
            redirect: {
                permanent: false,
                destination: "/signin",
            },
            props: {},
        };
    }
    return {
        props: {
            user,
        },
    };
}

export default Cart;
