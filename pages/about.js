import Link from "next/link";
import Layout from "../components/Layout/LayoutAdmin";

export default function About() {


    return (
        <Layout pageClass={"front"}
            headTitle={"About Us"}
            pageTitle={"About Us"}
            pageTitleSub={"Welcome About Us Page"}
            parent={"Home"}
            child={"About Us"}>


            <div className="about-one section-padding">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-6">
                            <div className="service-img">
                                <img src="/images/about/1.jpg" alt="" className="img-fluid rounded" />
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="service-content m-t-50">
                                <h3>In Brief</h3>
                                <p>Founded in January of {new Date().getFullYear()} , Pitza is a digital currency wallet and platform where
                                    merchants
                                    and consumers can transact with new digital currencies like bitcoin, ethereum, and
                                    litecoin.
                                    Were based in San Francisco, California.</p>
                                <p>Bitcoin is the worlds most widely used alternative currency with a total market cap of
                                    over
                                    $100 billion. The bitcoin network is made up of thousands of computers run by
                                    individuals
                                    all over the world.</p>

                            </div>
                        </div>
                    </div>
                    <div className="row align-items-center justify-content-between">
                        <div className="col-lg-5">
                            <div className="service-content my-5">
                                <h3>Working at Pitza</h3>
                                <p>Digital currencies are changing how we use and think about money. Pitza, the most
                                    trusted
                                    company in the space, is looking for you to join our rapidly growing team.</p>
                                <Link passHref href={'#'} className="btn btn-primary">Read more</Link>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="service-img">
                                <img src="/images/about/2.jpg" alt="" className="img-fluid rounded" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="cta section-padding bg-light">
                <div className="container">
                    <div className="row">
                        <div className="col-xl-12">
                            <div className="cta-content text-center">
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

// export async function getServerSideProps({ req, res }) {
//   await dbConnect();
//   const user = await getUser(req, res);
//   if (!user) {
//     return {
//       redirect: {
//         permanent: false,
//         destination: "/signin",
//       },
//       props: {},
//     };
//   }
//   return {
//     props: {
//       user,
//     },
//   };
// }
