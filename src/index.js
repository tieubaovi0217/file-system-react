import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import './index.css';
import 'antd/dist/antd.css';
import App from './App';

import store from './store';
import { Provider } from 'react-redux';

window.onpopstate = function (event) {
  window.location.reload(true);
};

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,

  document.getElementById('root'),
);
