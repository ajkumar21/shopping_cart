import React from 'react';
import App from './App';
import { expect } from 'chai';
import * as enzyme from 'enzyme';
import { mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { calculateCost, calculateSavings } from './utils/utils';
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
          </Card.Body>
        </Card>
      )
    ).be.true;
  });
});

describe('helper functions', () => {
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
});
