import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { icons } from './assets/icons'
import App from './App';
// import '@coreui/dist/css/coreui.min.css';
import { SnackbarProvider } from 'notistack';
import reportWebVitals from './reportWebVitals';
import store from './store/Store'
import { Provider } from 'react-redux'
import 'bootstrap/dist/css/bootstrap.min.css';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';

React.icons = icons
ReactDOM.render(
  <Provider store={store}>
    <SnackbarProvider maxSnack={3} anchorOrigin={{vertical: 'bottom',horizontal: 'right'}}>
      <App/>
    </SnackbarProvider>
    {/* <App/> */}
  </Provider>,
  document.getElementById('root')
);

serviceWorkerRegistration.unregister();
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

reportWebVitals();
