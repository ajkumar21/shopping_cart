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
  const [amount, setAmount] = useState({ Oranges: '', Coke: '', Beans: '' });
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
      <Row>
        <Col></Col>
        <Col>
          <div>
            <div style={{ float: 'left' }}>Subtotal:</div>
            <div style={{ float: 'right' }}>
              £{calculateSubtotal(cart).toFixed(2)}
            </div>
            <br />
          </div>
          <br />
          <div style={{ float: 'left' }}>Savings:</div>
          <div>
            {Object.keys(cart).map(name =>
              stock[name].offer !== '' ? (
                <div key={name}>
                  <br />
                  <div style={{ float: 'left' }}>
                    {name} {stock[name].offer} :
                  </div>
                  <div style={{ float: 'right' }}>
                    -£
                    {calculateSavings(
                      name,
                      cart[name].quantity,
                      cart[name].price
                    ).toFixed(2)}
                  </div>
                </div>
              ) : (
                <React.Fragment key={name} />
              )
            )}
          </div>
          <br />
          <br />
          <div style={{ float: 'left' }}>Total Savings: </div>
          <div style={{ float: 'right' }}>
            -£{calculateTotalSavings(cart).toFixed(2)}
          </div>
          <br />
          <br />
          <h2 style={{ textAlign: 'center' }}>
            Total £{calculateTotal(cart).toFixed(2)}
          </h2>
        </Col>
      </Row>
    </div>
  );
}

export default App;
