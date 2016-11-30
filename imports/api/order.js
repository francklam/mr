import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Orders = new Mongo.Collection('orders');

if (Meteor.isServer) {
  // This code only runs on the server

  Meteor.publish('orderList', function func() {
    return Orders.find();
  });
}

Meteor.methods({
  'orders.add'(restoId, restoName, who, dish) {
    // if (!Meteor.userId()) {
    //   throw new Meteor.Error('not-authorized');
    // }

    const existingOrder = Orders.findOne({restoId:restoId, creator: who});
    if (typeof existingOrder == "undefined") {
      Orders.insert({
        // owner: Meteor.userId(),
        restoId: restoId,
        restoName: restoName,
        creator: who,
        dishes: [dish]
      });
    }
    else {
      let newDishes = existingOrder.dishes;
      newDishes.push(dish);

      Orders.update(existingOrder._id, {
        $set: {
          dishes: newDishes
        }
      });
    }
  },
});
