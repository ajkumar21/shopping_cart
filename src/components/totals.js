import React from "react";
import {
  calculateSavings,
  calculateTotalSavings,
  calculateTotal,
  calculateSubtotal
} from "../utils/utils";
import { Card } from "react-bootstrap";

const Totals = ({ cart, stock }) => {
  return (
    <Card style={{ padding: "0.75rem 1.25rem" }}>
      <div>
        <div style={{ float: "left" }}>Subtotal:</div>
        <div style={{ float: "right" }}>
          £{calculateSubtotal(cart).toFixed(2)}
        </div>
        <br />
      </div>
      <br />
      <div style={{ float: "left" }}>Savings:</div>
      <div>
        {Object.keys(cart).map(name =>
          stock[name].offer !== "" ? (
            <div key={name}>
              <br />
              <div style={{ float: "left" }}>
                {name} {stock[name].offer} :
              </div>
              <div style={{ float: "right" }}>
                -£
                {calculateSavings(
                  name,
                  cart[name].quantity,
                  cart[name].price
                ).toFixed(2)}
              </div>
            </div>
          ) : (
            <React.Fragment key={name} />
          )
        )}
      </div>
      <br />
      <div>
        <div style={{ float: "left" }}>Total Savings: </div>
        <div style={{ float: "right" }}>
          -£{calculateTotalSavings(cart).toFixed(2)}
        </div>
      </div>
      <h2 style={{ textAlign: "center" }}>
        Total £{calculateTotal(cart).toFixed(2)}
      </h2>
    </Card>
  );
};

export default Totals;
