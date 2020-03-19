describe("Item List", () => {
  it("should have 3 cards", () => {
    cy.visit("/");
    cy.get(":nth-child(1) > .card-body > .card-title").should(
      "have.text",
      "Oranges"
    );
    cy.get(":nth-child(2) > .card-body > .card-title").should(
      "have.text",
      "Coke"
    );
    cy.get(":nth-child(3) > .card-body > .card-title").should(
      "have.text",
      "Beans"
    );
  });

  it("should have 3 input fields", () => {
    cy.visit("/");
    cy.get(":nth-child(1) > .card-body > form > .input-group > .form-control")
      .type("1")
      .should("have.value", "1");
    cy.get(":nth-child(2) > .card-body > form > .input-group > .form-control")
      .type("1")
      .should("have.value", "1");
    cy.get(":nth-child(3) > .card-body > form > .input-group > .form-control")
      .type("1")
      .should("have.value", "1");
  });
});

describe("Shopping Cart", () => {
  it("should be able to add Oranges to cart", () => {
    cy.visit("/");
    cy.get(
      ":nth-child(1) > .card-body > form > .input-group > .form-control"
    ).type("1");
    cy.get(":nth-child(1) > .card-body > .btn").click();

    cy.get(".list-group-item").should("contain", "Oranges");
    cy.get(".list-group-item").should("contain", "1kg @ £1.99 per kg");
  });

  it("should be able to add Coke to cart", () => {
    cy.visit("/");
    cy.get(
      ":nth-child(2) > .card-body > form > .input-group > .form-control"
    ).type("1");
    cy.get(":nth-child(2) > .card-body > .btn").click();
    cy.get(".list-group-item").should("contain", "Coke");
    cy.get(".list-group-item").should("contain", "1@ £0.70 each");
  });

  it("should be able to add Beans to cart", () => {
    cy.visit("/");
    cy.get(
      ":nth-child(3) > .card-body > form > .input-group > .form-control"
    ).type("1");
    cy.get(":nth-child(3) > .card-body > .btn").click();
    cy.get(".list-group-item").should("contain", "Beans");
    cy.get(".list-group-item").should("contain", "1@ £0.50 each");
  });

  it("should be able to delete Oranges from cart", () => {
    cy.visit("/");
    cy.get(
      ":nth-child(1) > .card-body > form > .input-group > .form-control"
    ).type("1");
    cy.get(":nth-child(1) > .card-body > .btn").click();

    cy.get(".list-group-item").should("contain", "Oranges");
    cy.get(".btn-danger").click();
    cy.get(".list-group-item").should("not.exist");
  });

  it("should be able to delete Oranges from cart with multiple items", () => {
    cy.visit("/");
    cy.get(
      ":nth-child(1) > .card-body > form > .input-group > .form-control"
    ).type("1");
    cy.get(":nth-child(1) > .card-body > .btn").click();
    cy.get(
      ":nth-child(2) > .card-body > form > .input-group > .form-control"
    ).type("1");
    cy.get(":nth-child(2) > .card-body > .btn").click();

    cy.get(
      ":nth-child(3) > .card-body > form > .input-group > .form-control"
    ).type("1");
    cy.get(".list-group > :nth-child(1)").should("contain", "Oranges");
    cy.get(
      ":nth-child(1) > :nth-child(1) > :nth-child(4) > .btn-danger"
    ).click();
    cy.get(".list-group > :nth-child(1)").should("not.contain", "Oranges");
    cy.get(".list-group > :nth-child(1)").should("contain", "Coke");
  });

  it("should be able to add mutliple items to cart and calculate total", () => {
    cy.visit("/");
    cy.get(
      ":nth-child(1) > .card-body > form > .input-group > .form-control"
    ).type("1");
    cy.get(":nth-child(1) > .card-body > .btn").click();

    cy.get(
      ":nth-child(2) > .card-body > form > .input-group > .form-control"
    ).type("1");
    cy.get(":nth-child(2) > .card-body > .btn").click();

    cy.get(
      ":nth-child(3) > .card-body > form > .input-group > .form-control"
    ).type("1");
    cy.get(":nth-child(3) > .card-body > .btn").click();
    cy.get("h2").should("have.text", "Total £3.19");
  });

  it("should be able to edit quantity of item in cart", () => {
    cy.visit("/");
    cy.get(
      ":nth-child(1) > .card-body > form > .input-group > .form-control"
    ).type("1");
    cy.get(":nth-child(1) > .card-body > .btn").click();

    cy.get(
      ":nth-child(2) > .card-body > form > .input-group > .form-control"
    ).type("1");
    cy.get(":nth-child(2) > .card-body > .btn").click();
    cy.get(
      ":nth-child(2) > :nth-child(1) > :nth-child(4) > .btn-primary"
    ).click();
    cy.get('[style="float: left;"] > .input-group > .form-control').type(
      "{backspace}2"
    );
    cy.get(":nth-child(2) > :nth-child(1) > :nth-child(4) > .btn").click();
    cy.get(
      '.list-group > :nth-child(2) > :nth-child(1) > [style="float: left;"]'
    ).should("contain", "2@ £0.70 each");
  });
});

describe("Total Price Calculation", () => {
  it("should show subtotal, savings, total savings and grand total", () => {
    cy.visit("/");
    cy.get(
      ":nth-child(1) > .card-body > form > .input-group > .form-control"
    ).type("2");
    cy.get(":nth-child(1) > .card-body > .btn").click();

    cy.get(
      ":nth-child(2) > .card-body > form > .input-group > .form-control"
    ).type("4");
    cy.get(":nth-child(2) > .card-body > .btn").click();

    cy.get(
      ":nth-child(3) > .card-body > form > .input-group > .form-control"
    ).type("6");
    cy.get(":nth-child(3) > .card-body > .btn").click();
    cy.get(":nth-child(2) > .card > :nth-child(1)").should(
      "have.text",
      "Subtotal:£9.78"
    );
    cy.get(":nth-child(2) > :nth-child(2) > :nth-child(3)").should(
      "have.text",
      "Savings:"
    );
    cy.get(':nth-child(4) > :nth-child(1) > [style="float: left;"]').should(
      "have.text",
      "Coke 2 for £1 :"
    );
    cy.get(':nth-child(4) > :nth-child(1) > [style="float: right;"]').should(
      "have.text",
      "-£0.80"
    );
    cy.get(':nth-child(4) > :nth-child(2) > [style="float: left;"]').should(
      "have.text",
      "Beans 3 for 2 :"
    );
    cy.get(':nth-child(4) > :nth-child(2) > [style="float: right;"]').should(
      "have.text",
      "-£1.00"
    );
    cy.get(".card > :nth-child(6)").should(
      "have.text",
      "Total Savings: -£1.80"
    );
    cy.get("h2").should("have.text", "Total £7.98");
  });
});
