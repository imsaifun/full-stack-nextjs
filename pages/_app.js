import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "../public/css/style.css";

import { Provider } from "react-redux";
import store from "../redux/store";
export default function App({ Component, pageProps }) {
  return (
    <>
      <ToastContainer />
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </>
  );
}
