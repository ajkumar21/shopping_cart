import React from 'react';
import { useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  Button,
  InputGroup,
  FormControl,
  Form,
  ListGroup,
  Row,
  Col,
  Card
} from 'react-bootstrap';

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

        <div style={{ display: 'flex' }}>
          {Object.keys(stock).map(name => (
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
                      onChange={e =>
                        setAmount({ ...amount, [name]: e.target.value })
                      }
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
              </Card.Body>
            </Card>
          ))}
        </div>
      </Col>
      <Col>
        <div className='App'>Shopping Cart</div>
      </Col>
    </Row>
  );
}

export default App;
