
import Link from "next/link";
import Products from "../components/elements/Products";
import Testimonial from '../components/elements/Testimonial';
import Layout from "../components/Layout/LayoutAdmin";
import dbConnect from "../lib/dbConnect";
import getProduct from "../lib/getProduct";


export default function HomePage({ product }) {

    return (
        <Layout pageClass="front">

            <div className="intro section-padding bg-primary" id="intro">
                <div className="container">
                    <div className="row align-items-center justify-content-between">
                        <div className="col-xl-5 col-md-6 py-md-30">
                            <div className="intro-content my-30">
                                <h6>Free Home Delivery 24 Hours</h6>
                                <h2>
                                    The Fastest Delivery to your Favourite Food
                                </h2>
                                <p>
                                Pizza is a family owned and operated business. We endeavour to bring to Dhaka the type of pizza you get on any street corner in your city.
                                </p>

                                <div className="intro-btn mt-5">
                                    <Link href="/products">
                                        <a>
                                            Order Now
                                            <i className="ms-20 bi bi-cart-fill"></i>
                                        </a>
                                    </Link>
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
                            <div className="single-banner bg-primary">
                                <img className="bg-img" src="/images/offer/1.png" alt="img" />
                                <div className="single-banner-details">
                                    <h2>Special Deliciaus </h2>
                                    <h5>Maxican Pizza Testes Better</h5>
                                    <Link href="/products">
                                        <a className="btn btn-dark">ORDER NOW</a>
                                    </Link>
                                </div>
                                <div className="offer-sticker">
                                    <img src="/images/offer/offer.png" alt="img" />
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-6">
                            <div className="single-banner bg-primary">
                                <img className="bg-img" src="/images/offer/2.png" alt="img" />
                                <div className="single-banner-details">
                                    <h3>Enjoy Our Delicious Item</h3>
                                    <Link href="/products">
                                        <a className="btn btn-dark">ORDER NOW</a>
                                    </Link>
                                </div>
                            </div>
                            <div className="single-banner">
                                <div className="animated-img"><img src="/images/offer/03.png" alt="img" /></div>
                                <div className="animated-img animated-img-2"><img src="/images/offer/03.png" alt="img" /></div>
                                <div className="overlay-gradient"></div>
                                <div className="single-banner-details">
                                    <h3 className="text-heading">The Fastest In Delivery <span>Food</span></h3>
                                    <Link href="/products">
                                        <a className="btn btn-primary">ORDER NOW</a>
                                    </Link>
                                </div>
                                <img className="bg-img-2" src="/images/offer/3.png" alt="img" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="section-padding">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-xl-7">
                            <div className="section-title text-center">
                                <span>Tasty how The new</span>
                                <h2>Our Popular Dishes</h2>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <Products product={product} />
                    </div>
                </div>
            </div>

            <div className="why-choose section-padding">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-xl-7">
                            <div className="section-title text-center">
                                <span>Why choose us</span>
                                <h2>Why we are the best</h2>
                            </div>
                        </div>
                    </div>
                    <div className="row align-items-center justify-content-between">
                        <div className="col-xl-5">
                                <div className="row">
                                    <div className="col-xl-6">
                                        <div className="why-choose-content">
                                             <i class="bi bi-flower1"></i>
                                            <div className="flex-grow-1">
                                                <h4>Fresh food</h4>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-xl-6">
                                        <div className="why-choose-content">
                                             <i class="bi bi-truck"></i>
                                            <div className="flex-grow-1">
                                                <h4>Fast Delivery</h4>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-xl-6">
                                        <div className="why-choose-content">
                                             <i class="bi bi-hand-thumbs-up-fill"></i>
                                            <div className="flex-grow-1">
                                                <h4> Quality Maintain</h4>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-xl-6">
                                        <div className="why-choose-content">
                                             <i class="bi bi-headset"></i>
                                            <div className="flex-grow-1">
                                                <h4> 24/7 Service</h4>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                        </div>
                        <div className="col-xl-6">
                            <div className="why-choose_img">
                                <img src="/images/pizza.jpg" alt="" className="img-fluid" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="testimonial section-padding bg-light">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-xl-6">
                            <div className="section-title">
                                <h2>What our customer says</h2>
                            </div>
                        </div>
                    </div>
                    <div className="row justify-content-center">
                        <div className="col-xl-8">
                            <div className="testimonial-content">
                                <Testimonial />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="interested-join section-padding">
                <div className="container">
                    <div className="row">
                        <div className="col-xl-12">
                            <div className="interested-join-content text-center">
                                <h2>You have any questions?</h2>
                                <p>Hit us up and well get in touch with you.</p>
                                <Link href="/contact">
                                    <a className="btn btn-primary">Contact Now</a>
                                </Link>
                            </div>
                        </div>
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
