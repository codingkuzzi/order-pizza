//business logic
function Pizza(pizzaName, size, toppings) {
  this.pizzaName = pizzaName;
  this.size = size;
  this.toppings = toppings;
}

Pizza.prototype.Id = function() {
  return `${this.pizzaName},${this.size},[${this.toppings.sort().join()}]`;
}

Pizza.prototype.DisplayName = function() {
  // TODO: form display name
  return `${this.pizzaName},${this.size},[${this.toppings.sort().join()}]`;
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
     return this.pizza.Cost() * this.quantity;
   }
 }


function Cart() {
  this.items = [];
}

Cart.prototype.Cost = function() {
  return this.items.map(item => item.Cost()).reduce(
    function (total, cost) {
      return total + cost;
    }
  );
}

Cart.prototype.Add = function(pizza, quantity) {
  // TODO: determine here if corresponding cartItem exists
  var newPizzaId = pizza.Id();
  var existingItem = this.items.find(        item => item.pizza.Id() === newPizzaId                );
  if(existingItem === undefined) {
      this.items.push(new CartItem(pizza, quantity));
  } else {
    existingItem.quantity += quantity;
  }
}
var cart = new Cart();

$(document).ready(function() {
  $("#submit").click(function() {
    var selectedPizza = $('input[type="checkbox"][name="pizza"]:checked').map(function() { return this.value; }).get();
    var selectedToppings = $('input[type="checkbox"][name="toppings"]:checked').map(function() { return this.value; }).get();
    var selectedSize = $('input[type="checkbox"][name="size"]:checked').map(function() { return this.value; }).get();
    var selectedQuantity = parseInt($("input#quantity").val());
    //var name = $("input#name").val();

    if(selectedPizza.length === 0 || selectedSize.length === 0) {
      return;
    }
    var newPizza = new Pizza(selectedPizza[0], selectedSize[0], selectedToppings);
    cart.Add(newPizza, selectedQuantity);
    $("ul#orderedPizza").empty();
    cart.items.forEach(function(item){
        var text = `${item.pizza.DisplayName()}  $${item.pizza.Cost()}  x${item.quantity}  $${item.Cost()}`;
        $("ul#orderedPizza").append(`<li>${text}</li>`);
    });
        $("h3#total").text(`Total $${cart.Cost()}`);
    //var cost = newPizza.Cost();

//    $("#result").append("<h3>" + name + ", you've selected " + newPizza.pizzaName + ", " + newPizza.size + ", " + //newPizza.toppings + "." + "</h3>" + "<h3>" + "The cost is $ " + cost + "." + "</h3>");


    //$("#result").append(`<h3>${name}, you've selected ${newPizza.pizzaName} pizza, ${newPizza.size}, with ${newPizza.Toppings()}.</h3><h3>Total cost is $${cart.Cost()}.</h3>`);

});
  $('input[type="checkbox"][name="pizza"]').on('change', function() {
    $('input[type="checkbox"][name="pizza"]').not(this).prop('checked', false);
  });
  $('input[type="checkbox"][name="size"]').on('change', function() {
    $('input[type="checkbox"][name="size"]').not(this).prop('checked', false);
  });

});
