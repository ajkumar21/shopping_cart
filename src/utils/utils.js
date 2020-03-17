export function calculateCost(quantity, price) {
  return quantity * price;
}

export function calculateSavings(name, quantity, price) {
  if (name === 'Coke') {
    //2 for £1
    //cart[name].price * 2 - 1 = saving after multibuy
    const saving = Math.floor(quantity / 2) * (price * 2 - 1);
    return parseFloat(saving.toFixed(2));
  } else if (name === 'Beans') {
    //3 for 2
    const saving = Math.floor(quantity / 3) * price;
    return parseFloat(saving.toFixed(2));
  }
  return 0;
}
