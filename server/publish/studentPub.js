Meteor.publish("studentPub", function(openid){
  return Students.find({openid:openid})
});

Meteor.publish("studentPubAll", function(openid){
  // publish data only when admin logged in
  if ( Roles.userIsInRole(this.userId, ['admin']) ) {
    return Students.find({})
  } else {
    console.log(`[Publish CustomService Fail] No Premission`)
  }
});
