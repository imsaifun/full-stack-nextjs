
import Link from "next/link";
import Products from "../components/elements/Products";
import Layout from "../components/Layout/LayoutAdmin";
import dbConnect from "../lib/dbConnect";
import getProduct from "../lib/getProduct";


export default function HomePage( product ) {

    return (
        <Layout pageClass="front">

            <div className="intro section-padding bg-light" id="intro">
                <div className="container">
                    <div className="row align-items-center justify-content-between">
                        <div className="col-xl-5 col-md-6 py-md-30">
                            <div className="demo-content my-30">
                                <h6>Free Home Delivery 24 Hours</h6>
                                <h2>
                                    The Fastest Delivery to your Favourite Food
                                </h2>
                                <p>
                                    Rekruter is the complete UX & UI job board listing directory. Here included jobs, jobs details,
                                    company, company details and more pages.
                                </p>

                                <div className="intro-btn mt-5">
                                    <Link href="/products">
                                        <a className="btn btn-primary">
                                            Order Now
                                            <i className="bi bi-arrow-right"></i>
                                        </a>
                                    </Link>
                                    {/* <Link href="/upload">
                                            <a className="btn btn-outline-primary">
                                                Create
                                            </a>
                                        </Link> */}
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-6 col-md-6 py-md-30">
                            <div className="intro-img mt-50">
                                <img
                                    src="/images/intro/1.png"
                                    alt=""
                                    className="img-fluid"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="offer-banner section-padding">
                <div className="container">
                    <div className="row">
                        <div className="col-xl-6">
                            <div class="single-banner bg-primary">
                                <img class="bg-img" src="/images/offer/1.png" alt="img" />
                                <div class="single-banner-details">
                                    <h2>Special Deliciaus </h2>
                                    <h5>Maxican Pizza Testes Better</h5>
                                    <Link href="/products">
                                        <a class="btn btn-dark">ORDER NOW</a>
                                    </Link>
                                </div>
                                <div class="offer-sticker">
                                    <img src="/images/offer/offer.png" alt="img" />
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-6">
                            <div class="single-banner bg-primary">
                                <img class="bg-img" src="/images/offer/2.png" alt="img" />
                                <div class="single-banner-details">
                                    <h3>Enjoy Our Delicious Item</h3>
                                    <Link href="/products">
                                        <a class="btn btn-dark">ORDER NOW</a>
                                    </Link>
                                </div>
                            </div>
                            <div class="single-banner">
                                <div class="animated-img"><img src="/images/offer/03.png" alt="img" /></div>
                                <div class="animated-img animated-img-2"><img src="/images/offer/03.png" alt="img" /></div>
                                <div class="overlay-gradient"></div>
                                <div class="single-banner-details">
                                    <h3 class="text-heading">The Fastest In Delivery <span>Food</span></h3>
                                    <Link href="/products">
                                        <a class="btn btn-primary">ORDER NOW</a>
                                    </Link>
                                </div>
                                <img class="bg-img-2" src="/images/offer/3.png" alt="img" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

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
