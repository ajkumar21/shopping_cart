import React from 'react';
import Item from './item';

const ItemList = ({ stock, amount, setAmount }) => {
  return (
    <div style={{ display: 'flex' }}>
      {Object.keys(stock).map(name => (
        <Item stock={stock} amount={amount} setAmount={setAmount} name={name} />
      ))}
    </div>
  );
};

export default ItemList;
