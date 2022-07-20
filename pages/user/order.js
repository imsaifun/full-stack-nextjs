import { useSelector } from "react-redux";
import Layout from "../../components/Layout/LayoutAdmin";
import dbConnect from "../../lib/dbConnect";
import getOrder from "../../lib/getOrder";

const Index = ({ orders, }) => {


    const profile = useSelector((state) => state.profile)
    const { dbUser } = profile
    const username = dbUser && dbUser.name
    const myOrder = orders.filter(val => val.customer == username);


    return (
        <>
            <Layout role="admin" pageClass="admin">
                <h1>{username}</h1>
                <div className="row">
                    <div className="col-xl-12">
                        <table className="table">
                            <tbody>
                                <tr>
                                    <th>Id</th>
                                    <th>Customer</th>
                                    <th>Total</th>
                                    <th>Payment</th>
                                    <th>Status</th>
                                </tr>
                            </tbody>
                            <tbody>
                                {myOrder.map((order) => (
                                    <tr key={order._id}>
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
                                    </tr>
                                ))}
                            </tbody>
                        </table>
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