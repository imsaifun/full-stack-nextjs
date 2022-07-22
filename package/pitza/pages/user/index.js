import Link from "next/link";
import { useSelector } from "react-redux";
import Layout from "../../components/Layout/LayoutAdmin";
import dbConnect from "../../lib/dbConnect";
import getOrder from "../../lib/getOrder";

const Index = ({ orders }) => {
    const profile = useSelector((state) => state.profile)
    const { dbUser } = profile
    const username = dbUser && dbUser.name
    const myOrder = orders.filter(val => val.customer == username);

    const totalOrder = orders.filter(val => val.customer == username).length;


    const totalExpenses = myOrder.reduce((sum, item) => sum + item.total, 0);

    // Orderstatus
    const OrderCompleted = myOrder.filter(val => val.status == 4).length;
    const OrderPending = myOrder.filter(val => val.status == !4).length;
    const inComplete = myOrder.filter(val => val.status  <= 3);


    return (
        <Layout role="admin" pageClass="admin">


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

            {inComplete  &&
                <div className="row">
                    <div className="col-xl-12">
                        <h4 className="card-title mb-30">Active order</h4>
                        <div className="card">
                            <div className="card-body">
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th>Customer</th>
                                            <th>Total</th>
                                            <th>Payment</th>
                                            <th>Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {inComplete.map((order) => (
                                            <tr key={order._id}>
                                                <td>
                                                    <Link href={`/user/order/${order._id}`}>
                                                        <a>{order.customer}</a>
                                                    </Link>
                                                </td>
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
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                    </div>
                </div>}
        </Layout>

    );
};

export async function getServerSideProps({ req, res }) {
    await dbConnect();
    const orders = await getOrder();
    return {
        props: {
            orders
        },
    };
}

export default Index;