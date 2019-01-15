Meteor.methods({
  boundUser:function(username, password, openid){
    // bound openID to account system
     console.log(username, password, openid)
  }
});
