import { Subject } from 'rxjs';

const subject = new Subject();

const initialState = {};
let state = initialState;

const cartStore = {
  init: () => subject.next(state),
  subscribe: setState => subject.subscribe(setState),
  addItemToCart: (name, price, quantity) => {
    if (quantity > 0) {
      if (state[name]) {
        state = {
          ...state,
          [name]: {
            ...state[name],
            quantity: parseFloat(state[name].quantity) + parseFloat(quantity)
          }
        };
      } else {
        state = {
          ...state,
          [name]: { price, quantity: parseFloat(quantity), edit: false }
        };
      }
    }
    subject.next(state);
  },
  updateQuantity: (name, e) => {
    state = {
      ...state,
      [name]: { ...state[name], quantity: e.target.value }
    };
    subject.next(state);
  },
  initialState
};

export default cartStore;
