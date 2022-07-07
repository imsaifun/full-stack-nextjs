import axios from "axios";
import Image from "next/image";
import { useState } from "react";
import Layout from "../../components/Layout/Layout";
import getProduct from "../../lib/getProduct";
import getUser from "../../lib/getUser";
import dbConnect from "../../lib/dbConnect";
import getOrder from "../../lib/getOrder";

const Index = ({ user, orders, products }) => {
    const [pizzaList, setPizzaList] = useState(products);
    const [orderList, setOrderList] = useState(orders);
    const status = ["preparing", "on the way", "delivered"];

    const handleDelete = async (id) => {
        console.log(id);
        try {
            const res = await axios.delete(
                "/api/products/" + id
            );
            setPizzaList(pizzaList.filter((pizza) => pizza._id !== id));
        } catch (err) {
            console.log(err);
        }
    };

    console.log(orderList);
    // const item = orderList.filter((order) => order._id === id)[0];

    const handleStatus = async (id) => {
        const item = orderList.filter((order) => order._id === id)[0];
        // console.log(item);
        const currentStatus = item.status;

        try {
            const res = await axios.put("/api/orders/" + id, {
                status: currentStatus + 1,
            });
            // console.log(res.data.data);
            setOrderList([
                res.data.data,
                ...orderList.filter((order) => order._id !== id),
            ]);
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <Layout role={user}>
            <div>
                <div>
                    <h1>Products</h1>
                    <table>
                        <tbody>
                            <tr>
                                <th>Image</th>
                                <th>Id</th>
                                <th>Title</th>
                                <th>Price</th>
                                <th>Action</th>
                            </tr>
                        </tbody>
                        <tbody>
                            {pizzaList.map((product) => (
                                <tr key={product._id}>
                                    <td>
                                        <img
                                            src={product.img}
                                            width={50}
                                            height={50}
                                            alt=""
                                        />
                                    </td>
                                    <td>{product._id}...</td>
                                    <td>{product.title}</td>
                                    {/* <td>${product.prices[0]}</td> */}
                                    <td>
                                        <button>Edit</button>
                                        <button
                                            onClick={() => handleDelete(product._id)}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div>
                    <h1>Orders</h1>
                    <table>
                        <tbody>
                            <tr>
                                <th>Id</th>
                                <th>Customer</th>
                                <th>Total</th>
                                <th>Payment</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </tbody>
                        {orderList.map((order) => (
                            <tbody key={order._id}>
                                <tr>
                                    <td>{order._id}...</td>
                                    <td>{order.customer}</td>
                                    <td>${order.total}</td>
                                    <td>
                                        {order.method === 0 ? <span>cash</span> : <span>paid</span>}
                                    </td>
                                    <td>{status[order.status]}</td>
                                    <td>
                                        <button onClick={() => handleStatus(order._id)}>
                                            Next Stage
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        ))}
                    </table>
                </div>
            </div>
        </Layout>

    );
};

// export const getServerSideProps = async (ctx) => {
//   const myCookie = ctx.req?.cookies || "";

//   if (myCookie.token !== process.env.TOKEN) {
//     return {
//       redirect: {
//         destination: "/admin/login",
//         permanent: false,
//       },
//     };
//   }

//   const productRes = await axios.get("/api/products");
//   const orderRes = await axios.get("/api/orders");

//   return {
//     props: {
//       orders: orderRes.data,
//       products: productRes.data,
//     },
//   };
// };

export async function getServerSideProps({ req, res }) {
    await dbConnect();
    const products = await getProduct();
    const orders = await getOrder();
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
            orders,
            products
        },
    };
}

export default Index;