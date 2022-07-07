import axios from "axios";
import Link from "next/link";
import { useState } from "react";
import EditProduct from "../../components/EditProduct";
import Layout from "../../components/Layout/Layout";
import dbConnect from "../../lib/dbConnect";
import getProduct from "../../lib/getProduct";
// import getUser from "../../lib/getUser";

export default function ProductSingle(product, user) {
    const myProduct = product.product

    const [productList, setProductList] = useState(myProduct);
    const [productId, setProductId] = useState("");
    // const router = useRouter();
    // console.log(productId);

    const handleDelete = async (id) => {

        // console.log(id);

        try {
            const res = await axios.delete(`/api/products/${id}`);
            setProductList(productList.filter((pizza) => pizza._id !== id));
        } catch (error) {
            console.log(error);
        }
    };
    const handleId = async (id) => {
        setProductId(id)
    };

    return (
        <Layout pageClass={"front"}>
            <div className="section-padding">
                <div className="container">
                    <div className="row">
                        {productList.map((item, i) => (
                            <div className="col-xl-4" key={i}>
                                <div className="card">
                                    <div className="card-body">
                                        <Link href={`/products/${item._id}`}>
                                            <a>
                                                <img src={item.img} alt="" className="img-fluid card-img-top" />

                                                {/* {item._id} */}
                                            </a>
                                        </Link>
                                        <h4 className="card-title">{item.title}</h4>
                                        {item.desc}
                                        <br />
                                        <button className="btn btn-danger mb-10"
                                            onClick={() => handleDelete(item._id)}
                                        >
                                            Delete
                                        </button>
                                        <button className="btn btn-danger mb-10"
                                            onClick={() => handleId(item._id)}
                                        >
                                            Edit
                                        </button>
                                        <br />
                                    </div>
                                </div>


                                {productId === item._id && <EditProduct item={item} />}

                            </div>
                        ))}
                    </div>
                </div>
            </div>



        </Layout>
    );
}

export async function getServerSideProps() {
    await dbConnect();
    const product = await getProduct();
    // const user = await getUser(req, res);
    // if (!user) {
    //   return {
    //     redirect: {
    //       permanent: false,
    //       destination: "/signin",
    //     },
    //     props: {},
    //   };
    // }
    return {
        props: {
            product,
            // user
        },
    };
}
