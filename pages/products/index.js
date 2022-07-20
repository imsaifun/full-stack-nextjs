import Products from "../../components/elements/Products";
import Layout from "../../components/Layout/LayoutAdmin";
import dbConnect from "../../lib/dbConnect";
import getProduct from "../../lib/getProduct";

export default function ProductSingle({product}) {


    return (
        <Layout   pageClass={"front"}
        headTitle={"Contact"}
        pageTitle={"Contact"}
        pageTitleSub={"Welcome Contact Page"}
        parent={"Home"}
        child={"Contact"}>
            <div className="section-padding">
                <div className="container">
                    <div className="row">
                        <Products product={product} />
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export async function getServerSideProps() {
    await dbConnect();
    const product = await getProduct();
    return {
        props: {
            product
        },
    };
}
