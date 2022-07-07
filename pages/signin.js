import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import Layout from "../components/Layout";
import SigninForm from "../components/SigninForm";
import dbConnect from "../lib/dbConnect";
import getUser from "../lib/getUser";

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

export async function getServerSideProps({ req, res }) {
    await dbConnect();

    const user = await getUser(req, res);
    if (user) {
        return {
            redirect: {
                permanent: false,
                destination: "/",
            },
            props: {},
        };
    }
    return {
        props: {},
    };
}
