import Link from "next/link";
import Layout from "../components/Layout";
import SigninForm from "../components/SigninForm";

export default function SigninPage() {

    return (
        <Layout>
            <h1>SignIn</h1>            

            <SigninForm/>

            <Link href="/signup">
                <a>SignUp</a>
            </Link>
        </Layout>
    );
}


