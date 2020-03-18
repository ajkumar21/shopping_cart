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
            <ListGroup.Item key={name}>
              {name}
              <div>
                <div style={{ float: 'left' }}>
                  {cart[name].edit ? (
                    <InputGroup style={{ width: '3.5rem' }}>
                      <FormControl
                        aria-label='Weight'
                        value={cart[name].quantity}
                        onChange={e => cartStore.updateQuantity(name, e)}
                      />
                    </InputGroup>
                  ) : (
                    <React.Fragment> {cart[name].quantity}</React.Fragment>
                  )}
                  {stock[name].priceCalc === 'byWeight' ? (
                    <React.Fragment>
                      kg @ £{cart[name].price.toFixed(2)} per kg
                    </React.Fragment>
                  ) : (
                    <React.Fragment>
                      @ £{cart[name].price.toFixed(2)} each
                    </React.Fragment>
                  )}
                </div>
                <p style={{ float: 'right' }}>
                  £
                  {calculateCost(cart[name].quantity, cart[name].price).toFixed(
                    2
                  )}
                </p>
                <br />
                {cart[name].edit ? (
                  <div>
                    <br />
                    <br />
                    <Button onClick={() => cartStore.saveItem(name)}>
                      Save
                    </Button>
                  </div>
                ) : (
                  <div>
                    <Button onClick={() => cartStore.editQuantity(name)}>
                      Edit
                    </Button>{' '}
                    <Button
                      variant='danger'
                      onClick={() => cartStore.deleteItem(name)}
                    >
                      Delete
                    </Button>
                  </div>
                )}
              </div>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Col>
    </Row>
  );
}

export default App;
