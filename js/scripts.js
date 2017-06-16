//business logic
function Pizza(pizzaName, size, toppings, cost) {
  this.pizzaName = pizzaName;
  this.pizzaSize = size;
  this.toppings = toppings;
  this.cost = cost;
}

Pizza.prototype.Cost = function(pizzaName, size, toppings) {
  switch(this.pizzaName) {
    case "Pepperoni":
    case "Sausage":
      this.cost += 10;
      break;
    case "Spicy Italian":
    case "Miditerrian Veggie":
      this.cost += 9;
      break;
    case "Cheese Pizza":
    case "Spinach Alfredo":
      this.cost += 8;
      break;
  }

  switch(this.pizzaSize) {

  }
  switch(this.pizzaSize) {

  }

  return this.cost;
};
