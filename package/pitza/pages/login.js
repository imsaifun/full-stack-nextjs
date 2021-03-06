import Link from "next/link"
import Layout from "../components/Layout/LayoutAdmin"
import SigninForm from "../components/SigninForm"



function Login() {

    return (
        <>

            <Layout pageClass="front">

                <div className="authincation section-padding">
                    <div className="container h-100">
                        <div className="row justify-content-center h-100 align-items-center">
                            <div className="col-xl-5 col-md-6">
                                <div className="mini-logo text-center my-20">
                                    <Link href="/">
                                        <a>
                                            <img src="/images/logo.png" alt="" />
                                        </a>
                                    </Link>
                                    <h4 className="card-title mt-20">
                                        Sign in to Pitza
                                    </h4>
                                </div>
                                <div className="auth-form card">
                                    <div className="card-body">

                                        <SigninForm />

                                        <p className="mt-15 mb-0">
                                            Don't have an account?
                                            <Link href="/register">
                                                <a className="text-primary">Sign up</a>
                                            </Link>
                                        </p>
                                    </div>
                                </div>
                                {/* <div className="privacy-link">
                                <Link href="#">
                                    <a>
                                        Have an issue with 2-factor
                                        authentication?
                                    </a>
                                </Link>
                                <br />
                                <Link href="#">
                                    <a>Privacy Policy</a>
                                </Link>
                            </div> */}
                            </div>
                        </div>
                    </div>
                </div>
            </Layout>
        </>
    )
}




export default Login
