import React from 'react';
import { useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Row, Col } from 'react-bootstrap';
import ItemList from './components/itemList';

function App() {
  const [amount, setAmount] = useState({ Oranges: 0, Coke: 0, Beans: 0 });

  const stock = {
    Oranges: { price: 1.99, offer: '', priceCalc: 'byWeight' },
    Coke: { price: 0.7, offer: '2 for £1', priceCalc: 'byUnit' },
    Beans: { price: 0.5, offer: '3 for 2', priceCalc: 'byUnit' }
  };

  return (
    <Row>
      <Col>
        <div className='App'>Items</div>
        <br />
        <ItemList stock={stock} amount={amount} setAmount={setAmount} />
      </Col>
      <Col>
        <div className='App'>Shopping Cart</div>
      </Col>
    </Row>
  );
}

export default App;
