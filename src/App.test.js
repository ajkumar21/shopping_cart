import React from 'react';
import App from './App';
import { expect } from 'chai';
import * as enzyme from 'enzyme';
import { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { calculateCost } from './utils/utils';

const adapter = new Adapter();
enzyme.configure({ adapter });

describe('App should render header', () => {
  it('should render "shopping cart" ', () => {
    const wrapper = mount(<App />);
    expect(wrapper.html()).to.eq('<div class="App">Shopping Cart</div>');
  });
});

describe('helper functions', () => {
  it('should calculate cost', () => {
    const exampleQuantity = 4;
    const examplePrice = 2.0;
    const cost = calculateCost(exampleQuantity, examplePrice);
    expect(cost).to.eq(8);
  });
});
