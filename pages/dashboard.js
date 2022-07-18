import * as React from "react"
import Layout from "../components/Layout/LayoutAdmin"

// const theme = createTheme()

function Dashboard() {



  return (
    <>
      <Layout role="admin" pageClass="admin">

        <h1 component="h1" variant="h5">
          Dashboard
        </h1>
        <h3>This is secret page</h3>
      </Layout>
    </>
  )
}



export default Dashboard
