import axios from "axios";
import { useState } from "react";
import Layout from "../../components/Layout/LayoutAdmin";
import dbConnect from "../../lib/dbConnect";
import getOrder from "../../lib/getOrder";
import getProduct from "../../lib/getProduct";

const Index = ({ user, orders, products }) => {
    const totalOrder = orders.length
    const totalExpenses = orders.reduce((sum, item) => sum + item.total, 0);
    const OrderCompleted = orders.filter(val => val.status == 4).length;
    const OrderPending = orders.filter(val => val.status == !4).length;

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

    const inComplete = orderList.filter(val => val.status <= 3);

    return (
        <Layout role="admin" pageClass="admin">
            <div className="container">
                <div className="row">
                    <div className="col-xl-3 col-sm-6">
                        <div className="stat-widget d-flex align-items-center">
                            <div className="widget-icon me-20 bg-danger">
                                <span>
                                    <i class="bi bi-box-fill"></i>
                                </span>
                            </div>
                            <div className="widget-content">
                                <h3>{totalOrder}</h3>
                                <p>Total Order</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-3 col-sm-6">
                        <div className="stat-widget d-flex align-items-center">
                            <div className="widget-icon me-20 bg-primary">
                                <span>
                                    <i class="bi bi-cash-stack"></i>
                                </span>
                            </div>
                            <div className="widget-content">
                                <h3>{totalExpenses}</h3>
                                <p>Total Expenses</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-3 col-sm-6">
                        <div className="stat-widget d-flex align-items-center">
                            <div className="widget-icon me-20 bg-success">
                                <span>
                                    <i class="bi bi-receipt"></i>
                                </span>
                            </div>
                            <div className="widget-content">
                                <h3>{OrderCompleted}</h3>
                                <p>Order Completed</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-3 col-sm-6">
                        <div className="stat-widget d-flex align-items-center">
                            <div className="widget-icon me-20 bg-warning">
                                <span>
                                    <i class="bi bi-airplane-fill"></i>
                                </span>
                            </div>
                            <div className="widget-content">
                                <h3>{OrderPending}</h3>
                                <p>Order Pending</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    {inComplete &&
                        <div className="col-xl-12">
                            <div className="card">
                                <div className="card-body">
                                    <div className="table-responsive">
                                        <table className="table">
                                            <tbody>
                                                <tr>
                                                    {/* <th>Id</th> */}
                                                    <th>Customer</th>
                                                    <th>Total</th>
                                                    <th>Payment</th>
                                                    <th>Status</th>
                                                    <th>Action</th>
                                                </tr>
                                            </tbody>
                                            <tbody>
                                                {inComplete.map((order) => (
                                                    <tr key={order._id}>
                                                        {/* <td>{order._id}...</td> */}
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
                                                                {order.status === 4 ? "Done" : "Next Stage"}
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

                    }

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