//business logic

class PizzaType {
    constructor(id, displayName, baseCost) {
        this._id = id;
        this._displayName = displayName;
        this._baseCost = baseCost;
    }

    getId() {
        return this._id;
    }

    getDisplayName() {
        return this._displayName;
    }

    getBaseCost() {
        return this._baseCost;
    }
}

class PizzaSize {
    constructor(id, displayName, additionalCost, toppingCost) {
        this._id = id;
        this._displayName = displayName;
        this._additionalCost = additionalCost;
        this._toppingCost = toppingCost;
    }

    getId() {
        return this._id;
    }

    getAdditionalCost() {
        return this._additionalCost;
    }

    getToppingCost() {
        return this._toppingCost;
    }

    getDisplayName() {
        return this._displayName;
    }
}

class PizzaTopping {
    constructor(id, displayName) {
        this._id = id;
        this._displayName = displayName;
    }

    getId() {
        return this._id;
    }

    getDisplayName() {
        return this._displayName;
    }
}

class Pizza {
    constructor(type, size, toppings) {
        this._type = type; // PizzaType
        this._size = size; // PizzaSize
        this._toppings = toppings; // PizzaTopping[]
    }

    getId() {
        return `${this._type.getId()},${this._size.getId()},[${this._toppings.map(topping => topping.getId()).sort().join()}]`;
    }

    getDisplayName() {
        var toppingDisplayNames = this._toppings.map(topping => topping.getDisplayName().toLowerCase());
        if (toppingDisplayNames.length === 0) {
            return `${this._type.getDisplayName()} ${this._size.getDisplayName()}`;
        }
        if (toppingDisplayNames.length === 1) {
            return `${this._type.getDisplayName()} ${this._size.getDisplayName()} with ${toppingDisplayNames[0]}`;
        }
        return `${this._type.getDisplayName()} ${this._size.getDisplayName()} with ${toppingDisplayNames.slice(0, toppingDisplayNames.length - 1).join(", ")} and ${toppingDisplayNames[toppingDisplayNames.length - 1]}`;
    }

    getCost() {
        /*
         var cost = 0;
         switch (this._type.getId()) {
         case "pepperoni":
         case "sausage":
         cost += 10;
         break;
         case "spicy_italian":
         case "miditerrian_veggie":
         cost += 9;
         break;
         case "cheese_pizza":
         case "spinach_alfredo":
         cost += 8;
         break;
         switch (this._size) {
         case "small":
         cost += 1 + this._toppings.length * 0.5;
         break;
         case "medium":
         cost += 3 + this._toppings.length * 1;
         break;
         case "large":
         cost += 5 + this._toppings.length * 1.5;
         break;
         return cost;
         */

        return this._type.getBaseCost() + this._size.getAdditionalCost() + this._size.getToppingCost() * this._toppings.length;
    }
}

class CartItem {
    constructor(pizza, quantity) {
        this._pizza = pizza;
        this._quantity = quantity;
    }

    getId() {
        return this._pizza.getId();
    }

    getCost() {
        return this._pizza.getCost() * this._quantity;
    }

    increaseQuantity(quantity) {
        this._quantity += quantity;
    }

    getDisplayName() {
        return `${this._pizza.getDisplayName()}  $${this._pizza.getCost()}  x${this._quantity}  $${this.getCost()}`;
    }
}

class Cart {
    constructor() {
        this._items = [];
    }

    getCost() {
        return this._items.map(item => item.getCost()).reduce((total, cost) => total + cost);
    }

    addPizza(pizza, quantity) {
        var existingItem = this._items.find(item => item.getId() === pizza.getId());
        if (existingItem === undefined) {
            this._items.push(new CartItem(pizza, quantity));
        } else {
            existingItem.increaseQuantity(quantity);
        }
    }

    getDisplayHtml() {
        return `<ul>${this._items.map(item => `<li>${item.getDisplayName()}</li>`).join("")}</ul><h3>Total $${this.getCost()}</h3>`;
    }
}

var pizzaTypes = [
    new PizzaType("pepperoni", "Pepperoni", 10),
    new PizzaType("sausage", "Sausage", 10),
    new PizzaType("spicy_italian", "Spicy Italian", 9),
    new PizzaType("miditerrian_veggie", "Miditerrian Veggie", 9),
    new PizzaType("cheese_pizza", "Cheese Pizza", 8),
    new PizzaType("spinach_alfredo", "Spinach Alfredo", 8)
]

var pizzaSizes = [
    new PizzaSize("small", "Small", 1, 0.5),
    new PizzaSize("medium", "Medium", 3, 1),
    new PizzaSize("large", "Large", 5, 1.5)
]

var pizzaToppings = [
    new PizzaTopping("mushrooms", "Mushrooms"),
    new PizzaTopping("onions", "Onions"),
    new PizzaTopping("bacon", "Bacon"),
    new PizzaTopping("black_olives", "Black olives"),
    new PizzaTopping("green_peppers", "Green peppers"),
    new PizzaTopping("extra_cheese", "Extra cheese")
]

var cart = new Cart();

$(document).ready(function () {
    $("#submit").click(function () {
        var selectedPizza = $('input[type="checkbox"][name="pizza"]:checked').map(function () {
            return this.value;
        }).get();
        var selectedToppings = $('input[type="checkbox"][name="toppings"]:checked').map(function () {
            return this.value;
        }).get();
        var selectedSize = $('input[type="checkbox"][name="size"]:checked').map(function () {
            return this.value;
        }).get();
        var selectedQuantity = parseInt($("input#quantity").val());

        if (selectedPizza.length === 0 || selectedSize.length === 0 || isNaN(selectedQuantity)) {
            return;
        }
        var type = pizzaTypes.find(type => type.getId() === selectedPizza[0]);
        if (type === undefined) {
            return;
        }
        var size = pizzaSizes.find(size => size.getId() === selectedSize[0]);
        if (size === undefined) {
            return;
        }
        var toppings = pizzaToppings.filter(topping => selectedToppings.includes(topping.getId()));

        var newPizza = new Pizza(type, size, toppings);
        cart.addPizza(newPizza, selectedQuantity);
        $("div#displayCart").empty();
        $("div#displayCart").append(cart.getDisplayHtml());

    });
    $('input[type="checkbox"][name="pizza"]').on('change', function () {
        $('input[type="checkbox"][name="pizza"]').not(this).prop('checked', false);
    });
    $('input[type="checkbox"][name="size"]').on('change', function () {
        $('input[type="checkbox"][name="size"]').not(this).prop('checked', false);
    });

});
