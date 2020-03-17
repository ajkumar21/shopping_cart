import React from 'react';
import App from './App';
import { expect } from 'chai';
import * as enzyme from 'enzyme';
import { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { calculateCost, calculateSavings } from './utils/utils';

const adapter = new Adapter();
enzyme.configure({ adapter });

describe('App should render header', () => {
  it('should render "shopping cart" ', () => {
    const wrapper = mount(<App />);
    expect(
      wrapper.containsMatchingElement(<div className='App'>Shopping Cart</div>)
    );
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
