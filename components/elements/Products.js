import axios from "axios";
import Link from "next/link";
import { useState } from "react";
// import EditProduct from "../../components/EditProduct";

const Products = ({ product }) => {
    const myProduct = product.product

    const [productList, setProductList] = useState(myProduct);
    // const [productId, setProductId] = useState("");
    // const router = useRouter();
    console.log(productList);

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
        <>
            {productList.map((item, i) => (
                <div className="col-xl-3" key={i}>
                    <div className="card">
                        <div className="card-body">
                            <Link href={`/products/${item._id}`}>
                                <a>
                                    <img src={item.img} alt="" className="img-fluid card-img-top" />

                                    {/* {item._id} */}
                                </a>
                            </Link>
                            <h4 className="card-title">{item.title}</h4>
                            {item.rating}
                            <br />
                            {item.prices[0].price}
                            {/* <br />
                                        <button className="btn btn-danger mb-10"
                                            onClick={() => handleDelete(item._id)}
                                        >
                                            Delete
                                        </button>
                                        <button className="btn btn-danger mb-10"
                                            onClick={() => handleId(item._id)}
                                        >
                                            Edit
                                        </button> */}
                            <br />
                        </div>
                    </div>


                    {/* {productId === item._id && <EditProduct item={item} />} */}

                </div>
            ))}
        </>
    );
};

export default Products;