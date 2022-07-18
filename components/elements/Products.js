import Link from "next/link";
// import EditProduct from "../../components/EditProduct";

const Products = ({ product }) => {

    // const [productList, setProductList] = useState(product);
    // const [productId, setProductId] = useState("");
    // const router = useRouter();
    // console.log(product);

    // const handleDelete = async (id) => {

    //     // console.log(id);

    //     try {
    //         const res = await axios.delete(`/api/products/${id}`);
    //         setProductList(productList.filter((pizza) => pizza._id !== id));
    //     } catch (error) {
    //         console.log(error);
    //     }
    // };
    // const handleId = async (id) => {
    //     setProductId(id)
    // };
    return (
        <>
            {product.map((item, i) => (
                <div className="col-xl-3" key={i}>
                    <div className="card">
                        <div className="card-body">
                            <Link href={`/products/${item._id}`}>
                                <a>
                                    <img src={item.img} alt="" className="img-fluid card-img-top" />

                                    {/* {item._id} */}
                                </a>
                            </Link>
                            <div className="d-flex justify-content-between align-items-center">
                                <div>
                                    <h4 className="card-title">{item.title}</h4>
                                    <span className="rating">
                                        {item.rating == 5 && (
                                            <>
                                                <i className="bi bi-star-fill"></i>
                                                <i className="bi bi-star-fill"></i>
                                                <i className="bi bi-star-fill"></i>
                                                <i className="bi bi-star-fill"></i>
                                                <i className="bi bi-star-fill"></i>
                                            </>)}
                                        {item.rating == 4 && (
                                            <>
                                                <i className="bi bi-star-fill"></i>
                                                <i className="bi bi-star-fill"></i>
                                                <i className="bi bi-star-fill"></i>
                                                <i className="bi bi-star-fill"></i>
                                                <i className="bi bi-star"></i>
                                            </>)}
                                        {item.rating == 3 && (
                                            <>
                                                <i className="bi bi-star-fill"></i>
                                                <i className="bi bi-star-fill"></i>
                                                <i className="bi bi-star-fill"></i>
                                                <i className="bi bi-star"></i>
                                                <i className="bi bi-star"></i>
                                            </>)}
                                        {item.rating == 2 && (
                                            <>
                                                <i className="bi bi-star-fill"></i>
                                                <i className="bi bi-star-fill"></i>
                                                <i className="bi bi-star"></i>
                                                <i className="bi bi-star"></i>
                                                <i className="bi bi-star"></i>
                                            </>)}
                                        {item.rating == 1 && (
                                            <>
                                                <i className="bi bi-star-fill"></i>
                                                <i className="bi bi-star"></i>
                                                <i className="bi bi-star"></i>
                                                <i className="bi bi-star"></i>
                                                <i className="bi bi-star"></i>
                                            </>)}
                                        {!item.rating == null}
                                    </span>
                                </div>
                                <h4>{item.prices[0].price}</h4>
                            </div>

                            <br />

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