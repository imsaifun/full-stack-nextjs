/* eslint-disable @next/next/no-img-element */
import {
    PayPalButtons, PayPalScriptProvider, usePayPalScriptReducer
} from "@paypal/react-paypal-js";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Layout from "../components/Layout/LayoutAdmin";
import OrderDetail from "../components/OrderDetail";

import { addToCart, clearCart, decreaseCart, getTotals, removeFromCart, reset } from "../redux/cartSlice";
// import getUser from "../lib/getUser";


const Cart = () => {
    // This values are the props in the UI
    const cart = useSelector((state) => state.cart);
    const [cash, setCash] = useState(false);
    const [open, setOpen] = useState(false);
    const amount = cart.total;
    const currency = "USD";
    const style = { "layout": "vertical" };
    const dispatch = useDispatch();
    const router = useRouter();

    
    const profile = useSelector((state) => state.profile)
    const { dbUser } = profile

    const user = dbUser && dbUser
    console.log(dbUser);

    // const cookies = parseCookies()
    // const { data: session } = useSession()
  
    // const user = cookies?.user
    //   ? JSON.parse(cookies.user)
    //   : session?.user
    //     ? session?.user
    //     : ""
  
        



    useEffect(() => {
        dispatch(getTotals());
    }, [cart, dispatch]);

    // console.log(cart);

    const handleRemoveFromCart = (product) => {
        dispatch(removeFromCart(product));
    };
    const handleDecreaseCart = (product) => {
        dispatch(decreaseCart(product));
    };

    const handleIncreaseCart = (product) => {
        dispatch(addToCart(product));
    }

    const handleClearCart = () => {
        dispatch(clearCart());
    };



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
            <Layout pageClass="front">


                <div className="section-padding">
                    <div className="container">
                        <div className="row">
                            <div className="col-xl-9">
                                <div className="table-responsive">
                                <table className="table">
                                    <tr>
                                        <th>Product</th>
                                        <th>Name</th>
                                       <th>Extras</th>
                                        <th>Price</th>
                                        <th>Quantity</th>
                                        <th>Total</th>
                                        <th>Action</th>
                                    </tr>
                                    <tbody>
                                    {cart.products.map((product) => (
                                            <tr key={product._id}>
                                                <td>

                                                    <img src={product.img} alt="" width={100} />

                                                </td>
                                                <td>
                                                    <span>{product.title}</span>
                                                </td>
                                                
                                                <td>
                                                   
                                                        {product.extras.map((extra) => (
                                                            <span key={extra._id}>{extra.text}, </span>
                                                        ))}
                                                    
                                                </td>
                                                <td>
                                                    <span>${product.price}</span>
                                                </td>
                                                <td>
                                                    <a onClick={() => handleDecreaseCart(product)} > - </a>
                                                    <span>{product.quantity}</span>
                                                    <a onClick={() => handleIncreaseCart(product)} > + </a>
                                                </td>
                                                <td>
                                                    <span>
                                                        ${product.price * product.quantity}
                                                    </span>
                                                </td>
                                                <td>
                                                    <a className="btn btn-danger" onClick={() => handleRemoveFromCart(product)}>
                                                        Remove
                                                    </a>
                                                </td>
                                            </tr>
                                    ))}
                                    </tbody>
                                </table>
                                </div>
                                <button
                                    onClick={() => handleClearCart()} className="btn btn-danger mb-10">
                                    Clear Cart
                                </button>
                            </div>
                            <div className="col-xl-3">
                                <h4 className="card-title">CART TOTAL</h4>
                                <div className="card">
                                    <div className="card-body">
                                        <div>
                                            <strong>Subtotal:</strong>${cart.total}
                                        </div>
                                        <div>
                                            <strong>Discount:</strong>$0.00
                                        </div>
                                        <div>
                                            <strong>Total:</strong>${cart.total}
                                        </div>
                                        {open ? (
                                            <div>
                                                <button
                                                    onClick={() => setCash(true)}
                                                    className="btn btn-primary mb-10"
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
                                            <button onClick={() => setOpen(true)} className="btn btn-primary mb-10">
                                                CHECKOUT NOW!
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12">
                                {cash && <OrderDetail total={cart.total} createOrder={createOrder} user={user} />}
                            </div>
                        </div>

                    </div>
                </div>




            </Layout>
        </>
    );
};

// export async function getServerSideProps({ req, res }) {
//     await dbConnect();
//     const user = await getUser(req, res);
//     // if (!user) {
//     //     return {
//     //         redirect: {
//     //             permanent: false,
//     //             destination: "/signin",
//     //         },
//     //         props: {},
//     //     };
//     // }
//     return {
//         props: {
//             user,
//         },
//     };
// }

export default Cart;
