import { createRoot } from 'react-dom/client';
import './index.css';
import Router from './routes/Router.jsx';
import { Provider } from 'react-redux';
import store from './store/store.js'
import swRegister from '../swRegister.js';

createRoot(document.getElementById('root')).render(
    <Provider store={store}>
      <Router />
    </Provider>
);

swRegister();