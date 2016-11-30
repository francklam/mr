import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Restos = new Mongo.Collection('restos');

if (Meteor.isServer) {
  // This code only runs on the server

  Meteor.publish('restoList', function func(hasOwner) {
    if (hasOwner) {
      return Restos.find({owner:this.userId});
    }
    else {
      return Restos.find();
    }
  });
}

Meteor.methods({
  'restos.add'(name, branch, address, type) {
    // if (!Meteor.userId()) {
    //   throw new Meteor.Error('not-authorized');
    // }

    const existingResto = Restos.findOne({name:name, branch: branch});
    if (typeof existingResto == "undefined") {
      Restos.insert({
        // owner: Meteor.userId(),
        owner: 'toto',
        name: name,
        branch: branch,
        address: address,
        type: type
      });
    }
  },
});
