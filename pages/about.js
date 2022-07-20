import Link from "next/link";
import Layout from "../components/Layout/LayoutAdmin";

export default function About() {


  return (
    <Layout   pageClass={"front"}
    headTitle={"Contact"}
    pageTitle={"Contact"}
    pageTitleSub={"Welcome Contact Page"}
    parent={"Home"}
    child={"Contact"}>


      <div className="about-one section-padding">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <div className="service-img">
                <img src="/images/about/1.jpg" alt="" className="img-fluid" />
              </div>
            </div>
            <div className="col-lg-6">
              <div className="service-content m-t-50">
                <h3>In Brief</h3>
                <p>Founded in January of {new Date().getFullYear()} , Tradix is a digital currency wallet and platform where
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
        </div>
      </div>
      <div className="our-ceo py-5">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="ceo-content">
                <div className="d-flex align-items-start">
                  <img src="/images/avatar/6.jpg" alt="" className="img-fluid me-4 rounded-circle" />
                  <div className="flex-grow-1">
                    <h3>Eric Benz</h3>
                    <span>CEO of Tradix</span>
                    <p className="mt-2">John Abraham has over 10 years of experience working in and around
                      Financial Technology. He has delivered innovative SaaS systems for some of
                      todays biggest institutions around payments, identity, and banking
                      infrastructure. John Abraham has been in the Blockchain space since 2012 and is
                      involved in a number of blockchain and fintech businesses both as an investor,
                      board director, and founder.</p>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="about-two section-padding">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <div className="service-content my-5">
                <h3>Working at Tradix</h3>
                <p>Digital currencies are changing how we use and think about money. Tradix, the most
                  trusted
                  company in the space, is looking for you to join our rapidly growing team.</p>
                <Link passHref href={'#'} className="btn btn-primary">Read more</Link>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="service-img">
                <img src="/images/about/1.jpg" alt="" className="img-fluid" />
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
