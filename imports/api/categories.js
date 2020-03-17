import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Categories = new Mongo.Collection('categories');

if (Meteor.isServer) {
  Meteor.publish('categories', function categoriesPublication() {
    return Categories.find({});
  });
}

Meteor.methods({
  'categories.insert'(name) {
    check(name, String);

    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    Categories.insert({
      name,
      createAt: new Date(),
      createBy: Meteor.users.findOne(this.userId).username,
    });
  },
  'categories.update'(categoryId, setName) {
    check(categoryId, String);
    check(name, String);

    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    Categories.update(categoryId, {$set: {name: setName} });
  },
  'categories.delete'(categoryId) {
    check(categoryId, String);

    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    Categories.remove(categoryId);
  }
});