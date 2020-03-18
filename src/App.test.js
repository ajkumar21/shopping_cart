import React, { useState } from 'react';
import App from './App';
import { expect } from 'chai';
import * as enzyme from 'enzyme';
import { mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {
  calculateCost,
  calculateSavings,
  calculateSubtotal,
  calculateTotal,
  calculateTotalSavings
} from './utils/utils';
import {
  Button,
  InputGroup,
  FormControl,
  Form,
  ListGroup,
  Card
} from 'react-bootstrap';

import cartStore from './utils/store';

const adapter = new Adapter();
enzyme.configure({ adapter });

describe('App should render headers', () => {
  const wrapper = mount(<App />);

  it('should render "Shopping Cart" ', () => {
    expect(
      wrapper.containsMatchingElement(<div className='App'>Shopping Cart</div>)
    ).be.true;
  });

  it('should render "Items" ', () => {
    expect(wrapper.containsMatchingElement(<div className='App'>Items</div>)).be
      .true;
  });
});

describe('App should render 3 cards', () => {
  const wrapper = mount(<App />);

  it('should render one card for Oranges', () => {
    expect(
      wrapper.containsMatchingElement(
        <Card key={name} style={{ width: '9rem', display: 'flex' }}>
          <Card.Body>
            <Card.Title style={{ textAlign: 'center' }}>Oranges</Card.Title>
            <h6>Weight</h6>
            <Form>
              <InputGroup>
                <FormControl aria-label='Weight' />
                <InputGroup.Append>
                  <InputGroup.Text>kg</InputGroup.Text>
                </InputGroup.Append>
              </InputGroup>
            </Form>
            <br />
            <Button>Add to Cart</Button>
          </Card.Body>
        </Card>
      )
    ).be.true;
  });

  it('should render one card for Coke', () => {
    expect(
      wrapper.containsMatchingElement(
        <Card key={name} style={{ width: '9rem', display: 'flex' }}>
          <Card.Body>
            <Card.Title style={{ textAlign: 'center' }}>Coke</Card.Title>
            <h6>Quantity</h6>
            <Form>
              <InputGroup>
                <FormControl aria-label='Weight' />
                <React.Fragment />
              </InputGroup>
            </Form>
            <br />
            <Button>Add to Cart</Button>
          </Card.Body>
        </Card>
      )
    ).be.true;
  });

  it('should render one card for Beans', () => {
    expect(
      wrapper.containsMatchingElement(
        <Card key={name} style={{ width: '9rem', display: 'flex' }}>
          <Card.Body>
            <Card.Title style={{ textAlign: 'center' }}>Beans</Card.Title>
            <h6>Quantity</h6>
            <Form>
              <InputGroup>
                <FormControl aria-label='Weight' />
                <React.Fragment />
              </InputGroup>
            </Form>
            <br />
            <Button>Add to Cart</Button>
          </Card.Body>
        </Card>
      )
    ).be.true;
  });
});

describe('Helper functions', () => {
  it('should calculate cost', () => {
    const exampleQuantity = 4;
    const examplePrice = 2.0;
    const cost = calculateCost(exampleQuantity, examplePrice);
    expect(cost).to.eq(8);
  });

  it('should calculate savings for 1 coke', () => {
    const itemName = 'Coke';
    const exampleQuantity = 1;
    const examplePrice = 0.7;
    const savings = calculateSavings(itemName, exampleQuantity, examplePrice);
    expect(savings).to.eq(0);
  });

  it('should calculate savings for 2 cokes', () => {
    const itemName = 'Coke';
    const exampleQuantity = 2;
    const examplePrice = 0.7;
    const savings = calculateSavings(itemName, exampleQuantity, examplePrice);
    expect(savings).to.eq(0.4);
  });

  it('should calculate savings for 3 cokes', () => {
    const itemName = 'Coke';
    const exampleQuantity = 2;
    const examplePrice = 0.7;
    const savings = calculateSavings(itemName, exampleQuantity, examplePrice);
    expect(savings).to.eq(0.4);
  });

  it('should calculate savings for 2 cans of beans', () => {
    const itemName = 'Beans';
    const exampleQuantity = 2;
    const examplePrice = 0.5;
    const savings = calculateSavings(itemName, exampleQuantity, examplePrice);
    expect(savings).to.eq(0);
  });

  it('should calculate savings for 3 cans of beans', () => {
    const itemName = 'Beans';
    const exampleQuantity = 3;
    const examplePrice = 0.5;
    const savings = calculateSavings(itemName, exampleQuantity, examplePrice);
    expect(savings).to.eq(0.5);
  });

  it('should calculate savings for 4 cans of beans', () => {
    const itemName = 'Beans';
    const exampleQuantity = 3;
    const examplePrice = 0.5;
    const savings = calculateSavings(itemName, exampleQuantity, examplePrice);
    expect(savings).to.eq(0.5);
  });

  const exampleCart = {
    Oranges: { price: 1.99, quantity: 3 },
    Coke: { price: 0.7, quantity: 2 },
    Beans: { price: 0.5, quantity: 3 }
  };

  it('should calculate subtotal', () => {
    const subtotal = calculateSubtotal(exampleCart);
    expect(subtotal).to.eq(8.87);
  });

  it('should calculate total savings', () => {
    const subtotal = calculateTotalSavings(exampleCart);
    expect(subtotal).to.eq(0.9);
  });

  it('should calculate total', () => {
    const subtotal = calculateTotal(exampleCart);
    expect(subtotal).to.eq(7.97);
  });
});

describe('Cart should have the items once added', () => {
  const wrapper = mount(<App />);

  it('item should be added to cart once quantity is changed and add to cart is clicked', () => {
    wrapper
      .find('input')
      .first()
      .simulate('change', { target: { value: '1' } });
    wrapper
      .find('button')
      .first()
      .simulate('click');
    expect(
      wrapper.containsMatchingElement(
        <ListGroup.Item key={name}>
          Oranges
          <div>
            <div>
              <React.Fragment>1</React.Fragment>
              <React.Fragment>kg @ £1.99 per kg</React.Fragment>
            </div>
            <p>£1.99</p>
            <br />
            <div>
              <Button>Edit</Button> <Button variant='danger'>Delete</Button>
            </div>
          </div>
        </ListGroup.Item>
      )
    ).be.true;
  });

  it('item should be added to cart once quantity is changed and add to cart is clicked', () => {
    wrapper
      .find('input')
      .at(1)
      .simulate('change', { target: { value: '1' } });
    wrapper
      .find('button')
      .at(1)
      .simulate('click');
    expect(
      wrapper.containsMatchingElement(
        <ListGroup.Item key={name}>
          Coke
          <div>
            <div>
              <React.Fragment>1</React.Fragment>
              <React.Fragment>@ £0.70 each</React.Fragment>
            </div>
            <p>£0.70</p>
            <br />
            <div>
              <Button>Edit</Button> <Button variant='danger'>Delete</Button>
            </div>
          </div>
        </ListGroup.Item>
      )
    ).be.true;
  });

  it('item should be added to cart once quantity is changed and add to cart is clicked', () => {
    wrapper
      .find('input')
      .at(2)
      .simulate('change', { target: { value: '1' } });
    wrapper
      .find('button')
      .at(2)
      .simulate('click');
    expect(
      wrapper.containsMatchingElement(
        <ListGroup.Item key={name}>
          Beans
          <div>
            <div>
              <React.Fragment>1</React.Fragment>
              <React.Fragment>@ £0.50 each</React.Fragment>
            </div>
            <p>£0.50</p>
            <br />
            <div>
              <Button>Edit</Button> <Button variant='danger'>Delete</Button>
            </div>
          </div>
        </ListGroup.Item>
      )
    ).be.true;
  });
});
