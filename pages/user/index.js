import { useSelector } from "react-redux";
import Layout from "../../components/Layout/LayoutAdmin";
import dbConnect from "../../lib/dbConnect";
import getOrder from "../../lib/getOrder";

const Index = ({ orders }) => {
    const profile = useSelector((state) => state.profile)
    const { dbUser } = profile
    const username = dbUser && dbUser.name
    const myOrder = orders.filter(val => val.customer == username);

    const totalExpenses = myOrder.reduce((sum, item) => sum + item.total, 0);

    // Orderstatus
    const OrderCompleted = myOrder.filter(val => val.status == 4).length;
    const OrderPending = myOrder.filter(val => val.status == !4).length;

    
    return (
        <Layout role="admin" pageClass="admin">

            <div className="row">
                <div className="col-xl-12">
                    <h3>Total Expenses : {totalExpenses}</h3>
                    <h3>Total Order Completed : {OrderCompleted}</h3>
                    <h3>Total Order Pending : {OrderPending}</h3>
                </div>
            </div>
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