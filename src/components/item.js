import React from 'react';
import { Button, InputGroup, FormControl, Form, Card } from 'react-bootstrap';

const Item = ({ stock, amount, setAmount, name, addToCart }) => {
  return (
    <Card key={name} style={{ width: '9rem', display: 'flex' }}>
      <Card.Body>
        <Card.Title style={{ textAlign: 'center' }}>{name}</Card.Title>
        {stock[name].priceCalc === 'byWeight' ? (
          <h6>Weight</h6>
        ) : (
          <h6>Quantity</h6>
        )}
        <Form>
          <InputGroup>
            <FormControl
              aria-label='Weight'
              value={amount[name]}
              onChange={e => setAmount({ ...amount, [name]: e.target.value })}
            />
            {stock[name].priceCalc === 'byWeight' ? (
              <InputGroup.Append>
                <InputGroup.Text>kg</InputGroup.Text>
              </InputGroup.Append>
            ) : (
              <React.Fragment />
            )}
          </InputGroup>
        </Form>
        <br />
        <Button
          onClick={() => {
            addToCart(name, amount, stock[name].price);
            setAmount({ ...amount, [name]: 0 });
          }}
        >
          Add to Cart
        </Button>
      </Card.Body>
    </Card>
  );
};

export default Item;
