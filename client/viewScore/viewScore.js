Template.viewScore.onCreated(function() {
  Session.set('wx_res', false)
  Session.set('queryErr', false)
  Session.set('studentScore',false)

  var code = FlowRouter.getQueryParam("code");

  if (code) {
    PromiseMeteorCall('oauth_token', code)
      .then(res => {
        Session.set('wx_res', res)
        if (res && res.openid) {
          // start sub after update
          PromiseMeteorCall('queryScore', res.openid)
          .then( res => {
            Session.set('studentScore',res)
          })
          .catch(err => {
            Session.set('queryErr', err)
            alert(err.message)
          })
        } else {
          if (res.errcode == 40163) {
            alert('登录已过期请重新进入页面')
          } else {
            alert(JSON.stringify(res))
          }
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
  },
  wx_res: function() {
     return Session.get('wx_res')
  },
  queryErr: function() {
    return Session.get('queryErr')
  }
});
