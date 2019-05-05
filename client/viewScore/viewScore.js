Template.viewScore.onCreated(function() {

  Session.set('studentScore',false)

  var code = FlowRouter.getQueryParam("code");

  if (code) {
    PromiseMeteorCall('oauth_token', code)
      .then(res => {

        if (res && res.openid) {
          // start sub after update
          PromiseMeteorCall('queryScore', res.openid)
          .then( res => {
            Session.set('studentScore',res)
          })
        } else {
          alert(JSON.stringify(res))
        }

      })
      .catch(err => {
        alert(err)
        console.log(err)
      })
  }



});


Template.viewScore.helpers({
  studentScore: function() {
    return Session.get('studentScore')
  }
});
