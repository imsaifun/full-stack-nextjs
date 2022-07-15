import axios from "axios";
import { useState } from "react";
import Layout from "../../components/Layout/Layout";
import dbConnect from "../../lib/dbConnect";
import getOrder from "../../lib/getOrder";
import getProduct from "../../lib/getProduct";

const Index = ({ user, orders, products }) => {
    const [pizzaList, setPizzaList] = useState(products);
    const [orderList, setOrderList] = useState(orders);
   

    const handleDelete = async (id) => {
        try {
            const res = await axios.delete(
                "/api/products/" + id
            );
            setPizzaList(pizzaList.filter((pizza) => pizza._id !== id));
        } catch (err) {
            console.log(err);
        }
    };

    // console.log(orderList);
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
        <Layout pageClass="admin">
            <div className="container">
                <div className="row">
                    <div className="col-xl-12">
                        <div className="card">
                            <div className="card-body">
                                <div className="table-responsive">
                                    <table className="table">
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
                                                    <td>${product.prices[0].price}</td>
                                                    <td>
                                                        <button className="btn btn-info me-20">Edit</button>
                                                        <button className="btn btn-secondary"
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
                            </div>
                        </div>

                    </div>
                    <div className="col-xl-12">
                        <div className="card">
                            <div className="card-body">
                                <div className="table-responsive">
                                    <table className="table">
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
                                                    <td>
                                                        {order.status === 0 && "Ordered"}
                                                        {order.status === 1 && "Preparing"}
                                                        {order.status === 2 && "On the way"}
                                                        {order.status === 3 && "Delivered"}
                                                        {order.status === 4 && "Completed"}
                                                    </td>
                                                    <td>
                                                        <button
                                                            className="btn btn-primary"
                                                            disabled={order.status === 4}
                                                            onClick={() => handleStatus(order._id)}
                                                        >
                                                             {order.status === 4 ? "Done": "Next Stage"}
                                                        </button>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        ))}
                                    </table>
                                </div>
                            </div>
                        </div>

                    </div>

                </div>
            </div>
        </Layout>

    );
};

export async function getServerSideProps({ req, res }) {
    await dbConnect();
    const products = await getProduct();
    const orders = await getOrder();
    return {
        props: {
            orders,
            products
        },
    };
}

export default Index;