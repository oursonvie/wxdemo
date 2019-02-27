Meteor.publish("studentPub", function(openid){
  return Students.find({openid:openid})
});
