Template.homePage.onCreated(function() {

  // init session
  Session.set('wx_res', false)

  console.log('oncreated')

  var code = FlowRouter.getQueryParam("code");

  if (code) {
    PromiseMeteorCall('oauth_token', code)
    .then( res => {

      Session.set('wx_res', res)

      // PromiseMeteorCall('displayToBackEnd', res)

    })
    .catch( err => {
      alert(err)
      console.log(err)
    })
  }

});


Template.homePage.helpers({
  wx_res: function(){
     return Session.get('wx_res')
  }
});
