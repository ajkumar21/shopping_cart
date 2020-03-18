import React from 'react';
import { useState, useEffect } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Row, Col } from 'react-bootstrap';
import ItemList from './components/itemList';
import cartStore from './utils/store';
import Cart from './components/cart';
import {
  calculateSavings,
  calculateTotalSavings,
  calculateTotal,
  calculateSubtotal
} from './utils/utils';

function App() {
  const [amount, setAmount] = useState({ Oranges: 0, Coke: 0, Beans: 0 });
  const [cart, setCart] = useState(cartStore.initialState);
  const stock = {
    Oranges: { price: 1.99, offer: '', priceCalc: 'byWeight' },
    Coke: { price: 0.7, offer: '2 for £1', priceCalc: 'byUnit' },
    Beans: { price: 0.5, offer: '3 for 2', priceCalc: 'byUnit' }
  };

  useEffect(() => {
    cartStore.subscribe(setCart);
    cartStore.init();
  }, []);

  return (
    <div>
      <Row>
        <Col>
          <div className='App'>Items</div>
          <br />
          <ItemList
            stock={stock}
            amount={amount}
            setAmount={setAmount}
            addToCart={cartStore.addItemToCart}
          />
        </Col>
        <Col>
          <div className='App'>Shopping Cart</div>
          <br />
          <Cart cart={cart} cartStore={cartStore} stock={stock} />
        </Col>
      </Row>
    </div>
  );
}

export default App;
