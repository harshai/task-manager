import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import App from './App';
import taskManager from '../../reducers';

let store = createStore(taskManager);
it('renders without crashing', () => {
  const div = document.createElement('div');
  render(
    <Provider store={store}>
      <App />
    </Provider>,
    div
  );
});
