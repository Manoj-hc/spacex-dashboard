import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from 'mobx-react';
// import 'mobx-react-lite/batchingOptOut';
import 'mobx-react-lite/batchingForReactDom';
import StateStore from './store/StateStore';


const Root = (
  <React.StrictMode>
    <Provider StateStore={StateStore}>
      <App />
    </Provider>
  </React.StrictMode>
);

ReactDOM.render(Root, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
