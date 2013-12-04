People = new Meteor.Collection('people');

if (Meteor.isClient) {
  Template.hello.greeting = function () {
    return "Vote for your fave.";
  };

  Template.hello.people = function () {
    return People.find({}, {sort: {votes: -1}});
  };

  Template.hello.selectedClass = function () {
    var sel = this._id === Session.get('selected');
    return sel ? "selected" : ""
  };

  Template.hello.events({
    'click input' : function () {
      // template data, if any, is available in 'this'
      People.update({_id: Session.get('selected')}, {$inc: {votes: 1}});
    },
    'click tr': function () {
      Session.set('selected', this._id)
    }
  });
}

if (Meteor.isServer) {
  if (People.find().count() === 0) {
    var seedData = [
      {name: "Sookie", votes: 2},
      {name: "Eric", votes: 3},
      {name: "Bill", votes: 0}
    ];
    seedData.forEach(function(person) {
      People.insert(person);
    });
  }
}