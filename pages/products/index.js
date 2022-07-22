import Products from "../../components/elements/Products";
import Layout from "../../components/Layout/LayoutAdmin";
import dbConnect from "../../lib/dbConnect";
import getProduct from "../../lib/getProduct";

export default function ProductSingle({product}) {


    return (
        <Layout   pageClass={"front"}
        headTitle={"Product"}
        pageTitle={"Product"}
        pageTitleSub={"Welcome Product Page"}
        parent={"Home"}
        child={"Product"}>
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
