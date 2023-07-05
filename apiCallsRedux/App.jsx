import {View, Text} from 'react-native';
import React from 'react';
import {Provider} from 'react-redux';
import store from './src/app/store';
import Products from './src/features/Products/Products';

const App = () => {
  return (
    <Provider store={store}>
      <Products />
    </Provider>
  );
};

export default App;
