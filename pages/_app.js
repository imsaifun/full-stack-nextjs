import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "../public/css/style.css";
import { SessionProvider } from "next-auth/react"
import { Provider } from "react-redux";
import store from "../redux/store";
export default function  App({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <>
      <SessionProvider session={session}>
        <Provider store={store}>
            <ToastContainer />
            <Component {...pageProps} />
        </Provider>
      </SessionProvider>
    </>
  );
}
