import { SessionProvider } from "next-auth/react";
import React from "react";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../public/css/style.css";
import store from "../redux/store";
import { useEffect, useState } from "react";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  return (
    <>
      {!loading ? (
        <SessionProvider session={session}>
          <Provider store={store}>
            {/* <Layout> */}
            <ToastContainer />
            <Component {...pageProps} />
            {/* </Layout> */}
          </Provider>
        </SessionProvider>
      ) : (
        "Loading"
      )}
    </>
  )
}

export default MyApp
