import SwiperCore, { Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

SwiperCore.use([Navigation]);

const Testimonial = () => {
    return (
        <>
            <Swiper
                slidesPerView={1}
                spaceBetween={30}
                loop={true}
                navigation={{
                    prevEl: ".custom_prev",
                    nextEl: ".custom_next",
                }}
                className="custom-class"
            >
                <SwiperSlide>
                    <div className="row align-items-center" style={{ "display": "flex!important;" }}>
                        <div className="col-xl-6 col-lg-6">
                            <div className="customer-img">
                                <img className="img-fluid" src="/images/testimonial/1.jpg" alt="" />
                            </div>
                        </div>
                        <div className="col-xl-6 col-lg-6">
                            <div className="customer-review">
                                <img className="img-fluid" src="/images/brand/2.webp" alt="" />
                                <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nisi voluptas
                                    dignissimos similique quas molestiae doloribus recusandae voluptatem et
                                    repudiandae veritatis.</p>
                                <div className="customer-info">
                                    <h6>Mr John Doe</h6>
                                    <p>CEO, Example Company</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="row align-items-center">
                        <div className="col-xl-6 col-lg-6">
                            <div className="customer-img">
                                <img className="img-fluid" src="/images/testimonial/2.jpg" alt="" />
                            </div>
                        </div>
                        <div className="col-xl-6 col-lg-6">
                            <div className="customer-review">
                                <img className="img-fluid" src="/images/brand/3.webp" alt="" />
                                <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nisi voluptas
                                    dignissimos similique quas molestiae doloribus recusandae voluptatem et
                                    repudiandae veritatis.</p>
                                <div className="customer-info">
                                    <h6>Mr Abraham</h6>
                                    <p>CEO, Example Company</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </SwiperSlide>
            </Swiper>

            <div className="custom-nav">
                <a className="custom_prev">
                    <i className="bi bi-chevron-left"></i>
                </a>
                <a className="custom_next">
                    <i className="bi bi-chevron-right"></i>
                </a>
            </div>
        </>
    );
};

export default Testimonial;
