
import 'bootstrap/dist/css/bootstrap.min.css';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { persistor, Store } from '../redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import Hearder from '../components/Hearder';
import Footer from '../components/Footer';


function MyApp({ Component, pageProps }) {

  return (
    <Provider store={Store}>

      <PersistGate loading={null} persistor={persistor}>
        <Hearder />
        <Component {...pageProps} />
        <Footer />
        <ToastContainer
          position="bottom-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </PersistGate>

    </Provider>
  )
}

export default MyApp;