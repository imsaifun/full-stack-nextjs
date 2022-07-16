import Layout from "../../components/Layout/LayoutAdmin"
import SigninForm from "../../components/SigninForm"



function Login() {

  return (
    <>

      <Layout pageClass="front">



        <h1 component="h1" variant="h5">
          Sign in
        </h1>

        <SigninForm/>
      </Layout>
    </>
  )
}




export default Login
