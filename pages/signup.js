import Link from "next/link";
import Layout from "../components/Layout";
import dbConnect from "../lib/dbConnect";
import getUser from "../lib/getUser";
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

export async function getServerSideProps({ req, res }) {
    await dbConnect();

    const user = await getUser(req, res);
    if (user) {
        return {
            redirect: {
                permanent: false,
                destination: "/signin",
            },
            props: {},
        };
    }
    return {
        props: {},
    };
}
