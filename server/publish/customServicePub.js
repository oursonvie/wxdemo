Meteor.publish('CustomService', function() {
  // publish data only when admin logged in
  if ( Roles.userIsInRole(this.userId, ['admin']) ) {
    return CustomService.find({})
  } else {
    console.log(`[Publish CustomService Fail] No Premission`)
  }

});
