import React from 'react';
import { InputGroup, Button, FormControl, ListGroup } from 'react-bootstrap';
import { calculateCost } from '../utils/utils';

const Cart = ({ cart, cartStore, stock }) => {
  return (
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
              £{calculateCost(cart[name].quantity, cart[name].price).toFixed(2)}
            </p>
            <br />
            {cart[name].edit ? (
              <div>
                <br />
                <br />
                <Button onClick={() => cartStore.saveItem(name)}>Save</Button>
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
  );
};

export default Cart;
