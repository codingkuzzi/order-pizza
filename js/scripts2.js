//business logic
function Pizza(pizzaName, size, toppings) {
  this.pizzaName = pizzaName;
  this.size = size;
  this.toppings = toppings;
}

Pizza.prototype.Toppings = function() {
  if(this.toppings.length === 0) {
    return "no toppings";
  } else {
    return this.toppings.join(", ");
  }
}

Pizza.prototype.Cost = function() {
  var cost = 0;
  switch (this.pizzaName) {
    case "pepperoni":
    case "sausage":
      cost += 10;
      break;
    case "spicy_talian":
    case "miditerrian_veggie":
      cost += 9;
      break;
    case "cheese_pizza":
    case "spinach_alfredo":
      cost += 8;
      break;
  }
  switch (this.size) {
    case "small":
      cost += 1 + this.toppings.length * 0.5;
      break;
    case "medium":
      cost += 3 + this.toppings.length * 1;
      break;
    case "large":
      cost += 5 + this.toppings.length * 1.5;
      break;
  }
  return cost;
};

//function CartItem(pizza, quantity){
//  this.pizza = pizza;
//  this.quantity = quantity;
//}

//CartItem.prototype.Cost = function() {
//  return this.pizza.Cost() * quantity;
//}

 class CartItem {
   constructor(pizza, quantity) {
     this.pizza = pizza;
     this.quantity = quantity;
   }
   Cost(){
     return this.pizza.Cost() * quantity;
   }
 }


function Cart() {
  this.items = [];
}

Cart.prototype.Cost = function() {
  return this.items.reduce(
    function (total, item) {
    return total + item.Cost();
}

  );
}

$(document).ready(function() {
  $("#submit").click(function() {
    var selectedPizza = $('input[type="checkbox"][name="pizza"]:checked').map(function() { return this.value; }).get();
    var selectedToppings = $('input[type="checkbox"][name="toppings"]:checked').map(function() { return this.value; }).get();
    var selectedSize = $('input[type="checkbox"][name="size"]:checked').map(function() { return this.value; }).get();
    var selectedQuantity = parseInt($("input#quantity").val());
    var name = $("input#name").val();

    if(selectedPizza.length === 0 || selectedSize.length === 0) {
      return;
    }
    var newPizza = new Pizza(selectedPizza[0], selectedSize[0], selectedToppings);

    var cost = newPizza.Cost();

//    $("#result").append("<h3>" + name + ", you've selected " + newPizza.pizzaName + ", " + newPizza.size + ", " + //newPizza.toppings + "." + "</h3>" + "<h3>" + "The cost is $ " + cost + "." + "</h3>");


    $("#result").append(`<h3>${name}, you've selected ${newPizza.pizzaName} pizza, ${newPizza.size}, with ${newPizza.Toppings()}.</h3><h3>The cost is $${cost}.</h3>`);

});


});
