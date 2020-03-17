var calculateCost = require('./utils/utils');
var expect = require('chai').expect;

describe('#sum()', function() {
  context('calculate cost', function() {
    it('should return the cost of items', function() {
      const price = 3.0;
      const quantity = 4;
      expect(calculateCost(quantity, price)).to.equal(12);
    });
  });
});
