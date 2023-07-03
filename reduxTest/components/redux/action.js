import {ADD_TO_CART} from './contants';
import {REMOVE_FROM_CART} from './contants';

export function addToCart(item) {
  return {
    type: ADD_TO_CART,
    data: item,
  };
}

export function removeFromCart(item) {
  return {
    type: REMOVE_FROM_CART,
    data: item,
  };
}
