import Layout from "../components/Layout/LayoutAdmin";

export default function About() {


    return (
        <Layout 
        pageClass={"front"}
        headTitle={"Contact"}
        pageTitle={"Contact"}
        pageTitleSub={"Welcome Contact Page"}
        parent={"Home"}
        child={"Contact"}>


            <div className="features section-padding bg-light" data-scroll-index="2">
                <div className="container">
                    <div className="row py-lg-5 justify-content-center">
                        <div className="col-xl-7">
                            <div className="section-title text-center">
                                <span>Problem?</span>
                                <h2>Don't Worry, I am waiting your question</h2>
                                <p>Refreshing my inbox, waiting for your mail </p>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                            <div className="customer-support-content">
                                <span><i className="fab fa-whatsapp"></i></span>
                                <h4>+8801843666660</h4>
                                <p>Without sleeping time, I am avaiable in Whstsapp. I recommend Whstsapp</p>
                                <a href="https://api.whatsapp.com/send?phone=008801843666660">Send Message <i className="la la-angle-right"></i></a>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="customer-support-content">
                                <span><i className="fab fa-skype"></i></span>
                                <h4>sporsho9</h4>
                                <p>Without sleeping time, I am avaiable in skype. I also recommend Skype</p>
                                <a href="skype:profile_name?sporsho9">Add Skype <i className="la la-angle-right"></i></a>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="customer-support-content">
                                <span><i className="fas fa-envelope"></i></span>
                                <h4>imsaifun@gmail.com</h4>
                                <p>When you send me email, I get notification, and quickly reply you</p>
                                <a href="mailto:imsaifun@gmail.com">Send Email <i className="la la-angle-right"></i></a>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="customer-support-content">
                                <span><i className="fas fa-headset"></i></span>
                                <h4>Pre sale question</h4>
                                <p>You have need more design or customization? Dont worry about Quality</p>
                                <a href="https://docs.google.com/forms/d/1KjSr2pRP9GSydodBYOz05ke6faVX0MgFCAznaYdKl6E">Hire
                                    Now <i className="la la-angle-right"></i></a>
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
