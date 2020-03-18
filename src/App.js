import React from 'react';
import { useState, useEffect } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  Row,
  Col,
  InputGroup,
  Button,
  FormControl,
  ListGroup
} from 'react-bootstrap';
import ItemList from './components/itemList';
import cartStore from './utils/store';
import { calculateCost } from './utils/utils';

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
        <ListGroup>
          {Object.keys(cart).map(name => (
            <ListGroup.Item key={name}>{name}</ListGroup.Item>
          ))}
        </ListGroup>
      </Col>
    </Row>
  );
}

export default App;
