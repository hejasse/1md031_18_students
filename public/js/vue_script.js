/*jslint es5:true, indent: 2 */
/*global Vue, io */
/* exported vm */
'use strict';
var socket = io();

var vm = new Vue({
  el: '#mapItems',
  data: {
    headline: "Välj en burgare!",
    menu: food,
    checkedValue: [],
    formDetails: [],
    selected: '',
    picked: '',
    orders: {},
  },
   created: function () {
    socket.on('initialize', function (data) {
      this.orders = data.orders;
    }.bind(this));

    socket.on('currentQueue', function (data) {
      this.orders = data.orders;
    }.bind(this));
  },
  methods: {
    displayOrder: function (event) {

     var offset = {x: event.currentTarget.getBoundingClientRect().left,
                    y: event.currentTarget.getBoundingClientRect().top};


       socket.emit("addOrder", { orderId: "T",
                                 details: { x: event.clientX - 10 - offset.x,
                                           y: event.clientY - 10 - offset.y }

                              });
this.details = { x: event.clientX - 10 - offset.x,
                 y: event.clientY - 10 - offset.y };


    },

    orderPlaced: function () {
      console.log("Hej hopp");
    },

    getNext: function () {
      var lastOrder = Object.keys(this.orders).reduce(function (last, next) {
        return Math.max(last, next);
      }, 0);
      return lastOrder + 1;
    },
    addOrder: function (event) {
      console.log("Hej woppp");

    /*  var offset = {x: this.order.details.x,
            y: this.order.details.y}; */

      /* var offset = {x: event.currentTarget.getBoundingClientRect().left,
                    y: event.currentTarget.getBoundingClientRect().top}; */
      socket.emit("addOrder", { orderId: "T",
                                details: { x: this.orders.x,
                                           y: this.orders.y },
                                orderItems: this.checkedValue
                              });
                              console.log(this.details.x);
    }
  }
});
