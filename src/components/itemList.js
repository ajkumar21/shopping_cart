import React from 'react';
import Item from './item';

const ItemList = ({ stock, amount, setAmount, addToCart }) => {
  return (
    <div style={{ display: 'flex' }}>
      {Object.keys(stock).map(name => (
        <Item
          key={name}
          stock={stock}
          amount={amount}
          setAmount={setAmount}
          name={name}
          addToCart={addToCart}
        />
      ))}
    </div>
  );
};

export default ItemList;
