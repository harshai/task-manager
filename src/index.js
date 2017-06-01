import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import App from './containers/app/App';
import taskManager from './reducers';
import './index.css';

let store = createStore(taskManager);

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

document.getElementById('root').onclick = () => console.log(store.getState())
