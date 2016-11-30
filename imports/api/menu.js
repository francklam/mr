import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Dishes = new Mongo.Collection('dishes');

if (Meteor.isServer) {
  // This code only runs on the server

  Meteor.publish('menuList', function func(restoId) {
    return Dishes.find({restoId: restoId});
  });
}

Meteor.methods({
  'dishes.add'(restoId, restoName, section, dish, price) {
    // if (!Meteor.userId()) {
    //   throw new Meteor.Error('not-authorized');
    // }

    const existingDish = Dishes.findOne({restoId:restoId, section: section, dish: dish});
    if (typeof existingDish == "undefined") {
      Dishes.insert({
        // owner: Meteor.userId(),
        owner: 'toto',
        restoId: restoId,
        restoName: restoName,
        section: section,
        dish: dish,
        rating: [],
        price: price
      });
    }
  },
});
