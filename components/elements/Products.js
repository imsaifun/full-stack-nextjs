import Link from "next/link";

const Products = ({ product }) => {
    return (
        <>
            {product.map((item, i) => (
                <div className="col-xl-3" key={i}>
                    <div className="card">
                        <div className="card-body single-product">
                            <Link href={`/products/${item._id}`}>
                                <a>
                                    <img src={item.img} alt="" className="img-fluid card-img-top" />
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
                                <h3 className="text-primary mb-0">{item.prices[0].price}</h3>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </>
    );
};

export default Products;