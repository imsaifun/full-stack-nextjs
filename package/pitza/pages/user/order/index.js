import Link from "next/link";
import { useSelector } from "react-redux";
import Layout from "../../../components/Layout/LayoutAdmin";
import dbConnect from "../../../lib/dbConnect";
import getOrder from "../../../lib/getOrder";

const Index = ({ orders, }) => {


    const profile = useSelector((state) => state.profile)
    const { dbUser } = profile
    const username = dbUser && dbUser.name
    const myOrder = orders.filter(val => val.customer == username);


    return (
        <>
            <Layout role="admin" pageClass="admin">
                <div className="row">
                    <div className="col-xl-12">
                        <h4 className="card-title mb-30">All Orders</h4>
                        <div className="card">
                            <div className="card-body">
                                <div className="table-responsive">
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
                                            {myOrder.map((order) => (
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
                    </div>
                </div>
            </Layout>
        </>

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
    const orders = await getOrder();
    return {
        props: {
            orders
        },
    };
}

export default Index;