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
    case "Small":
      this.cost += 1;
      break;
    case "Medium":
      this.cost += 3;
      break;
    case "Large":
      this.cost += 5;
      break;
  }
  switch(this.toppings) {


  }

  return this.cost;
};

// user interface logic
$(document).ready(function(){
  $(".refresh").click(function() {
    location.reload();
  });

  name = $("input#name").val();

}
