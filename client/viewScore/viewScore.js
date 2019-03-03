Template.viewScore.onCreated(function() {

  Session.set('studentScore',false)

  // start sub after update
  PromiseMeteorCall('queryScore', Session.get('wx_res').openid)
  .then( res => {
    Session.set('studentScore',res)
  })
  // PromiseMeteorCall('displayToBackEnd', res)

});


Template.viewScore.helpers({
  studentScore: function() {
    return Session.get('studentScore')
  }
});
