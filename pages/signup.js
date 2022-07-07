import Link from "next/link";
import Layout from "../components/Layout";
import SignupForm from "../components/SignupForm";

export default function SignupPage() {

    return (
        <Layout>
            <h1>SignUp</h1>

            <p>Only unauthenticated users can access this page.</p>


            <SignupForm />

            <Link href="/signin">
                <a>SignIn</a>
            </Link>
        </Layout>
    );
}


